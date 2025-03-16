<template>
  <div class="input-text text-[14px] md:text-[1em] relative">
    <input
      ref="passwordInput"
      v-model="modelValue"
      required
      :disabled
      :type="passwordShow ? 'text' : 'password'"
      class="w-full p-2 border rounded transition-all duration-500 ease-in-out focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
    />

    <transition name="fade">
      <inline-svg
        v-if="passwordShow"
        src="public/assets/images/svg/password-control.svg"
        class="password-control cursor-pointer w-[23px] h-[23px] absolute top-3 right-3 transition-opacity duration-300 ease-in-out opacity-100"
        alt=""
        @click="togglePassword()"
      />
    </transition>

    <transition name="fade">
      <inline-svg
        v-if="!passwordShow"
        src="public/assets/images/svg/view.svg"
        class="password-control cursor-pointer w-[23px] h-[23px] absolute top-3 right-3 transition-opacity duration-300 ease-in-out opacity-100"
        alt=""
        @click="togglePassword()"
      />
    </transition>

    <div class="input-text__title"><slot></slot></div>
  </div>
</template>

<script setup lang="ts">
import { changeInput } from "@/services/ChangeTypeInputPassword";
import { ref } from "vue";

const passwordInput = ref<HTMLInputElement>(),
  passwordShow = ref<boolean>(false);

const { disabled, title } = defineProps<{
  disabled?: boolean;
  title?: string;
}>();

defineEmits(["update:modelValue"]);
const modelValue = defineModel();
const togglePassword = () => {
  passwordShow.value = !passwordShow.value;
  changeInput(passwordInput);
};
</script>
<style lang="scss" scoped>
.input-text {
  & input {
    &::placeholder {
      font-size: 14px;
      color: var(--placeholder-color);
    }
    transition: all 0.5s ease;
  }
  & .password-control {
    position: absolute;
    top: 10px;
    right: 10px;
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }
}
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-300 ease-in-out;
}
.fade-enter,
.fade-leave-to {
  @apply opacity-0;
}
</style>
