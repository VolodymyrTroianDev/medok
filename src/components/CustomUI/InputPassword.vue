<template>
  <div class="input-text text-[14px] md:text-[1em]">
    <input
      type="password"
      :disabled="props.disabled"
      ref="passwordInput"
      required
      title="введіть пароль"
      :value="props.value"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <img
      src="../../assets/images/svg/password-control.svg"
      class="password-control cursor-pointer"
      @click="togglePassword()"
      v-show="store.passwordShow"
    />
    <img
      src="../../assets/images/svg/view.svg"
      class="password-control cursor-pointer"
      @click="togglePassword()"
      v-show="!store.passwordShow"
    />
    <div class="input-text__title"><slot></slot></div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { changeInput } from "@/services/ChangeTypeInputPassword";
const passwordInput = ref();
const store = reactive({
  passwordShow: false,
});
const props = defineProps({
  disabled: {
    type: Boolean,
    required: false
  },
  value: {
    type: String,
    default: ''
  }
});
const togglePassword = () => {
  store.passwordShow = !store.passwordShow;
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
  }
  & .password-control {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
