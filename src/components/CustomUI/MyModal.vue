<template>
  <Teleport to="body">
    <div class="bg-modal" v-if="props.show"></div>
    <Transition>
      <div
        class="modal"
        :class="props.styles"
        v-show="props.show"
        v-on-click-outside="closeModal"
      >
        <slot></slot>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";

const props = defineProps<{
  show: boolean;
  styles: string;
}>();

const emit = defineEmits(["closeModal"]);
/**
 * Closing function when clicking outside the modal window
 */
const closeModal = () => {
  emit("closeModal", false);
};
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 170ms ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.bg-modal {
  @apply fixed w-screen h-screen top-0 left-0 z-50;
}
</style>
