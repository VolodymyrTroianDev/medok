import { defineStore } from "pinia";
import { reactive } from "vue";
import { useGeneralStore } from "@/store/generalStore";
import { v4 as uuidv4 } from "uuid";
import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  push,
  update,
  remove,
  get,
} from "firebase/database";
import { useAuthenticationStore } from "@/store/authStore";
import { useDatabaseStore } from "@/store/databaseStore";

export const useBlogStore = defineStore("blogStore", () => {
  const state = reactive({ data: {} });
  const db = getDatabase();
  const starCountRef = ref(db, `blogs`);
  const general = useGeneralStore();
  const auth = useAuthenticationStore();
  const dataBase = useDatabaseStore();

  general.statusLoader = true;

  onValue(starCountRef, (snapshot) => {
    state.data = snapshot.val();
    setTimeout(() => {
      general.statusLoader = false;
    }, 1000);
  });

  const createBlogArticle = async (data) => {
    general.statusLoader = true;
    const uid = uuidv4();
    try {
      await set(ref(db, `blogs/${uid}`), {
        ...data,
        id: uid,
        timeCreated: Date.now(),
        timeEdit: "",
        likes: [],
        comment: {},
      });
    } catch (e) {
    } finally {
      general.statusLoader = false;
    }
  };
  const addedComment = async (blogId: string, text: string) => {
    general.statusLoader = true;
    try {
      const newPostKey = push(child(ref(db), `blogs/${blogId}/comment`)).key;
      const updates = {};

      updates[`blogs/${blogId}/comment/${newPostKey}`] = {
        id: auth.state.uid,
        author: dataBase.state.data.reloadUserInfo,
        edited: false,
        text,
        likes: [],
        timeCreated: Date.now(),
      };

      await update(ref(db), updates);
    } catch (e) {
      console.error(e);
    } finally {
      general.statusLoader = false;
    }
  };
  const editComment = async (text, idx, id) => {
    const updates = {};
    updates[`blogs/${id}/comment/${idx}/text`] = text;
    updates[`blogs/${id}/comment/${idx}/edited`] = true;

    await update(ref(db), updates);
  };
  const replayComment = async (text, idx, id, displayName) => {
    const uid = uuidv4();
    const updates = {};
    updates[`blogs/${id}/comment/${idx}/replay/${uid}`] = {
      replayId: uid,
      author: dataBase.state.data.reloadUserInfo,
      edited: false,
      comment: {
        displayName,
        text,
      },
      timeCreated: Date.now(),
    };
    await update(ref(db), updates);
  };
  const updateCommentReaction = async (
      blogId: string,
      commentId: string,
      userId: string,
      type: "likes" | "disLikes",
      replayId: string | null = null
  ) => {
    const basePath = `blogs/${blogId}/comment/${commentId}`;
    const targetPath = replayId ? `${basePath}/replay/${replayId}` : basePath;
    const updates: Record<string, any> = {};

    try {
      const commentData = await get(ref(db, targetPath));

      if (!commentData.exists()) return;

      const { likes = [], disLikes = [] } = commentData.val();
      const isLiked = likes.includes(userId);
      const isDisliked = disLikes.includes(userId);

      if (type === "likes") {
        updates[`${targetPath}/likes`] = isLiked
            ? likes.filter((user) => user !== userId)
            : [...likes, userId];

        updates[`${targetPath}/disLikes`] = disLikes.filter(
            (user) => user !== userId
        );
      } else if (type === "disLikes") {
        updates[`${targetPath}/disLikes`] = isDisliked
            ? disLikes.filter((user) => user !== userId)
            : [...disLikes, userId];

        updates[`${targetPath}/likes`] = likes.filter((user) => user !== userId);
      }
      await update(ref(db), updates);
    } catch (error) {
      console.error("Error updating like/dislike:", error);
    }
  };

  const editReplayComment = async (
    text,
    blogsId,
    commentId,
    replayId,
    displayName,
  ) => {
    const updates = {};
    updates[
      `blogs/${blogsId}/comment/${commentId}/replay/${replayId}/comment`
    ] = {
      displayName,
      text,
    };
    updates[`blogs/${blogsId}/comment/${commentId}/replay/${replayId}/edited`] =
      true;
    await update(ref(db), updates);
  };

  const deleteComment = async (idx, id) => {
    await remove(ref(db, `blogs/${id}/comment/${idx}`));
  };
  return {
    state,
    createBlogArticle,
    addedComment,
    editComment,
    deleteComment,
    replayComment,
    editReplayComment,
    updateCommentReaction,
  };
});
