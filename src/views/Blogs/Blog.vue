<template>
<div class="bg-blogs-color">
  <div class="font-marck-script text-center text-[54px]">{{ $t("blog.title") }}</div>
  <div class="flex lg:max-w-[1300px] justify-between mx-auto gap-10">
    <div class="500px:max-w-[270px] w-full flex flex-col gap-7 border-t-2 -translate-x-full
      bg-bg-mobile-filter h-screen border-b-products px-5 py-6 absolute top-0 duration-500
      500px:static 500px:bg-bg-products 500px:w-full 500px:-translate-x-0"
         :class="{'active': general.openMobileFilterPanel }"
    >
      <img
        @click="general.openMobileFilterPanel = false"
        src="../../assets/images/svg/basket/basket-close-btn.svg" alt=""
        class="w-4 h-4 absolute right-2 top-1 cursor-pointer 500px:hidden"
      >
      <InputSearch />
      <div class="bg-white px-3 border bg-color">
        <div class="font-semibold	pl-5 pt-5">{{ $t("blog.category") }}</div>
        <ul class="pl-[25px]">
          <li class=" marker:text-main-color cursor-pointer hover:text-main-color duration-500 m-[10px]">{{ $t("blog.apiculture") }}</li>
          <li class=" marker:text-main-color cursor-pointer hover:text-main-color duration-500 m-[10px]">{{ $t("blog.forestHoney") }}</li>
          <li class=" marker:text-main-color cursor-pointer hover:text-main-color duration-500 m-[10px]">{{ $t("blog.honeySweets") }}</li>
          <li class=" marker:text-main-color cursor-pointer hover:text-main-color duration-500 m-[10px]">{{ $t("blog.honeyComb") }}</li>
          <li class=" marker:text-main-color cursor-pointer hover:text-main-color duration-500 m-[10px]">{{ $t("blog.naturalHoney") }}</li>
        </ul>
      </div>
      <div class="bg-white h-[235px] px-3 border bg-color">
        <div class="font-semibold	pl-5 pt-5">{{ $t("blog.latestNews") }}</div>
      </div>
    </div>
    <div class="max-w-[880px] w-full min-h-[710px] h-full px-4 pb-4">
      <BlogItems/>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {useGeneralStore} from "@/store/generalStore";
import BlogItems from "@/views/Blogs/BlogItems.vue";

const general = useGeneralStore();
</script>

<style scoped lang="scss">
li {
  list-style-type: disc;
}
.active {
  @apply fixed transition z-[51] transform translate-x-0 500px:static duration-500
}
</style>
