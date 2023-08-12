<template>
  <div class="overflow-x-hidden pt-10 px-5 h-full">
    <TransitionGroup name="list" tag="ul">
      <li
        class="h-[200px] mix-blend-normal rounded-xl md:ml-0 md:min-h-44 w-full flex items-center shadow-custom mb-3"
        v-for="item in basket.state.selectedProducts"
        :key="item.uid"
      >
        <img
          :src="item.img"
          height="135"
          width="110"
          class="m-2 rounded-md object-contain bg-auto"
          alt=""
        />
        <div class="w-full h-full p-3">
          <div class="flex justify-between">
            <div class="font-lato font-normal text-base leading-tight text-xl">{{ item.name }}</div>
            <img
              src="../../../assets/images/svg/basket/basket-close-btn.svg" alt=""
              class="bg-no-repeat bg-center w-4 h-4 cursor-pointer"
              @click="removeProduct(item)"
            >
          </div>
          <div class="max-h-28 h-full overflow-y-scroll font-lato font-normal leading-tight text-gray-700 text-sm">
            {{ item.description }}
          </div>
          <CustomCounterBtn :product="item"/>
        </div>
      </li>
    </TransitionGroup >
  </div>
</template>

<script setup lang="ts">
import CustomCounterBtn from "../../CustomUI/CustomCounterBtn.vue";
import {useBasketStore} from "../../../store/basketStore";

const basket = useBasketStore();
const removeProduct = (product) => {
  const updateBasket = basket.state.selectedProducts.filter(item => item.uid !== product.uid);
  basket.updateBasketStore(updateBasket);
}
</script>

<style scoped>
.shadow-custom {
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #e5e5e5;
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
