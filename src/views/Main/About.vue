<template>
  <article class="relative w-full">
    <img src="../../assets/images/png/main/main.png" alt="" class="absolute top-[-290px] z-[-1] w-full max-h-[1550px] sm:h-[1550px] sm/2:h-[1385px]">
    <h4 class="text-main-color text-center text-xl uppercase font-medium">{{ $t("about.subTitle") }}</h4>
    <h2 class="font-marck-script text-black text-center text-[24px] lg:text-[54px]">{{ $t("about.title") }}</h2>
    <img src="" class="bg-header-1" alt="">
    <div class="px-5 flex gap-5 flex-wrap items-center justify-center max-w-[900px] mb-10 mx-auto lg:flex-nowrap lg:gap-0"  data-aos="zoom-in-up">
      <img src="../../assets/images/png/main/about-ill-1.png" class="w-1/2" alt="">
      <div class="ml-4">
        <h3 class="text-2xl mb-[25px] text-center lg:text-start">{{ $t("about.itemTitle1") }}</h3>
        <p class="">{{ $t("about.itemText1") }}</p>
      </div>
    </div>
    <div class="px-5 flex gap-5 flex-wrap items-center justify-center max-w-[900px] mb-10 mx-auto lg:flex-nowrap lg:gap-0" data-aos="zoom-in-up">
      <img src="../../assets/images/png/main/about-ill-2.png" class="w-1/2" alt="">
      <div class="ml-4">
        <h3 class="text-2xl mb-[25px] text-center lg:text-start">{{ $t("about.itemTitle2") }}</h3>
        <p>{{ $t("about.itemText2") }}</p>
      </div>
    </div>
    <div class="px-5 flex gap-5 flex-wrap items-center justify-center max-w-[900px] mx-auto lg:flex-nowrap lg:gap-0"  data-aos="zoom-in-up">
      <div class="w-[120px] sm:w-[200px] 2sm:w-[240px] lg:w-1/2" >
        <img src="../../assets/images/png/main/about-ill-3.png"  class="mx-auto mx-w-[350px]" alt="" >
      </div>
      <div class="w-full lg:w-1/2  lg:ml-4">
        <h3 class="text-2xl mb-[25px] text-center lg:text-start">{{ $t("about.itemTitle3") }}</h3>
        <p>{{ $t("about.itemText3") }}</p>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">

</script>

<style scoped>
/*.about_us {*/
/*  @apply*/
/*}*/
</style>
