import {defineStore} from "pinia";
import {reactive} from "vue";
import {useGeneralStore} from "@/store/generalStore";
import {v4 as uuidv4} from 'uuid';
import {getDatabase, ref, set, onValue, child, push, update, remove} from "firebase/database";
import {useAuthenticationStore} from "@/store/authStore";
import {useDatabaseStore} from "@/store/databaseStore";

export const useBlogStore = defineStore("blogStore", () => {
  const state = reactive({data: {}});
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
      await set(ref(db, `blogs/${uid}`),
        {
          ...data,
          id: uid,
          timeCreated: Date.now(),
          timeEdit: "",
          likes: [],
          comment: {}
        });
    } catch (e) {

    } finally {
      general.statusLoader = false;
    }
  }
  const addedComment = async (idx, text) => {
    general.statusLoader = true;
    try {
      const newPostKey = push(child(ref(db), `blogs/${idx}/comment`)).key
      const updates = {};

      updates[`blogs/${idx}/comment/${newPostKey}`] = {
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
  }
  const editComment = async (text, idx, id) => {
    const updates = {};
    updates[`blogs/${id}/comment/${idx}/text`] = text;
    updates[`blogs/${id}/comment/${idx}/edited`] = true;

    await update(ref(db), updates);
  }
  const replayComment = async (text, idx, id, displayName) => {
    const uid = uuidv4();
    const updates = {};
    updates[`blogs/${id}/comment/${idx}/replay/${uid}`] = {
      id: auth.state.uid,
      author: dataBase.state.data.reloadUserInfo,
      edited: false,
      comment: {
        displayName,
        text
      },
      timeCreated: Date.now(),
    };
    await update(ref(db), updates);
  }
  const likeUpdate = async (id: string, idx: string, authorId: string) => {
    const updates = {};
    /*updates[`blogs/${id}/comment/${idx}/likes`].push(authorId)*/
    console.log((ref(db), `blogs/${id}/comment/${idx}/likes`))
    await update(ref(db), updates);
  }
  const editReplayComment = async (text, blogsId, commentId, replayId, displayName) => {
    const updates = {};
    updates[`blogs/${blogsId}/comment/${commentId}/replay/${replayId}/comment`] = {
      displayName,
      text
    };
    updates[`blogs/${blogsId}/comment/${commentId}/replay/${replayId}/edited`] = true;
    await update(ref(db), updates);
  }
  const deleteComment = async (idx, id) => {
    await remove(ref(db, `blogs/${id}/comment/${idx}`));
  }
  return {
    state,
    createBlogArticle,
    addedComment,
    editComment,
    deleteComment,
    replayComment,
    editReplayComment,
    likeUpdate
  }
})
