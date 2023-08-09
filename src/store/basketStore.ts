import {defineStore} from "pinia";
import {reactive} from "vue";

export const useBasketStore = defineStore("basket", () => {
  const state = reactive({

  });
  return { state }
});
