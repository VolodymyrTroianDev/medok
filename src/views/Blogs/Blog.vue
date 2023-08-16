<template>
<div class="bg-blogs-color h-screen">
  <div class="font-marck-script text-center text-[54px]">{{ $t("blog.title") }}</div>
  <div class="flex lg:max-w-[1300px] justify-between mx-auto gap-10">
    <div class="max-w-[270px] w-full flex flex-col gap-7">
      <InputSearch />
      <div class="bg-white h-[235px] px-3 border bg-color">
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
    <div class="max-w-[880px] w-full min-h-[710px] h-full bg-white border bg-color"></div>
  </div>
</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
li {
  list-style-type: disc;
}
</style>
