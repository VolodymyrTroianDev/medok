<template>
  <div class="flex flex-col gap-5 bg-bg-mobile-filter 500px:bg-bg-products min-h-[710px] border-t-2 border-t-b-products p-5" >
    <template v-for="(item,index) in blogStore.state.data" :key="item">
        <div class="flex items-center gap-5">
            <img :src="item.imgUrl" alt="" width="200">
            <span>{{ item.title }}</span>
        </div>
        <div class="bg-white px-5 py-3 flex flex-col gap-6 text-custom-gray text-sm">
            <div class="flex gap-2">
                <img src="../../assets/images/svg/calendar.svg" alt="">
                <span>{{ moment(item.timeCreate).format('LLL') }}</span>
            </div>
            <span>
        {{ item.description }}
      </span>
            <div class="relative">
                <button class="relative w-[30px]">
                    <img src="../../assets/images/svg/comment.svg">
                    <span
                            class="w-[13px] h-[13px] absolute right-0 bg-counter text-white flex items-center justify-center rounded-full bottom-[-5px] text-[10px]">
            2
          </span>
                </button>
            </div>
        </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import {useBlogStore} from "@/store/blogStore";
import moment from "moment";

const blogStore = useBlogStore();
</script>
<style scoped>

</style>
