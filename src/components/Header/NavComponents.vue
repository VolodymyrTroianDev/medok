<template>
  <nav>
    <ul class="flex flex-wrap gap-4 md:flex-nowrap max-w-[500px]">
      <router-link
        active-class="active"
        tag="li"
        :to="{ name: 'Products' }"
        class="font-semibold text-base transform hover:-translate-y-1 transition-all duration-300 text-white"
      >
        {{ $t("header.product") }}
      </router-link>
      <router-link
        active-class="active"
        tag="li"
        :to="{ name: 'Blog'}"
        class="font-semibold text-base hover:-translate-y-1 duration-300 text-white"
      >
        {{ $t("header.blog") }}
      </router-link>
      <router-link
        active-class="active"
        tag="li"
        :to="{ name: 'ContactUs'}"
        class="font-semibold text-base hover:-translate-y-1 duration-300 text-white"
      >
        {{ $t("header.contacts") }}
      </router-link>
    </ul>
  </nav>
</template>

<script setup lang="ts">

</script>

<style scoped>
.active {
  @apply -translate-y-1 transition-all duration-300 text-main-color sm:text-white
}
</style>
