<template>
  <div class="mt-41 ml-200 font-marck-script font-serif text-[50px] text-black mb-30 md:mt-41 md:ml-75 text-center">
    {{ $t("profile.title") }}
  </div>
  <div class="flex ml-200 md:ml-75 lg:flex-wrap md:flex-no-wrap justify-center md:justify-start sm:ml-0">
    <UpdatePhoto />
  </div>
</template>

<script setup lang="ts">

import Cropper from "@/components/Modals/Cropper.vue";
import UpdatePhoto from "@/views/Profile/UpdatePhoto.vue";
</script>

<style scoped>

</style>
