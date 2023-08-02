<template>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center w-full h-full">
        <template v-for="item in 10" :key="item">
          <div class="w-[245px] h-[375px] bg-white cursor-pointer duration-700 hover:scale-110 rounded-lg">
          </div>
        </template>
      </div>
      <button class="red-btn max-w-[152px]">{{ $t("products.showMore") }}</button>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>
