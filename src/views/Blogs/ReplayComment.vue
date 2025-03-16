<template>
  <div class="flex flex-col gap-3 ps-[50px] pe-3">
    <template v-for="(replay, replayId) in comment?.replay" :key="replay">
      <div class="flex gap-3 justify-between">
        <div class="flex gap-3">
          <img
            :src="replay.author?.photoUrl"
            alt=""
            width="25"
            height="25"
            class="rounded-full bg-white h-[25px] object-cover"
          />
          <div class="flex flex-col gap-3">
            <div class="flex flex-col">
              <div class="flex gap-3">
                <div class="font-bold">
                  {{ replay?.author.displayName }}
                </div>
                <div class="text-color-a">
                  <span v-if="replay.edited">{{ $t("blog.edited") }}</span>
                  {{ formatTime(replay?.timeCreated) }}
                </div>
              </div>
              <div class="text-color-a">
                {{ replay.author?.email }}
              </div>
              <div class="text-black">
                <span class="bg-bg-mobile-filter rounded px-2">{{
                  replay.comment.displayName
                }}</span>
                {{ replay.comment?.text }}
              </div>
            </div>
            <div class="flex gap-2 justify-between">
              <likes-counter
                :comment="replay"
                :comment-id
                :user-id
                @update-like="
                  updateLike($event, blogId, commentId, userId, replayId)
                "
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between gap-1">
          <div
            class="flex max-h-[30px] max-w-[100px] items-center gap-1 justify-end w-full"
          >
            <inline-svg
              src="/assets/images/svg/edit-icon.svg"
              class="w-[20px] h-[20px] cursor-pointer bg-no-repeat bg-cover hover:scale-110 transition duration-300 ease-in-out"
              :alt="$t('blog.editComment')"
              :title="$t('blog.editComment')"
            />
            <inline-svg
              src="/assets/images/svg/delete-icon.svg"
              :alt="$t('blog.deleteComment')"
              :title="$t('blog.deleteComment')"
              class="w-[20px] h-[20px] cursor-pointer bg-no-repeat bg-cover hover:scale-110 transition duration-300 ease-in-out"
            />
          </div>
          <Transition name="slide-fade">
            <CommentBtnGroup
              class="ps-[55px] pe-3"
              v-if="replyComment && commentIdx === commentId"
              @save-comment="
                (textComment) => {
                  onReplyComment(
                    textComment,
                    commentId,
                    blogId,
                    comment.author?.displayName,
                  );
                }
              "
              @cancel-action="onCancelAction"
              :placeholder="$t('blog.addComment')"
            >
              <template v-slot:cancel-btn>{{ $t("reused.cancel") }}</template>
              <template v-slot:save-btn>{{ $t("blog.reply") }}</template>
            </CommentBtnGroup>
          </Transition>
          <button
            v-if="commentIdx !== replayId"
            @click="openReplyComment(replayId)"
          >
            {{ $t("blog.reply") }}
          </button>
        </div>
      </div>
      <Transition name="slide-fade">
        <CommentBtnGroup
          v-if="openEditComment && commentIdx === replayId"
          @save-comment="
            (textComment) => {
              onSaveComment(textComment, replayId, props.commentId);
            }
          "
          @cancel-action="onCancelAction"
          :model-value="comment.text"
          :placeholder="$t('blog.addComment')"
        >
          <template v-slot:cancel-btn>{{ $t("reused.cancel") }}</template>
          <template v-slot:save-btn>{{ $t("reused.save") }}</template>
        </CommentBtnGroup>
      </Transition>
    </template>
  </div>
</template>

<script setup lang="ts">
import { formatTime } from "../../services/TimeFormat";

const openEditComment = ref<boolean>(false),
  blog = useBlogStore(),
  commentIdx = ref<string>(""),
  replyComment = ref<boolean>(false);

const props = defineProps<{
  comment: {};
  commentId: string;
  blogId: string;
  userId: string;
}>();

const updateLike = async (
  type: string,
  blogId: string,
  commentId: string,
  userId: string,
  replayId: string,
) => {
  const scrollPosition = window.scrollY;

  await blog.updateCommentReaction(blogId, commentId, userId, type, replayId);
  await nextTick();

  window.scrollTo(0, scrollPosition);
};
const onReplyComment = () => {};
const onSaveComment = () => {};
const openReplyComment = (idx: string) => {
  commentIdx.value = idx;
  replyComment.value = true;
};
</script>

<style scoped></style>
