<template>
  <Slider
    :format="{
      prefix: '₴',
    }"
    show-tooltip="drag"
    :max="3000"
    :step="30"
  />

  <div class="price">

  </div>
</template>

<script setup lang="ts">
import Slider from "@vueform/slider";
</script>

<style scoped>
@import "@vueform/slider/themes/default.css";
</style>
