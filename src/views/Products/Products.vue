<template>
  <div class="font-marck-script text-[54px] text-center">
    {{ $t("products.title") }}
  </div>
  <div class="flex max-w-[1311px] mx-auto justify-between my-[30px] w-full">
    <div
      class="flex flex-col w-screen items-end gap-[20px] border-t-2 -translate-x-full max-w-[300px] bg-bg-mobile-filter h-screen border-b-products px-5 py-6 absolute top-0 duration-500 500px:static 500px:max-w-[300px] 500px:bg-bg-products 500px:w-full 500px:-translate-x-0"
      :class="{ active: general.openMobileFilterPanel }"
    >
      <inline-svg
        @click="general.openMobileFilterPanel = false"
        src="/assets/images/svg/basket/basket-close-btn.svg"
        alt=""
        class="cursor-pointer 500px:hidden w-[25px] h-[25px]"
      />
      <div class="bg-white border rounded w-full max-h-[135px] h-full">
        <div class="py-4 mx-5 text-center text-[14px] font-semibold border-b">
          {{ $t("products.filterTitle") }}
        </div>
        <FilterRangeButton />
      </div>
      <div class="bg-white border rounded w-full max-h-[250px] h-full">
        <div class="py-4 mx-5 text-center text-[14px] font-semibold border-b">
          {{ $t("products.category") }}
        </div>
        <ProductsCategory />
      </div>
      <div class="bg-white border rounded w-full max-h-[250px] h-full">
        <div class="py-4 mx-5 text-center text-[14px] font-semibold border-b">
          {{ $t("products.recommended") }}
        </div>
      </div>
    </div>
    <div
      class="flex flex-col items-center border-t-2 border-b-products max-w-[930px] w-full bg-bg-products py-5 px-10"
    >
      <router-view :items="productsStore.filterProducts()" />
    </div>
  </div>
</template>

<script setup lang="ts">
const general = useGeneralStore();
const productsStore = useProductsStore();
const { locale } = useI18n();
productsStore.fetchProducts(locale.value);
</script>

<style scoped>
.active {
  @apply fixed transition z-[51] transform translate-x-0 500px:static duration-500;
}
</style>
