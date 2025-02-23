import { defineStore } from "pinia";
import { reactive } from "vue";
import axios from "axios";
import { db } from "@/main";
import { collection, doc, getDoc, addDoc, getDocs } from "firebase/firestore";
export const useDeliveryStore = defineStore("delivery", () => {
  const state = reactive({
    apiKey: "f3f692069fd6a18b05c4aae6eee41a41",
    modelName: "Address",
    calledMethod: "searchSettlements",
    methodProperties: {
      CityName: "",
    },
    deliveryCurrency: 56,
  });

  const NOVA_POSHTA_URL = "https://api.novaposhta.ua/v2.0/json/";
  const UKR_POSHTA_URL = "https://api.novaposhta.ua/v2.0/json/";
  const searchDeliveryNovaPoshta = async (cityName: string) => {
    state.methodProperties.CityName = cityName;

    return await axios.post(NOVA_POSHTA_URL, state);
  };

  return {
    state,
    searchDeliveryNovaPoshta,
  };
});
