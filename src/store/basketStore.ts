import {defineStore} from "pinia";
import {reactive} from "vue";
import {getItem, setItem} from "@/services/LocalStorage";

export const useBasketStore = defineStore("basket", () => {
  const state = reactive({
    selectedProducts: getItem("basket") || [],
    inBasket:[],
  });
  if (state.selectedProducts.length > 0){
    state.selectedProducts.forEach(product => {
      state.inBasket.push(product.uid)
    })
  }
  const updateBasketStore = (updateData) => {
    state.selectedProducts = updateData;
    setItem("basket",updateData);
    state.inBasket = [];
    state.selectedProducts.forEach(product => {
      state.inBasket.push(product.uid)
    })
  }
  return { state,updateBasketStore }
});
