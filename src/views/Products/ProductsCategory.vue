<template>
  <li class="m-[10px] font-semibold marker:text-main-color transition duration-300 hover:text-main-color ">
    <button
      @click="openCategories({ slag: 'all' })"
      class="cursor"
      :class="{ active: route.params.id === 'all' }"
    >
      {{ $t("products.all") }}
    </button>
  </li>
  <li class="m-[10px] font-semibold marker:text-main-color transition duration-300 hover:text-main-color" v-for="category in productsStore.categories()" key="item">
    <button
      @click="openCategories(category)"
      class="cursor-pointer"
      :class="{ active: route.params.id === category.slag }"
    >
      {{ category.name }}
    </button>
  </li>
</template>

<script setup lang="ts">
import { useProductsStore } from "@/store/productsStore";
import { useGeneralStore } from "@/store/generalStore";
import { useRoute, useRouter } from "vue-router";

const productsStore = useProductsStore();
const general = useGeneralStore();
const router = useRouter();
const route = useRoute();
productsStore.fetchProducts();

const openCategories = (product) => {
  return router.push({
    name: `ProductsItems`,
    params: { locale: route.params.locale, id: product.slag },
  });
}
</script>

<style scoped>
.active {
  @apply text-main-color font-bold
}
</style>
