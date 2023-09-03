<template>
  <div class="flex items-center">
    <input
      type="checkbox"
      name="paymentType"
      v-model="statusRadio"
      @change="$emit('update:modelValue', statusRadio)"
      id="paymentAfterDelivery"
      class="hidden opacity-0 z-[-1] w-[35px]"
    />
    <label
      for="paymentAfterDelivery"
      class="payment__method flex items-center px-4 gap-4 w-full max-w-[826px] h-[79px] cursor-pointer checked:bg-main-color rounded-lg bg-white transition-all border"
    >
      <span class="checker w-[10px] h-[10px] border rounded-full bg-color-green transition-all duration-300 outline outline-2 outline-color-green outline-offset-4"></span>
      <span class="font-normal text-base text-black">
        <slot/>
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
})
const statusRadio = ref<boolean>(props.modelValue || false);
defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
input:checked ~ .payment__method {
  border-color: #d15d0d;
}
input:checked ~ .payment__method > .checker {
  background-color: #d15d0d;
  outline-color: #d15d0d;
}
</style>
