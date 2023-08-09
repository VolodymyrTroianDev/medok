<template>
  <div class="flex justify-between items-center mt-2 gap-1">
    <div class="custom-shadow flex justify-between items-center w-[62px] h-5 bg-white shadow-sm rounded-lg">
      <div class="custom-shadow relative cursor-pointer w-5 h-5 bg-white shadow-sm rounded-full">
        <div class="flex justify-center items-center h-5 transition duration-300 ease-in-out active:scale-125" @click="increment">-</div>
      </div>
      <div class="flex items-center h-5">{{ productQuantity }}</div>
      <div class="custom-shadow relative cursor-pointer w-5 h-5 bg-white shadow-sm rounded-full">
        <div class="flex justify-center items-center h-5 transition duration-300 ease-in-out active:scale-125" @click="decrement">+</div>
      </div>
    </div>
    <div class="font-lato font-semibold text-lg leading-6 text-gray-800 flex gap-1">
      <div class="">{{ $t("products.price") }}:</div>
      <div class="text-main-color"> {{ priceQuantity }} ₴</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps<{
  price: number
}>()
const productQuantity = ref<number>(1);
const priceQuantity = ref<number>(props.price);
const increment = () => {
  if (productQuantity.value > 1) {
    --productQuantity.value;
    priceQuantity.value = Math.max(priceQuantity.value - props.price, 0);
  }
}

const decrement = () => {
  if (productQuantity.value > 0) {
    ++productQuantity.value;
    priceQuantity.value = priceQuantity.value + props.price;
  }
}
</script>

<style scoped lang="scss">
.custom-shadow {
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
}
</style>
