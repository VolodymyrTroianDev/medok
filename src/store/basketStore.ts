import {defineStore} from "pinia";
import {reactive} from "vue";
import {getItem} from "@/services/LocalStorage";

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
  return { state }
});
