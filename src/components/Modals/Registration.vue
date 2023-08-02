<template>
  <div class="modal h-[661px]" v-click-away="closeModal">
    <modal-container> {{ $t("modals.registration") }} </modal-container>
    <div class="mt-[30px]">
      <div class="flex flex-col gap-5">
        <input-text>{{ $t("modals.name") }}</input-text>
        <input-text>{{ $t("modals.surname") }}</input-text>
        <input-text>{{ $t("modals.email") }}</input-text>
        <InputPassword>{{ $t("modals.password") }}</InputPassword>
        <InputPassword>{{ $t("modals.confirmPassword") }}</InputPassword>
      </div>
      <button class="red-btn">
        {{ $t("modals.registration") }}
      </button>
      <OAuth />
      <div class="text-center">
        {{ $t("modals.account") }}
        <button
          class="text-custom-blue cursor-pointer hover:opacity-[0.7] transition-opacity"
          @click="
          (store.openLoginModal = true), (store.openRegistrationModal = false)
        "
        >
          {{ $t("modals.authorization") }}
        </button>
        !
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useGeneralStore } from "@/store/generalStore";
const store = useGeneralStore();
const closeModal = () => {
  store.openRegistrationModal = false;
};
</script>

<style lang="scss" scoped>

</style>
