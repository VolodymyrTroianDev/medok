<template>
  <div class="input-text active:border-main-color text-[14px] md:text-[1em]">
    <textarea
      class="w-full border-color-green max-h-[400px] rounded"
      :value="modelValue || value"
      :disabled="props.disabled"
      required
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  disabled: {
    type: Boolean,
    required: false
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

defineEmits(['update:modelValue'])
</script>
<style lang="scss" scoped>
</style>
