<template>
  <nav>
    <ul class="flex flex-wrap gap-4 md:flex-nowrap max-w-[500px]">
      <router-link
        active-class="-translate-y-1 transition-all duration-300"
        tag="li"
        :to="{ name: 'Products' }"
        class="font-semibold text-base text-white transform hover:-translate-y-1 transition-all duration-300"
      >
        {{ $t("header.product") }}
      </router-link>
      <router-link
        active-class="-translate-y-1 transition-all duration-300"
        tag="li"
        :to="{ name: 'Blog'}"
        class="font-semibold text-base text-white hover:-translate-y-1 duration-300"
      >
        {{ $t("header.blog") }}
      </router-link>
      <router-link
        active-class="-translate-y-1 transition-all duration-300"
        tag="li"
        :to="{ name: 'ContactUs'}"
        class="font-semibold text-base text-white hover:-translate-y-1 duration-300"
      >
        {{ $t("header.contacts") }}
      </router-link>
    </ul>
  </nav>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
