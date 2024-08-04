<template>
  <div class="input-text active:border-main-color text-[14px] md:text-[1em]">
    <input
      :type="props.type"
      :value="val"
      v-model="val"
      :disabled="props.disabled"
      required
      @input="updateValue"
    />
    <div class="input-text__title">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
  modelValue: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  }
});
const val = ref(props.modelValue || props.value);

const emit = defineEmits(['update:modelValue'])
const updateValue = (e) => {
  emit('update:modelValue', e.target.value)
  formatPhoneNumber(e);
}
const formatPhoneNumber = (event) => {
  let input = event.target.value
  let digits = input.replace(/\D/g, '')

  if (digits.length > 12) {
    digits = digits.slice(0, 12)
  }

  val.value = `+ (${digits.slice(0, 3)})${digits.slice(3, 6)}${digits.slice(6)}`
}
</script>
<style lang="scss" scoped>
</style>
