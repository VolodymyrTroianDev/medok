<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center w-full h-full"
  >
    <div
      class="w-[245px] h-[325px] bg-white cursor-pointer duration-700 hover:scale-110 rounded-lg flex flex-col items-center gap-2"
      v-for="(item, index) in blogStore.state.data"
      :key="item"
      @click="openModal(index)"
    >
      <div
        class="flex justify-center items-center min-w-[245px] min-h-[145px] max-h-[200px] object-cover rounded-t"
        :class="{ 'bg-gray-100': !item.imgUrl.length }"
      >
        <img
          v-if="item.imgUrl.length > 0"
          :src="item.imgUrl"
          class="object-cover rounded-t"
          alt=""
        />
        <inline-svg
          v-else
          src="/assets/images/svg/no-image.svg"
          class="text-main-color object-cover rounded-t w-7"
        />
      </div>

      <div class="flex flex-col gap-2 w-full px-5">
        <span class="truncate">{{ item.title }}</span>
        <div class="py-3 flex flex-col gap-6 text-custom-gray text-sm pe-3">
          <div class="flex gap-2">
            <inline-svg
              src="/assets/images/svg/calendar.svg"
              alt=""
              class="w-5"
            />
            <span>{{ formatTime(item.timeCreated) }}</span>
          </div>
          <span> {{ item.description }} </span>
          <div class="d-flex relative justify-between">
            <button class="relative w-[30px]">
              <inline-svg
                src="/assets/images/svg/comment.svg"
                alt="commentary"
                class="w-[21px]"
              />
              <span
                class="w-[16px] h-[16px] absolute right-0 bg-counter text-white flex items-center justify-center rounded-full bottom-[-5px] text-[12px]"
              >
                {{ item.comment ? Object.keys(item.comment)?.length : 0 }}
              </span>
            </button>
          </div>
        </div>
      </div>
      <BlogsItemsDescriptionModal
        v-if="openBlogDescription && descriptionModalIdx === index"
        @closeModal="openBlogDescription = false"
        :data="item"
        :openModal="openBlogDescription"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatTime } from "@/services/TimeFormat";

const { openBlogDescription } = toRefs(useGeneralStore());
const descriptionModalIdx = ref<string>("");

const blogStore = useBlogStore();
const openModal = (idx: string) => {
  openBlogDescription.value = !openBlogDescription.value;
  descriptionModalIdx.value = idx;
};

const BlogsItemsDescriptionModal = defineAsyncComponent(
  () => import("@/components/Modals/BlogsItemsDescriptionModal.vue"),
);
</script>
<style scoped></style>
