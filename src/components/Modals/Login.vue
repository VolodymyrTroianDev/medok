<template>
  <div class="modal h-[520px] md:h-[494px]" v-click-away="closeModalLogin">
    <ModalContainer> {{ $t("modals.auth") }}</ModalContainer>
    <div class="mt-[30px]">
      <div class="flex flex-col gap-[22px]">
        <input-text  :value="dataLogin.email" v-model="dataLogin.email" class="focus:ring-0 focus:ring-offset-0">{{ $t("modals.email") }}</input-text>
        <input-password :value="dataLogin.password" v-model="dataLogin.password" class="focus:ring-0 focus:ring-offset-0">{{ $t("modals.password") }}</input-password>
      </div>
      <div class="flex justify-between mt-5">
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            class="border-gray-500
            checked:bg-main-color hover:border-main-color
            text-main-color
            rounded focus:ring-0 focus:ring-offset-0">
          {{ $t("modals.remember") }}
        </div>
        <span class="text-custom-blue cursor-pointer hover:opacity-[0.7] transition-opacity">{{ $t("modals.forgotPassword") }}</span>
      </div>
      <button class="red-btn" @click="login">{{ $t("modals.login") }}</button>
      <OAuth/>
      <div class="text-center sm:text-start">
        {{ $t("modals.account") }}
        <button
          class="text-custom-blue cursor-pointer hover:opacity-[0.7] transition-opacity"
          @click="(store.openLoginModal = false), (store.openRegistrationModal = true)"
        >
          {{ $t("modals.register") }}
        </button>
        {{ $t("modals.now") }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGeneralStore } from "@/store/generalStore";
import { ref } from "vue";
import OAuth from "@/components/CustomUI/OAuth.vue";
import axios from "axios";
const store = useGeneralStore();
const dataLogin = ref({
  email: "",
  password: ""
})

const login = async () => {

}
const closeModalLogin = () => {
  store.openLoginModal = false;
};
const updateEmail = (val) => {
  console.log(val)
}

</script>
