<template>
  <div class="loader">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xml:space="preserve"
      viewBox="0 0 250 250"
    >
      <path
        d="m194 123.9-33.7-.5-20-30.8 20-31.1 33.7-.2 20 31.3z"
        class="st0 polygon-1"
      />
      <path
        d="m197 186.9-33.7-.5-20-30.8 20-31.1 33.7-.2 20 31.3z"
        class="st0 polygon-2"
      />
      <path
        d="m139 93.9-33.7-.5-20-30.8 20-31.1 33.7-.2 20 31.3z"
        class="st0 polygon-3"
      />
      <path
        d="m142 156.9-33.7-.5-20-30.8 20-31.1 33.7-.2 20 31.3z"
        class="st0 polygon-4"
      />
      <path
        d="m87 125.9-33.7-.5-20-30.8 20-31.1 33.7-.2 20 31.3z"
        class="st0 polygon-5"
      />
      <path
        d="m144 218.9-33.7-.5-20-30.8 20-31.1 33.7-.2 20 31.3z"
        class="st0 polygon-6"
      />
      <path
        d="m89 188.9-33.7-.5-20-30.8 20-31.1 33.7-.2 20 31.3z"
        class="st0 polygon-7"
      />
    </svg>
  </div>
</template>

<script>
import "@/assets/styles/loader.scss";
export default {};
</script>

<style lang="scss">
.loader {
  @apply absolute left-1/2 top-1/2 transform translate-x-1/2 translate-y-1/2;
}
</style>
