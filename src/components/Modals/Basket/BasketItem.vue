<template>
  <div class="overflow-x-hidden">
    <TransitionGroup name="list" tag="ul">
      <li
        class="h-fit min-h-[200px] mix-blend-normal rounded-xl md:ml-0 md:min-h-44 w-full flex items-center shadow-custom mb-3"
        v-for="(item, index) in basket.state.selectedProducts"
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
            <div class="font-lato font-normal leading-tight text-xl">
              {{ item.name }}
            </div>
            <inline-svg
              src="/assets/images/svg/basket/basket-close-btn.svg"
              alt=""
              class="bg-no-repeat bg-center cursor-pointer w-[25px] h-[25px]"
              @click="removeProduct(item)"
            />
          </div>
          <div
            class="max-h-28 h-full overflow-y-scroll font-lato font-normal leading-tight text-gray-700 text-sm"
          >
            {{ item.description }}
          </div>
          <CustomCounterBtn
            :product="item"
            @update:quantity="
              (quantity) => {
                onUpdateQuantity(quantity, index);
              }
            "
          />
        </div>
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const basket = useBasketStore();
const removeProduct = (product) => {
  const updateBasket = basket.state.selectedProducts.filter(
    (item) => item.uid !== product.uid,
  );
  basket.updateBasketStore(updateBasket);
};
const onUpdateQuantity = (data: Quantity, index) => {
  basket.state.selectedProducts[index].quantity = data;
};
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
