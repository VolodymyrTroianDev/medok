<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center w-full h-full">
    <div
      class="w-[245px] h-[375px] bg-white cursor-pointer duration-700 hover:scale-110 rounded-lg flex flex-col items-center gap-5"
      v-for="product in productsItem" :key="product.uid"
      @click="openProduct(product)"
    >
      <ProductDescription
        v-if="openDetailsById === product.uid"
        :product="product"
      />
      <div class="rounded-t overflow-hidden w-full h-[270px]">
        <img
          class="object-cover w-full h-full"
          :src="product.img"
          :alt="product.name"
        >
      </div>
      <div class="">{{ product.name }}</div>
      <div class="text-xs flex gap-1">
        <div class="">
          {{ product?.completeSet }}
        </div>
        <div class="text-main-color">{{ product?.price }}₴</div>
      </div>
    </div>
  </div>

<!--  <button class="red-btn max-w-[152px]">{{ $t("products.showMore") }}</button>-->
</template>

<script setup lang="ts">
import {useProductsStore} from "@/store/productsStore";
import {useRoute} from "vue-router";
import {computed, defineAsyncComponent, ref} from "vue";
import {useGeneralStore} from "@/store/generalStore";

const general = useGeneralStore();
const productsStore = useProductsStore();
const route = useRoute();
const props = defineProps<{
  items: {}
}>()
const openDetailsById = ref<string>('');
const productsItem = computed(() => {
  const arr = Object.values(props.items);
  const allProducts = arr.reduce((products, item) => {
    item.items.forEach((i) => {
      products.push(i);
    });
    return products;
  }, []);
  return route.params.id === "all"
    ? allProducts
    : (props.items && props.items[route.params.id].items) || {};
})
const openProduct = (product) => {
  general.openProductDescription = true
  openDetailsById.value = product.uid
}
const ProductDescription = defineAsyncComponent(
  () => import("@/components/Modals/ProductDescription.vue")
);
</script>

<style scoped>

</style>
