<template>
  <div
    class="custom-shadow w-full lg:max-w-[323px] rounded-2xl p-[23px] bg-fafafa min-w-[250px]"
  >
    <div
      class="w-full font-semibold text-2xl text-gray-900 border-b border-gray-300 pb-1 mb-1"
    >
      {{ $t("basket.sum") }}
    </div>
    <div class="flex justify-between mb-3">
      <div class="currency">
        {{ props.total.totalProduct }} {{ $t("basket.numberProduct") }}
      </div>
      <div class="currency">{{ props.total.totalPrice }} ₴</div>
    </div>
    <div class="flex justify-between border-b border-gray-300 mb-1 pb-1">
      <div class="currency">
        {{ $t("basket.shippingCost") }}
        <span class="text-counter">*</span>
      </div>
      <div class="currency">{{ delivery.state.deliveryCurrency }} ₴</div>
    </div>
    <div class="flex justify-between">
      <div class="currency">
        {{ $t("basket.pay") }}
      </div>
      <div class="currency">
        {{ props.total.totalPrice + delivery.state.deliveryCurrency }} ₴
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const delivery = useDeliveryStore();
const props = defineProps<{
  total: {
    totalPrice: number;
    totalProduct: number;
  };
}>();
</script>

<style scoped>
.currency {
  @apply font-semibold text-base leading-6;
}
</style>
