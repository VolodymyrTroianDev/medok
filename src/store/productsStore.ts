import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../main";
import { getItem } from "@/services/LocalStorage";
import { useGeneralStore } from "@/store/generalStore";
import { ProductEntity } from "@/types/products-types";

export const useProductsStore = defineStore("products", () => {
  const state = reactive({
    products: {} as ProductEntity,
    locale: getItem("language") || "ua"
  })
  const general = useGeneralStore();
  const priceLimit = ref<number[]>([0, 3000]);
  const fetchProducts = async (locale) => {
    general.statusLoader = true;
    const docRef = doc(db, "products", locale);
    const querySnapshot = await getDoc(docRef);
    state.products = querySnapshot.data();
    general.statusLoader = false;
  }
  const categories = () => {
    const arr = Object.values(state.products).map((item) => ({
      name: item.name,
      slag: item.slag,
    }));
    arr.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    return arr;
  }
  const filterProducts = () => {
    const arr = Object.values(state.products);
    const products: Record<string, any> = { ...state.products };

    arr.forEach((element: any) => {
      let data = element.items;
      const result = data.filter(
        (items: any) => items.price >= priceLimit.value[0] && items.price <= priceLimit.value[1]
      );

      products[element.slag] = {
        items: result,
        name: element.name,
        slag: element.slag,
      };
    });
    return products;
  }
  return {
    state,
    fetchProducts,
    categories,
    filterProducts,
    priceLimit
  }
})
