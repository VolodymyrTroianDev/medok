<template>
  <MyModal :show="props.openModal" :styles="'h-[661px]'" @close-modal="closeRegisterModal">
    <modal-container> {{ $t("modals.registration") }}</modal-container>
    <div class="mt-[30px]">
      <div class="flex flex-col gap-5">
        <input-text v-model="dataRegister.name" :value="dataRegister.name">{{ $t("modals.name") }}</input-text>
        <input-text v-model="dataRegister.surname" :value="dataRegister.surname">{{ $t("modals.surname") }}</input-text>
        <input-text v-model="dataRegister.email" :value="dataRegister.email">{{ $t("modals.email") }}</input-text>
        <input-password v-model="dataRegister.password" :value="dataRegister.password">{{ $t("modals.password") }}
        </input-password>
        <input-password v-model="dataRegister.confirmPassword" :value="dataRegister.confirmPassword">
          {{ $t("modals.confirmPassword") }}
        </input-password>
      </div>
      <div class="" v-show="auth.Errors.register.status">{{ auth.Errors.register.text }}</div>
      <button class="red-btn" @click="signIn">
        {{ $t("modals.registration") }}
      </button>
      <OAuth/>
      <div class="text-center">
        {{ $t("modals.account") }}
        <button
          class="text-custom-blue cursor-pointer hover:opacity-[0.7] transition-opacity"
          @click="openLoginModal"
        >
          {{ $t("modals.authorization") }}
        </button>
        !
      </div>
    </div>
  </MyModal>
</template>

<script lang="ts" setup>

import { useGeneralStore } from "@/store/generalStore";
import { useAuthenticationStore } from "../../store/authStore";
import { ref } from "vue";
import { Register } from "../../types/auth-types";
import { useI18n } from "vue-i18n";

const store = useGeneralStore(),
  auth = useAuthenticationStore(),
  { t } = useI18n(),
  dataRegister = ref<Register>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: ""
  });

const props = defineProps<{
  openModal: boolean;
}>();

const emit = defineEmits(["closeRegisterModal", "openLoginModal"]);

const signIn = async (): Promise<void> => {
  if (dataRegister.value.password != dataRegister.value.confirmPassword) {
    auth.generateErrors("register", t("modals.passwordNotMatch"));
  } else if (!isValidEmail(dataRegister.value.email)) {
    auth.generateErrors("register", t("modals.mailMandatory"));
  } else if (dataRegister.value.password < 1) {
    auth.generateErrors("register", t("modals.enterPassword"));
  } else {
    await auth.register({
      email: dataRegister.value.email,
      password: dataRegister.value.password,
      name: dataRegister.value.name,
      surname: dataRegister.value.surname,
    });
  }
}

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const openLoginModal = (): void => {
  store.blur = true;
  emit("closeRegisterModal");
  emit("openLoginModal");
};
const closeRegisterModal = () => {
  store.blur = false;
  emit("closeRegisterModal");
}
</script>

<style lang="scss" scoped>
</style>
