<template>
  <div class="font-marck-script text-[54px] text-center">{{ $t("basket.checkout") }}</div>
  <div class="flex  flex-col xl:w-1/2 xl:ms-14 xl:mr-14 mx-6 gap-4 xl:gap-0">
    <div class="flex flex-col gap-4 xl:gap-0">
      <div class="flex gap-4">
        <div class="bg-main-color rounded-full w-[24px] h-[24px]">
          <div class="text-white text-center">1</div>
        </div>
        <div class="text-[18px] font-semibold">{{ $t("basket.contactDetails") }}</div>
      </div>
      <div class="flex flex-col gap-5 p-0 sm:p-6 ">
        <div class="flex justify-between lg:justify-center gap-5 lg:w-full flex-wrap lg:flex-nowrap ">
          <input-text  class="focus:ring-0 focus:ring-offset-0 w-full">
            {{ $t("basket.surname") }}
          </input-text>
          <input-text  class="focus:ring-0 focus:ring-offset-0 w-full">
            {{ $t("basket.name") }}
          </input-text>
        </div>
        <div class="flex justify-between lg:justify-center gap-5 lg:w-full flex-wrap lg:flex-nowrap ">
          <input-text  class="focus:ring-0 focus:ring-offset-0 w-full">
            {{ $t("basket.phoneNumber") }}
          </input-text>
          <input-text  class="focus:ring-0 focus:ring-offset-0 w-full">
            {{ $t("profile.email") }}
          </input-text>
        </div>
      </div>
    </div>
    <div class="flex gap-4">
      <div class="bg-main-color rounded-full w-[24px] h-[24px]">
        <div class="text-white text-center">2</div>
      </div>
      <div class="text-[18px] font-semibold">{{ $t("basket.delivery") }}</div>
    </div>
    <LocationSelect class="mt-0 xl:mt-6"/>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
