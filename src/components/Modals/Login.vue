<template>
  <MyModal
    :show="props.openModal"
    :styles="'h-[520px] md:h-[494px]'"
    @close-modal="closeLoginModal"
  >
    <ModalContainer> {{ $t("modals.auth") }}</ModalContainer>
    <div class="mt-[30px]">
      <div class="flex flex-col gap-[22px]">
        <InputText
          :value="dataLogin.email"
          v-model="dataLogin.email"
          class="focus:ring-0 focus:ring-offset-0"
        >
          {{ $t("modals.email") }}
        </InputText>
        <InputPassword
          :value="dataLogin.password"
          v-model="dataLogin.password"
          class="focus:ring-0 focus:ring-offset-0"
        >
          {{ $t("modals.password") }}
        </InputPassword>
      </div>
      <div class="flex justify-between mt-5">
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            class="border-gray-500 checked:bg-main-color hover:border-main-color text-main-color rounded focus:ring-0 focus:ring-offset-0"
          />
          {{ $t("modals.remember") }}
        </div>
        <span
          class="text-custom-blue cursor-pointer hover:opacity-[0.7] transition-opacity"
        >
          {{ $t("modals.forgotPassword") }}
        </span>
      </div>
      <div v-show="auth.Errors.login.status">{{ auth.Errors.login.text }}</div>
      <button class="red-btn" @click="login">{{ $t("modals.login") }}</button>
      <OAuth @close-modal="emit('closeLoginModal', false)" />
      <div class="text-center sm:text-start">
        {{ $t("modals.account") }}
        <button
          class="text-custom-blue cursor-pointer hover:opacity-[0.7] transition-opacity"
          @click="openRegisterModal"
        >
          {{ $t("modals.register") }}
        </button>
        {{ $t("modals.now") }}
      </div>
    </div>
  </MyModal>
</template>

<script lang="ts" setup>
import { Login } from "@/types/auth-types";

const store = useGeneralStore(),
  auth = useAuthenticationStore(),
  dataLogin = ref<Login>({
    email: "",
    password: "",
  });

const props = defineProps<{
  openModal: boolean;
}>();

const emit = defineEmits(["closeLoginModal", "openRegisterModal"]);
const login = async () => {
  try {
    await auth.loginUser(dataLogin.value);
  } catch (e) {
    console.error(e);
  }
};
const openRegisterModal = () => {
  store.blur = true;
  emit("closeLoginModal");
  emit("openRegisterModal");
};
const closeLoginModal = () => {
  store.blur = false;
  emit("closeLoginModal");
};
</script>
