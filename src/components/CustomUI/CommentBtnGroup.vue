<template>
  <div class="flex-col w-full">
    <input
      type="text"
      v-model="text"
      @input="updateInput"
      class="input-comment"
      :placeholder
    />
    <div class="flex justify-end gap-4 p-2">
      <button @click="cancelActions()">
        <slot name="cancel-btn"></slot>
      </button>
      <button
        class="red-btn max-w-[100px] m-0 cursor-pointer"
        :disabled="btnDisabled"
        @click="saveComment"
      >
        <slot name="save-btn"></slot>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  comment?: {};
  idx?: string;
  placeholder?: string;
  modelValue?: string;
}>();
const emit = defineEmits(["saveComment", "cancelAction"]);
const text = ref<string>(props.modelValue || ""),
  btnDisabled = ref<boolean>(true);
const updateInput = () => {
  btnDisabled.value = text.value.length <= 0;
};
const saveComment = async () => {
  emit("saveComment", text.value);
};
const cancelActions = () => {
  text.value = "";
  emit("cancelAction");
};
</script>

<style scoped>
.input-comment {
  all: unset;
  width: 100%;
  text-align: start;
  border-bottom: 1px solid #d46110;
}

.input-comment:focus {
  --tw-ring-color: transparent;
}
</style>
