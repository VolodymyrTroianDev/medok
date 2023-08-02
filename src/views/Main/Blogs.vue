<template>
  <!-- Blogs -->
  <article class="relative">
    <h4 class="text-main-color text-center md:text-xl uppercase font-medium">
      {{ $t("blog.subTitleDashboard") }}
    </h4>
    <h2 class="font-marck-script text-black text-center text-[24px] 2sm:text-[54px]">{{ $t("blog.titleDashboard") }}</h2>
    <!-- Blogs Content -->
    <div class="md:mt-28 bg-blog w-full bg-cover bg-no-repeat bg-transparent">
<!--      <img src="../../assets/images/png/main/blogs/blog-bg.png" class="bg-blog w-full -z-[1]">-->
      <div
        class="max-w-[1960px] mx-auto py-[250px] 3xl:py-[403px]"
      >
        <CarouselBlogs :data="blogsCard"/>
        <!-- Blog Cards -->
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import CarouselBlogs from "@/views/Main/CarouselBlogs.vue";

const blogsCard = [
  {
    name: "ДИВОВИЖНІ ПЕРЕВАГИ ОЦТУ ТА МЕДУ ДЛЯ ЗДОРОВ’Я",
    img: "blog-1-img",
    data: "28 жовтня, 2020",
    desription:
      " Але я повинен пояснити вам, як народилася вся ця помилкова ідея засудження насолоди та вихваляння болю, і я дам вам повний опис системи, викладу справжні вчення великого дослідника істини.",
  },
  {
    name: "ДИВОВИЖНІ ПЕРЕВАГИ ОЦТУ ТА МЕДУ ДЛЯ ЗДОРОВ’Я",
    img: "blog-1-img",
    data: "28 жовтня, 2020",
    desription:
      " Але я повинен пояснити вам, як народилася вся ця помилкова ідея засудження насолоди та вихваляння болю, і я дам вам повний опис системи, викладу справжні вчення великого дослідника істини.",
  },
  {
    name: "ДИВОВИЖНІ ПЕРЕВАГИ ОЦТУ ТА МЕДУ ДЛЯ ЗДОРОВ’Я",
    img: "blog-1-img",
    data: "28 жовтня, 2020",
    desription:
      " Але я повинен пояснити вам, як народилася вся ця помилкова ідея засудження насолоди та вихваляння болю, і я дам вам повний опис системи, викладу справжні вчення великого дослідника істини.",
  },
  {
    name: "ДИВОВИЖНІ ПЕРЕВАГИ ОЦТУ ТА МЕДУ ДЛЯ ЗДОРОВ’Я",
    img: "blog-1-img",
    data: "28 жовтня, 2020",
    desription:
      " Але я повинен пояснити вам, як народилася вся ця помилкова ідея засудження насолоди та вихваляння болю, і я дам вам повний опис системи, викладу справжні вчення великого дослідника істини.",
  },
  {
    name: "ДИВОВИЖНІ ПЕРЕВАГИ ОЦТУ ТА МЕДУ ДЛЯ ЗДОРОВ’Я",
    img: "blog-1-img",
    data: "28 жовтня, 2020",
    desription:
      " Але я повинен пояснити вам, як народилася вся ця помилкова ідея засудження насолоди та вихваляння болю, і я дам вам повний опис системи, викладу справжні вчення великого дослідника істини.",
  },
]
</script>

<style scoped>

</style>
