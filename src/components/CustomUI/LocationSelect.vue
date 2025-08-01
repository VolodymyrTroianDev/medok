<template>
  <div class="max-w-[826px] w-full relative" v-on-click-outside="closeSelector">
    <div
      class="relative flex items-center h-fit border rounded-md p-4 gap-10 cursor-pointer color-green hover:border-orange-700"
      @click.stop.prevent="toggleSelector = !toggleSelector"
      :class="{
        'border-orange-700':
          toggleSelector || Object.keys(selectDelivery).length > 0,
      }"
    >
      <inline-svg src="/images/svg/basket/point-map.svg" alt="point map" />
      <div class="flex flex-col">
        <div class="text-color-green">
          {{ selectDelivery?.SettlementTypeCode }}
          {{ selectDelivery?.MainDescription || $t("selectCity.title") }}
        </div>
        <div class="">
          {{ selectDelivery?.Present || $t("selectCity.example") }}
        </div>
        <div class="text-color-green">
          {{ selectDelivery?.Area || $t("selectCity.area") }}
          {{ selectDelivery?.ParentRegionTypes }}
        </div>
      </div>
      <inline-svg
        v-if="!(Object.keys(selectDelivery).length > 0)"
        src="/assets/images/svg/basket/chevron-right.svg"
        class="absolute right-5 ease-in-out duration-300 z-10 w-[25px] h-[25px]"
        :class="{
          'rotate-90': toggleSelector,
        }"
      />
      <inline-svg
        v-else
        src="/assets/images/svg/basket/basket-close-btn.svg"
        class="absolute right-5 ease-in-out duration-300 z-10 hover:rotate-90 w-[25px] h-[25px]"
        @click="clearSelect"
        :class="{
          'rotate-90': toggleSelector,
        }"
      />
    </div>
    <Transition>
      <div
        class="w-full absolute top-36 lg:top-32 left-0"
        v-if="toggleSelector"
        v-on-click-outside="closeSelector"
      >
        <div class="tooltip w-full h-[300px]">
          <div class="tooltiptext max-w-[826px] w-full text-black">
            <div class="p-4">
              <input
                type="text"
                v-model="city"
                @input="searchCity"
                class="search-city w-full p-2 border rounded transition-all duration-500 ease-in-out focus:ring-0"
                :placeholder="$t('selectCity.title')"
              />
            </div>
            <div class="relative" v-if="runLoading">
              <span class="load"></span>
            </div>
            <ul class="p-0 h-[80%] overflow-y-auto">
              <li
                class="hover:bg-gray-50 hover:transition duration-300 cursor-pointer text-start py-1 w-full ps-4"
                @click="selectAddress(data)"
                v-for="data in res"
                :key="data"
              >
                {{ data.Present }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import debounce from "lodash.debounce";
import { vOnClickOutside } from "@vueuse/components";

const delivery = useDeliveryStore(),
  toggleSelector = ref<boolean>(false),
  city = ref<string>(""),
  res = ref<string>(""),
  runLoading = ref<boolean>(false),
  selectDelivery = ref({}),
  emit = defineEmits(["updateCity"]);

const searchCity = debounce(async () => {
  runLoading.value = true;

  if (city.value.length > 0) {
    const { data } = await delivery.searchDeliveryNovaPoshta(city.value);
    runLoading.value = false;
    res.value = data.data[0]?.Addresses;
  } else {
    res.value = [];
    runLoading.value = false;
  }
}, 500);

const closeSelector = () => {
  toggleSelector.value = false;
};

const selectAddress = (data) => {
  selectDelivery.value = data;
  city.value = "";
  emit("updateCity", data?.Present);
  searchCity();
  closeSelector();
};

const clearSelect = () => {
  selectDelivery.value = {};
  emit("updateCity", "");
};
</script>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  background: white;
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
.search-city {
  all: unset;
  width: 100%;
  text-align: start;
  border-bottom: 1px solid #c8c8c8;
  &:focus {
    border-bottom: 1px solid #d46110;
  }
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
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border-bottom: 4px solid #ff3d00;
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
<style></style>
