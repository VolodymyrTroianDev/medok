<template>
  <div class="w-full" v-on-click-outside="closeSelector">
    <div
      class="relative flex items-center h-fit max-w-[826px] w-full border rounded-md p-4 gap-10 cursor-pointer color-green hover:border-orange-700"
      @click="toggleSelector=!toggleSelector"
      :class="{
      'border-orange-700':toggleSelector || Object.keys(selectDelivery).length > 0
    }"
    >
      <img src="../../assets/images/svg/basket/point-map.svg" alt="point map">
      <div class="flex flex-col">
        <div class="text-color-green">{{ selectDelivery?.CityDescription || $t("selectCity.title") }}</div>
        <div class="">{{ selectDelivery?.Description || $t("selectCity.example")}}</div>
        <div class="text-color-green ">{{ selectDelivery?.SettlementAreaDescription || $t("selectCity.Lviv")}}, {{ selectDelivery?.SettlementRegionsDescription || $t("selectCity.area")}}</div>
      </div>
      <img
        v-if="!Object.keys(selectDelivery).length > 0"
        src="../../assets/images/svg/basket/chevron-right.svg" class="absolute right-5 ease-in-out duration-300 z-10"
        :class="{
          'rotate-90' : toggleSelector,
        }"
      >
      <img
        v-else
        @click="selectDelivery = {}"
        src="../../assets/images/svg/basket/basket-close-btn.svg" class="absolute right-5 ease-in-out duration-300 z-10 w-4 h-4 hover:rotate-90"
      >
    </div>

    <Transition>
      <div class="max-w-[826px] w-full mt-5 mb-5" v-if="toggleSelector">
        <div class="tooltip w-full h-[300px]">
          <div class="tooltiptext max-w-[826px] w-full text-black">
            <div class="p-4">
              <input v-model="city" @input="searchCity" class="w-full border-b" :placeholder="$t('selectCity.title')">
            </div>
            <div class="relative" v-if="runLoading">
              <span class="load"></span>
            </div>
            <ul  class="p-0 h-[85%] overflow-y-auto">
              <li
                class="hover:bg-gray-50 hover:transition duration-300 cursor-pointer text-start py-1 w-full ps-4"
                @click="selectAddress(data)" v-for="data in res" :key="data"
              >
                {{ data.CityDescription}} , {{ data.Description }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {vOnClickOutside} from '@vueuse/components'
import { useDeliveryStore } from "@/store/deliveryStore";
import debounce from 'lodash.debounce'

const delivery = useDeliveryStore(),
  toggleSelector = ref<boolean>(false),
  city = ref<string>(""),
  res = ref<string>(""),
  runLoading = ref<boolean>(false),
  selectDelivery = ref({});

const searchCity = debounce( async () => {
  runLoading.value = true;

  if (city.value.length >0) {
    const { data } = await delivery.searchDeliveryNovaPoshta(city.value);
    runLoading.value = false;
    res.value = data.data
  } else {
    res.value = [];
    runLoading.value = false;
  }
}, 500)
const closeSelector = () => {
  toggleSelector.value = false
}
const selectAddress = (data) => {
  selectDelivery.value = data;
  city.value = "";
  searchCity();
  closeSelector();
}

</script>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  border: 1px solid #d46110;
  text-align: center;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  min-height: 300px;
  height: 100%;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  bottom: 99%;
  left: 50%;
  width: 8px;
  height: 8px;
  border: 1px solid #d46110;
  z-index: 1;
  background: white;
  border-bottom-color: transparent;
  border-right-color: transparent;
  transform: rotate(45deg);
}
input:focus-visible {
  outline: none;
}
.load {
  position: absolute;
  margin-top: 90px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid #ffba0a;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.load::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border-bottom: 4px solid #FF3D00;
  border-left: 4px solid transparent;
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<style>

</style>
