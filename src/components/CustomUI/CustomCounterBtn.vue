<template>
  <div
    class="mt-2 gap-1 flex justify-between items-center"
  >
    <div class="custom-shadow flex justify-between items-center w-[62px] h-5 bg-white shadow-sm rounded-lg">
      <div class="custom-shadow relative cursor-pointer w-5 h-5 bg-white shadow-sm rounded-full">
        <div class="flex justify-center items-center h-5 transition duration-300 ease-in-out active:scale-125"
             @click="increment">-
        </div>
      </div>
      <div class="flex items-center h-5">{{ quantity.product }}</div>
      <div class="custom-shadow relative cursor-pointer w-5 h-5 bg-white shadow-sm rounded-full">
        <div class="flex justify-center items-center h-5 transition duration-300 ease-in-out active:scale-125"
             @click="decrement">+
        </div>
      </div>
    </div>
    <div class="font-lato font-semibold text-lg leading-6 text-gray-800 flex gap-1"
    >
      <div class="">{{ $t("products.price") }}:</div>
      <div class="text-main-color"> {{ quantity.price }} ₴</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {Quantity} from "@/types/products-types";

const props = defineProps<{
  product: {
    price: number
  },
}>()
const quantity = reactive<Quantity>({
  product: 1,
  price: props.product?.price || 0
})
const emit = defineEmits(["updateQuantity"])
const increment = () => {
  if (quantity.product > 1) {
    --quantity.product;
    quantity.price = Math.max(quantity.price - props.product.price, 0);
    emit("updateQuantity", quantity)
  }
}

const decrement = () => {
  if (quantity.product > 0) {
    ++quantity.product;
    quantity.price = Math.max(quantity.price + props.product.price, 0);
    emit("updateQuantity", quantity)
  }
}
</script>

<style scoped lang="scss">
.custom-shadow {
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
}
</style>
