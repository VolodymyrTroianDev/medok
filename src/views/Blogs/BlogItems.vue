<template>
    <div
        class="flex flex-col gap-5 bg-bg-mobile-filter 500px:bg-bg-products min-h-[710px] border-t-2 border-t-b-products p-5"
    >
        <div
            class="flex items-center gap-5 cursor-pointer transition duration-700 ease-in-out bg-white rounded"
            v-for="(item, index) in blogStore.state.data"
            :key="item"
            @click="openModal(index)"
        >
            <img
                :src="item.imgUrl"
                class="w-full max-w-[200px] max-h-[200px] object-cover"
                alt=""
            />
            <div class="flex flex-col w-full h-full gap-2">
                <span class="truncate">{{ item.title }}</span>
                <div
                    class="py-3 flex flex-col gap-6 text-custom-gray text-sm pe-3"
                >
                    <div class="flex gap-2">
                        <img
                            src="../../assets/images/svg/calendar.svg"
                            alt=""
                        />
                        <span>{{
                            moment(item.timeCreate).format("LLLL")
                        }}</span>
                    </div>
                    <span> {{ item.description }} </span>
                    <div class="relative">
                        <button class="relative w-[30px]">
                            <img src="../../assets/images/svg/comment.svg" />
                            <span
                                v-if="item?.comment"
                                class="w-[13px] h-[13px] absolute right-0 bg-counter text-white flex items-center justify-center rounded-full bottom-[-5px] text-[10px]"
                            >
                                {{ Object.keys(item?.comment).length || 0 }}
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
import moment from "moment";
import "moment/locale/uk";

const { openBlogDescription } = toRefs(useGeneralStore());
const descriptionModalIdx = ref<string>("");

moment.locale("uk");
const blogStore = useBlogStore();
const openModal = (idx) => {
    openBlogDescription.value = !openBlogDescription.value;
    descriptionModalIdx.value = idx;
};

const BlogsItemsDescriptionModal = defineAsyncComponent(
    () => import("@/views/Blogs/BlogsItemsDescriptionModal.vue")
);
</script>
<style scoped></style>
