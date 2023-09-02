<template>
  <div class="font-marck-script text-[54px] text-center">{{ $t("basket.checkout") }}</div>
  <div class="flex justify-between flex-wrap lg:flex-nowrap">
    <div class="flex flex-col xl:ms-14 xl:mr-14 mx-6 gap-4 xl:gap-0 mb-5 w-full lg:w-2/5">
      <div class="flex flex-col gap-4 xl:gap-0">
        <div class="flex gap-4">
          <div class="bg-main-color rounded-full w-[24px] h-[24px]">
            <div class="text-white text-center">1</div>
          </div>
          <div class="text-[18px] font-semibold">{{ $t("basket.contactDetails") }}</div>
        </div>
        <div class="flex flex-col gap-5 p-0 sm:p-6 ">
          <div class="flex justify-between lg:justify-center gap-5 lg:w-full flex-wrap lg:flex-nowrap ">
            <input-text  class="focus:ring-0 focus:ring-offset-0 w-full">
              {{ $t("basket.surname") }}
            </input-text>
            <input-text  class="focus:ring-0 focus:ring-offset-0 w-full">
              {{ $t("basket.name") }}
            </input-text>
          </div>
          <div class="flex justify-between lg:justify-center gap-5 lg:w-full flex-wrap lg:flex-nowrap ">
            <input-text  class="focus:ring-0 focus:ring-offset-0 w-full">
              {{ $t("basket.phoneNumber") }}
            </input-text>
            <input-text  class="focus:ring-0 focus:ring-offset-0 w-full">
              {{ $t("profile.email") }}
            </input-text>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex gap-4">
          <div class="bg-main-color rounded-full w-[24px] h-[24px]">
            <div class="text-white text-center">2</div>
          </div>
          <div class="text-[18px] font-semibold">{{ $t("basket.delivery") }}</div>
        </div>
        <LocationSelect class="mt-0 xl:mt-6 mb-6 xl:0"/>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex gap-4">
          <div class="bg-main-color rounded-full w-[24px] h-[24px]">
            <div class="text-white text-center">3</div>
          </div>
          <div class="text-[18px] font-semibold">{{ $t("basket.payment") }}</div>
        </div>
        <RadioBtn
          @update:model-value="onUpdateRadioBtn"
        >
          {{ $t("basket.paymanentText") }}
        </RadioBtn>
      </div>
    </div>
    <div class="flex flex-wrap flex-col-reverse xl:flex-row xl:flex-nowrap lg:w-3/5 mx-4 lg:mx-0 gap-4">
      <BasketItem class="lg:w-3/5 lg:min-w-[500px] px-2 pt-1"/>
      <div class="w-full xl:w-2/5 px-2 flex flex-col items-center gap-7">
        <TotalsPrice />
        <button class="red-btn max-w-[263px]">
          {{ $t("basket.confirmOrder") }}
        </button>
        <div class="text-color-green max-w-[323px]">
          <span class="text-red-600">*</span>
          <span class="">{{ $t("basket.deliveryText") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import BasketItem from "@/components/Modals/Basket/BasketItem.vue";
import TotalsPrice from "@/views/Orders/TotalsPrice.vue";

const check = ref(false)
const onUpdateRadioBtn = (flag) => {
  check.value = flag
}
</script>

<style scoped>
</style>
