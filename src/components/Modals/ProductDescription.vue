<template>
  <MyModal :styles="'max-h-[900px] p-5 max-w-[884px] w-full h-full min-h-[420px]'" :show="openProductDescription" @close-modal="openProductDescription = false">
    <div class="description-title">{{ product.name }}</div>
    <img
      src="../../assets/images/svg/basket/basket-close-btn.svg" alt="" class="cursor-pointer active:scale-75 transition-transform duration-150 ease-in-out absolute top-5 right-5 bg-no-repeat bg-center bg-cover"
      @click="openProductDescription = false"
    >
    <Carousel :wrap-around="true" :autoplay="5000" :items-to-show="1">
      <Slide v-for="slide in product.carousel" :key="slide">
        <img :src="slide" width="500" height="500" class="max-w-[500px] max-h-[450px] bg-no-repeat bg-center bg-cover"/>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
      <div class="w-full overflow-y-auto max-h-[300px]">
        <div class="flex flex-col p-3">
            <div class="description-title">{{ $t("products.description") }}</div>
            <div class="description-text">{{ product.description }}</div>
        </div>
        <div class="flex flex-col p-3">
          <div class="description-title">{{ $t("products.compound") }}</div>
          <div class="description-text">{{ product.compound }}</div>
        </div>
        <div class="flex flex-col p-3">
          <div class="description-title">{{ $t("products.capacity") }}</div>
          <div class="description-text">{{ product.capacity }}</div>
        </div>
        <div class="flex flex-col p-3">
          <div class="description-text">{{ product.completeSet }}</div>
        </div>
      </div>
      <div class="flex">
        <button
          class="red-btn max-w-[200px]"
          @click="openProductDescription = false"
        >
          {{ $t("products.backToProducts") }}
        </button>
        <button
          class="red-btn"
        >
          {{ $t("products.addedToCart") }}
        </button>
      </div>
  </MyModal>
</template>

<script setup lang="ts">
import { useGeneralStore } from "@/store/generalStore";
import {storeToRefs} from "pinia";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
const general = useGeneralStore()
const { openProductDescription } = storeToRefs(general);

const props = defineProps<{
  product: {}
}>()

</script>

<style lang="scss">
.description-title {
  @apply font-normal font-semibold text-xl leading-7 text-center
}
.description-text {
  @apply mt-auto p-0 px-[15px] font-normal font-normal text-base leading-6 text-gray-600
}
.modal {
  .carousel__pagination {
    .carousel__pagination-button {
      background: #c8c8c8;
    }
    .carousel__pagination-button--active {
      background: #95410a;
    }
  }
}
</style>
