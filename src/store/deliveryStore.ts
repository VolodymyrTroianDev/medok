import {defineStore} from "pinia";
import {reactive} from "vue";
import {ProductEntity} from "@/types/products-types";
import {getItem} from "@/services/LocalStorage";
import axios from "axios";

export const useDeliveryStore = defineStore("delivery", () => {
  const state = reactive({
    "apiKey": "f3f692069fd6a18b05c4aae6eee41a41",
    "modelName": "Address",
    "calledMethod": "getWarehouses",
    "methodProperties": {
      "CityName": ""
    }
  })
  const NOVA_POSHTA_URL = "https://api.novaposhta.ua/v2.0/json/";
  const UKR_POSHTA_URL = "https://api.novaposhta.ua/v2.0/json/";
const searchDeliveryNovaPoshta = async (cityName:string) => {
  state.methodProperties.CityName = cityName
  return await axios.post(NOVA_POSHTA_URL,state);
}
  return {
    searchDeliveryNovaPoshta
  }
})
