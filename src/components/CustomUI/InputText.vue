<template>
  <div class="input-text active:border-main-color text-[14px] md:text-[1em]">
    <input
      :type="props.type"
      :value="props.value"
      :disabled="props.disabled"
      required
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div class="input-text__title">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const props = defineProps({
  disabled: {
    type: Boolean,
    required: false
  },
  type: {
    type: String,
    required: false,
    default: "text"
  },
  value: {
    type: String,
    default: ''
  }
});
const store = reactive({
  valueInput: "",
});

const emits = defineEmits(['update:modelValue'])
</script>
<style lang="scss" scoped>
</style>
