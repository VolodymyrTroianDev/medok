<template>
  <div class="flex gap-2 align-center">
    <p class="text-main-color">{{ likesCount }}</p>
    <img
      src="../../assets/images/svg/like-icon.svg"
      class="cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
      @click="$emit('updateLike', 'likes')"
    />
    <p class="text-main-color">{{ disLikesCount }}</p>
    <img
      src="../../assets/images/svg/like-icon.svg"
      class="rotate-180 cursor-pointer hover:scale-110 transition duration-300 ease-in-out fill-current text-red-950r"
      @click="$emit('updateLike', 'disLikes')"
    />
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  comment: {};
  userId: string;
}>();
const blog = useBlogStore(),
  auth = useAuthenticationStore();

const likesCount = computed(() =>
  props.comment.likes ? props.comment.likes.length : 0,
);
const disLikesCount = computed(() =>
  props.comment.disLikes ? props.comment.disLikes.length : 0,
);
const isActive = (type) => computed(() => props.comment[type]?.includes(props.userId));

const activeLikes = isActive('likes');
const activeDisLikes = isActive('disLikes');
</script>
