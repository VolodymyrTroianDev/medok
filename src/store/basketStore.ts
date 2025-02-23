import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { getItem, setItem } from "@/services/LocalStorage";

export const useBasketStore = defineStore("basket", () => {
  const state = reactive({
    selectedProducts: getItem("basket") || [],
    inBasket: [] as string[],
  });

  const updateBasketStore = (updateData) => {
    state.selectedProducts = updateData;
    setItem("basket", updateData);
    state.inBasket = [];
    state.selectedProducts.forEach((product) => {
      state.inBasket.push(product.uid);
    });
  };

  if (state.selectedProducts.length > 0) {
    updateBasketStore(state.selectedProducts);
  }
  const total = computed(() => {
    let totalPrice = 0,
      totalProduct = 0;
    state?.selectedProducts.forEach((product) => {
      totalPrice += Number(product?.quantity?.price);
      totalProduct += Number(product?.quantity?.product);
    });
    return { totalPrice, totalProduct };
  });
  return {
    state,
    updateBasketStore,
    total,
  };
});
