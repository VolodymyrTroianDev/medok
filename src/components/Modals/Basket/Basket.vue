<template>
  <div class="basket" :class="{ active: store.openBasketModal }" v-on-click-outside="closeBasket" >
    <img class="absolute right-0 p-5 cursor-pointer" src="../../../assets/images/svg/basket/basket-close-btn.svg" alt="" @click="store.openBasketModal = false">
    <div class="font-marck-script text-center text-[48px] mt-[30px]">
      {{ $t("basket.basket") }}
    </div>
    <img v-show="basket.state.inBasket.length === 0" src="../../../assets/images/svg/basket/empty-icon.svg" alt="" class="w-full h-full">
    <BasketItem v-show="basket.state.inBasket.length > 0"/>
    <div class="basket-footer">
      <div class="flex items-center justify-center" v-show="basket.state.inBasket.length > 0">
        <div class="text-white text-center text-[17px] p-3">{{ $t("basket.total") }}:</div>
        <div class="text-white ">{{ total }} ₴</div>
      </div>
      <div v-show="basket.state.inBasket.length === 0" class="text-white text-center text-[17px] p-3">{{ $t("basket.empty") }}</div>
      <div v-show="basket.state.inBasket.length > 0" class="flex justify-around flex-wrap md:flex-nowrap gap-4">
        <button class="basket-btn" @click="clearBasket">{{ $t("basket.clearBasket") }}</button>
        <button class="basket-btn" @click="createOrder">{{ $t("basket.goToOrder") }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGeneralStore } from "@/store/generalStore";
import { vOnClickOutside } from '@vueuse/components'
import {computed, defineAsyncComponent} from "vue";
import {useBasketStore} from "@/store/basketStore";
import {useRouter} from "vue-router";
const store = useGeneralStore();
const router = useRouter();
const basket = useBasketStore();
const closeBasket = () => {
  store.openBasketModal = false
}
const total = computed(() => {
  let total = 0
  basket.state?.selectedProducts.forEach((product) => {
    total += Number(product?.quantity?.price);
  })
  return total || 0
})
const createOrder = () => {
  store.openBasketModal = false;
  router.push({ name: "OrderingOrder" })
}
const clearBasket = () => {
  basket.updateBasketStore([]);
}
const BasketItem = defineAsyncComponent(
  () => import("@/components/Modals/Basket/BasketItem.vue")
);
</script>

<style scoped lang="scss">
.basket {
  box-shadow: 0 0 26px rgba(139, 54, 0, 0.13);
  @apply
  fixed max-w-[500px]
  w-full h-full
  top-0 right-0
  bg-white
  flex z-[51]
  ease-in-out
  transform
  translate-x-full
  duration-500
  transition
  flex-col
  justify-between
}
.active {
  @apply transform translate-x-0
}
.basket-footer {
  background-image: url("../../../assets/images/svg/basket/basket-footer.svg");
  @apply w-full h-[152px]
}
.basket-btn {
  @apply font-semibold border rounded-full text-white w-[200px] h-[35px] text-[14px]
}
</style>
