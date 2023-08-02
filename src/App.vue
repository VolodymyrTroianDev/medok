<template>
  <div class="relative"
       :class="{'blur-sm': store.statusLoader ||
        store.openLoginModal ||
        store.openRegistrationModal ||
        store.openBasketModal
  }">
    <router-view name="Header"/>
    <router-view name="default"/>
    <router-view name="Footer"/>
  </div>
  <div class="bg-modal"
       v-if="store.statusLoader ||
        store.openLoginModal ||
        store.openRegistrationModal ||
        store.openBasketModal"
  ></div>
  <Transition>
    <LoginModal v-if="store.openLoginModal"/>
  </Transition>
  <Transition>
    <RegistrationModal v-if="store.openRegistrationModal"/>
  </Transition>
  <Basket />
  <Loader v-if="store.statusLoader"/>
</template>

<script setup lang="ts">

import LoginModal from "@/components/Modals/Login.vue";
import RegistrationModal from "@/components/Modals/Registration.vue";
import {useGeneralStore} from "@/store/generalStore";
import {defineAsyncComponent} from "vue";

const Basket = defineAsyncComponent(
  () => import("@/components/Modals/Basket/Basket.vue")
);
const store = useGeneralStore();
</script>
<style lang="scss">
.modal {
  @apply fixed  inset-1/2 transform -translate-x-1/2 -translate-y-1/2
  bg-white max-w-[480px] w-full px-3
  sm:px-10 pt-0  rounded-[20px] pb-[25px] z-[51]
}

.red-btn {
  @apply bg-custom-red rounded-[30px] h-[35px] mt-6 text-white w-full hover:opacity-[0.8] focus:opacity-[0.8]
}
.bg-modal {
  @apply fixed w-screen h-screen top-0 left-0 z-50
}
.v-enter-active,
.v-leave-active {
  transition: opacity 150ms ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
