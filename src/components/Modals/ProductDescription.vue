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
        <CustomCounterBtn
          :product="product"
          @updateQuantity="onUpdateQuantity"
        />
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
          @click="pushToBasket(product.uid)"
        >
          <div class="" v-if="checkInBasket(product.uid)">Продукт вже додано</div>
          <div class="" v-else>{{ $t("products.addedToCart") }}</div>
        </button>

      </div>
  </MyModal>
</template>

<script setup lang="ts">
import { useGeneralStore } from "@/store/generalStore";
import { storeToRefs } from "pinia";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { reactive } from "vue";
import { Quantity } from "@/types/products-types";
import { useBasketStore} from "@/store/basketStore";
import { setItem } from "@/services/LocalStorage";
const general = useGeneralStore()
const { openProductDescription } = storeToRefs(general);
const props = defineProps<{
  product: {}
}>()

const quantity = reactive<Quantity>({
  product: 1,
  price: props.product.price || 0
})
const basket = useBasketStore();

const onUpdateQuantity = (data:Quantity) => {
  quantity.price = data.price;
  quantity.product = data.product;
  props.product.quantity = quantity
}
const pushToBasket = (uid) => {

  if (checkInBasket(uid)) {
    general.openProductDescription = false;
    general.openBasketModal = true;
  }

  const existingProductIndex = basket.state.selectedProducts.findIndex(product => product.uid === uid);
  const inBasket = basket.state.inBasket.findIndex(product => product === uid);
  if (existingProductIndex !== -1) {
    basket.state.selectedProducts[existingProductIndex] = props.product;
  } else {
    basket.state.selectedProducts.push(props.product);
  }
  if (inBasket === -1) {
    basket.state.inBasket.push(uid)
  }

  setItem("basket",basket.state.selectedProducts)
  general.openProductDescription = false;
}
const checkInBasket = (uid:string) => {
  const index = basket.state.inBasket.findIndex(product => product === uid);
  return index !== -1 ? true : false;
}
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
