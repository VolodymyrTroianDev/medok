<template>
  <header
    class="bg-cover h-[200px] bg-no-repeat md:h-[176px] "
    :class="{'bg-header': props.hiddenBackground, 'bg-blogs-color': route.path === '/ua/blog' }"
  >
    <div class="flex flex-col items-center 500px:hidden px-5 pt-5 gap-5">
      <router-link
        tag="button"
        :to="{ name: 'Main'}"
        class="flex items-center gap-3 font-marck-script text-white text-[23px] lg:text-[30px]">
        <img
          src="./../../assets/images/svg/logo.svg"
          class="w-9 h-9 hover:scale-110 transition-all duration-350"
          alt=""
        >
        {{ $t("header.title") }}
      </router-link>
      <div class="flex gap-5">
        <img
          src="../../assets/images/svg/menu-icon.svg"
          class="cursor-pointer w-[25px]"
          @click="general.openMobileHeader = !general.openMobileHeader"
          alt=""
        >
        <button class="relative w-[30px]" @click="general.openBasketModal = !general.openBasketModal" @click.stop>
          <basket-img/>
          <span
            class="w-[17px] h-[17px] absolute right-0 bg-counter text-white rounded-full bottom-[-5px] text-[12px]">1</span>
        </button>
      </div>
    </div>
    <div
      class="fixed top-0
      bg-bg-mobile-filter
      h-screen
      500px:h-[58px]
      z-[1]
      -translate-x-full
      500px:-translate-x-0
      500px:static
      500px:bg-transparent
      500px:z-10
      w-full"
      :class="{'active': general.openMobileHeader } "
    >
      <img
        src="../../assets/images/svg/basket/basket-close-btn.svg" alt=""
        class="w-4 h-4 cursor-pointer absolute right-3 top-3 z-[3] 500px:hidden"
        v-if="general.openMobileHeader"
        @click="general.openMobileHeader = false"
      >
      <div
        class="
          flex items-center
          w-full
          flex-wrap mb-10
          mx-auto justify-center
          gap-4 md:mb-0 md:gap-0
          500px:static
          duration-500
          md:justify-between px-5 pt-5
          md:py-[30px] md:px-[40px]
          md:max-w-[1600px]"
      >
        <router-link
          tag="button"
          :to="{ name: 'Main'}"
          class="flex items-center gap-3 font-marck-script text-white text-[23px] lg:text-[30px] ">
          <img src="./../../assets/images/svg/logo.svg" class="w-9 h-9 hover:scale-110 transition-all duration-350"
               alt="">
          {{ $t("header.title") }}
        </router-link>
        <NavComponents/>
        <BtnGroup/>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import NavComponents from "@/components/Header/NavComponents.vue";
import BtnGroup from "@/components/CustomUI/BtnGroup.vue";
import {useRoute} from "vue-router";
import {useGeneralStore} from "@/store/generalStore";
import BasketImg from "@/assets/images/svg/basket-img.vue";

const route = useRoute();
const general = useGeneralStore();
const props = defineProps({
  hiddenBackground: {
    type: Boolean,
    default: true
  }
})

</script>

<style scoped>
.active {
  @apply fixed transition z-[2] transform translate-x-0 500px:static duration-500
}
</style>
