<template>
  <div class="flex flex-col gap-3 ps-[50px]">
    <template v-for="replay in props.comment?.replay" :key="replay">
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
                <div class="font-bold">{{ replay?.author.displayName }}</div>
                <div class="text-color-a">
                  <span v-if="replay.edited">{{ $t('blog.edited') }}</span>
                  {{ formatTime(replay?.timeCreated) }}
                </div>
              </div>
              <div class="text-color-a">{{ replay.author?.email }}</div>
              <div class="text-black">
                <span class="bg-bg-mobile-filter rounded px-2">{{ replay.comment.displayName }}</span>
                {{ replay.comment?.text }}
              </div>
            </div>
            <div class="flex gap-2 justify-between">
              <div class="flex gap-2">
                <img src="../../assets/images/svg/like-icon.svg" class="cursor-pointer hover:scale-110 transition duration-300 ease-in-out w-4">
                <img src="../../assets/images/svg/like-icon.svg" class="rotate-180 cursor-pointer hover:scale-110 transition duration-300 ease-in-out w-4">
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between gap-1">
          <div class="flex max-h-[30px] max-w-[100px] items-center gap-1 justify-end w-full">
            <img
              src="../../assets/images/svg/edit-icon.svg"
              class="w-[20px] h-[20px] cursor-pointer bg-no-repeat bg-cover hover:scale-110 transition duration-300 ease-in-out"
              :alt="$t('blog.editComment')"
              :title="$t('blog.editComment')"
            >
            <img
              src="../../assets/images/svg/delete-icon.svg"
              :alt="$t('blog.deleteComment')"
              :title="$t('blog.deleteComment')"
              class="w-[20px] h-[20px] cursor-pointer bg-no-repeat bg-cover hover:scale-110 transition duration-300 ease-in-out"
            >
          </div>
          <button>
            {{ $t("blog.reply") }}
          </button>
        </div>
      </div>
      <Transition name="slide-fade">
        <CommentBtnGroup
          v-if="openEditComment && commentIdx === idx"
          @save-comment="(textComment)=>{ onSaveComment(textComment, idx, props.commentId) }"
          @cancel-action="onCancelAction"
          :model-value="comment.text"
          :placeholder="$t('blog.addComment')"
        >
          <template v-slot:cancel-btn>{{$t('reused.cancel')}}</template>
          <template v-slot:save-btn>{{$t('reused.save')}}</template>
        </CommentBtnGroup>
      </Transition>
    </template>

  </div>
</template>

<script setup lang="ts">
import {formatTime} from "../../services/TimeFormat";
import CommentBtnGroup from "../../components/CustomUI/CommentBtnGroup.vue";
import {ref} from "vue";
import {useBlogStore} from "../../store/blogStore";
import {useAuthenticationStore} from "../../store/authStore";

const text = ref<string>(""),
  blog = useBlogStore(),
  auth = useAuthenticationStore(),
  openEditComment = ref<boolean>(false),
  replyComment = ref<boolean>(false),
  commentIdx = ref<string>("");

const props = defineProps<{
  comment: {};
  commentId: string;
}>();
</script>

<style scoped>

</style>
