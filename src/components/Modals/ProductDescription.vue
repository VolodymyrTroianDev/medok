<template>
  <MyModal :styles="'flex flex-col h-full justify-between max-h-[900px] max-w-[884px] min-h-[420px] modal p-5 w-full items-center'" :show="openProductDescription" @close-modal="openProductDescription = false">
    <div class="description-title">{{ product.name }}</div>
    <img
      src="../../assets/images/svg/basket/basket-close-btn.svg" alt="" class="cursor-pointer active:scale-75 transition-transform duration-150 ease-in-out absolute top-5 right-5 bg-no-repeat bg-center bg-cover"
      @click="openProductDescription = false"
    >
    <Carousel :wrap-around="true" :autoplay="5000" :items-to-show="1">
      <Slide v-for="slide in product.carousel" :key="slide">
        <img :src="slide" class="h-[300px] bg-no-repeat bg-center bg-cover"/>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
      <div class="w-full overflow-y-auto max-h-[300px]">
        <div class="flex flex-col p-3">
            <div class="description-title">{{ $t("products.description") }}</div>
            <div class="description-text text-justify">{{ product.description }}</div>
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
      <div class="flex justify-end w-full pe-3">
        <CustomCounterBtn :price="product.price"/>
      </div>
      <div class="flex gap-2 w-full justify-evenly">
        <button
          class="red-btn max-w-[300px] text-xs sm:text-lg"
          @click="openProductDescription = false"
        >
          {{ $t("products.backToProducts") }}
        </button>
        <button
          class="red-btn max-w-[300px] text-xs sm:text-lg"
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
