<template>
  <div
    class="bg-header-main bg-bottom bg-cover bg-no-repeat bg-transparent"
  >
    <Header :hiddenBackground="false"/>
    <div class="header-component">
      <h1 class="font-marck-script text-white text-[25px] lg:text-[48px] text-center lg:text-start">
        {{ $t("header.previewTitle") }}
      </h1>
      <div class="relative w-full md:w-1/2">
        <img src="../../assets/images/png/preview-image.png" class="">
        <img src="../../assets/images/png/bees.png" alt="" class="bee bee1 absolute top-1 left-1 w-12 md:w-16 lg:w-20">
        <img src="../../assets/images/png/bees2.png" alt="" class="bee bee2 absolute right-5 top-12 w-12 md:w-16 lg:w-20">
        <img src="../../assets/images/png/bees3.png" alt="" class="bee bee3 absolute left-1/2 bottom-0 w-12 md:w-16 lg:w-20">
      </div>
    </div>
  </div>
  <About />
  <WhyUs/>
  <Blogs/>
</template>

<script setup lang="ts">
import Header from "@/components/Header/Header.vue";
import About from "@/views/Main/About.vue";
import WhyUs from "@/views/Main/WhyUs.vue";
import Blogs from "@/views/Main/Blogs.vue";
</script>
<style scoped>
.header-component {
@apply md:flex
  px-[40px]
  items-center
  justify-center
  gap-[43px]
  pb-[200px]
  max-w-[1600px]
  mx-auto
  flex-wrap
  lg:flex-nowrap
}
.bee {
  animation-duration: 4s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}


@keyframes beeFly {
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-30px) rotate(15deg);
  }
  100% {
    transform: translateY(0) rotate(0);
  }
}

.bee1 {
  animation-name: beeFly;
  animation-delay: 0s;
}

.bee2 {
  animation-name: beeFly;
  animation-delay: 1s;
}

.bee3 {
  animation-name: beeFly;
  animation-delay: 2s;
}
</style>
