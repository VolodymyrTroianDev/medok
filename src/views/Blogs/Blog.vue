<template>
  <div class="bg-blogs-color pb-[30px]">
    <div class="font-marck-script text-center text-[54px]">
      {{ $t("blog.title") }}
    </div>
    <div class="flex lg:max-w-[1300px] mx-auto justify-between max-w-[1311px]">
      <div
        class="500px:max-w-[270px] w-full flex flex-col gap-7 border-t-2 -translate-x-full bg-bg-mobile-filter h-screen border-b-products px-5 py-6 absolute top-0 duration-500 500px:static 500px:bg-bg-products 500px:w-full 500px:-translate-x-0"
        :class="{ active: general.openMobileFilterPanel }"
      >
        <inline-svg
          @click="general.openMobileFilterPanel = false"
          src="/assets/images/svg/basket/basket-close-btn.svg"
          alt=""
          class="absolute right-2 top-1 cursor-pointer 500px:hidden w-[25px] h-[25px]"
        />
        <button
          class="w-full flex items-center justify-between mx-auto border rounded px-3 py-2 border-color-green bg-white"
          v-if="dataBase.state?.data?.userStatus === 1"
          @click="general.openAddArticlePanel = true"
        >
          <span>{{ $t("blog.addArticle") }}</span>
          <inline-svg
            src="/assets/images/svg/edit-icon.svg"
            class="w-[25px] h-[27px] cursor-pointer bg-no-repeat"
            alt=""
          />
        </button>
        <InputSearch />
        <div class="bg-white px-3 border bg-color">
          <div class="font-semibold pl-5 pt-5">
            {{ $t("blog.category") }}
          </div>
          <ul class="pl-[25px]">
            <li
              class="marker:text-main-color cursor-pointer hover:text-main-color duration-500 m-[10px]"
            >
              {{ $t("blog.apiculture") }}
            </li>
            <li
              class="marker:text-main-color cursor-pointer hover:text-main-color duration-500 m-[10px]"
            >
              {{ $t("blog.forestHoney") }}
            </li>
            <li
              class="marker:text-main-color cursor-pointer hover:text-main-color duration-500 m-[10px]"
            >
              {{ $t("blog.honeySweets") }}
            </li>
            <li
              class="marker:text-main-color cursor-pointer hover:text-main-color duration-500 m-[10px]"
            >
              {{ $t("blog.honeyComb") }}
            </li>
            <li
              class="marker:text-main-color cursor-pointer hover:text-main-color duration-500 m-[10px]"
            >
              {{ $t("blog.naturalHoney") }}
            </li>
          </ul>
        </div>
        <div class="bg-white h-[235px] px-3 border bg-color">
          <div class="font-semibold pl-5 pt-5">
            {{ $t("blog.latestNews") }}
          </div>
        </div>
      </div>
      <div class="max-w-[880px] w-full min-h-[710px] h-full">
        <div
          class="flex flex-col items-center border-t-2 border-b-products max-w-[930px] w-full bg-bg-products py-5 px-10"
        >
          <BlogItems />
        </div>
        <AddArticle
          v-if="
            general.openAddArticlePanel &&
            dataBase.state?.data?.userStatus === 1
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const dataBase = useDatabaseStore();
const general = useGeneralStore();
</script>

<style scoped lang="scss">
li {
  list-style-type: disc;
}

.active {
  @apply fixed transition z-[51] transform translate-x-0 500px:static duration-500;
}
</style>
