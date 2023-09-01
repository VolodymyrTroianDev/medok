<template>
  <div>
    <div
      class="h-screen overflow-y-auto relative"
      :class="{
        'blur-sm': store.statusLoader || store.openLoginModal || store.openRegistrationModal || store.openBasketModal || store.openProductDescription,
      }">
      <router-view name="Header"/>
      <router-view name="default"/>
      <router-view name="Footer"/>
    </div>
    <div
      class="bg-modal"
      v-if="store.statusLoader || store.openLoginModal || store.openRegistrationModal || store.openBasketModal || store.openProductDescription"
    ></div>
    <LoginModal/>
    <RegistrationModal/>
    <Basket />
    <Loader v-if="store.statusLoader"/>

  </div>
</template>

<script setup lang="ts">
import { useGeneralStore } from "@/store/generalStore";
import {computed, defineAsyncComponent, onMounted, ref, watch, watchEffect} from "vue";
import { useAuthenticationStore } from "@/store/authStore";
const store = useGeneralStore();
const auth = useAuthenticationStore();

store.statusLoader = true;

onMounted(async () => {
  await auth.checkAuthSession();
  store.statusLoader = false;
})
const Basket = defineAsyncComponent(
  () => import("@/components/Modals/Basket/Basket.vue")
);
const LoginModal = defineAsyncComponent(
  () => import("@/components/Modals/Login.vue")
);
const RegistrationModal = defineAsyncComponent(
  () => import("@/components/Modals/Registration.vue")
);

const bodyOverflow = ref('');

watchEffect(() => {
  bodyOverflow.value = store.openMobileHeader || store.openBasketModal || store.openRegistrationModal || store.openProductDescription  ? 'hidden' : '';
  document.body.style.overflow = bodyOverflow.value;
});

</script>
<style lang="scss">
.modal {
  box-shadow: 0 0 26px rgba(0, 0, 0, 0.247);
  @apply fixed  inset-1/2 transform -translate-x-1/2 -translate-y-1/2
  bg-white max-w-[480px] w-full px-3 h-fit
  sm:px-10 pt-0  rounded-[20px] pb-[25px] z-[51]

}

.red-btn {
  @apply bg-custom-red rounded-[30px] h-[35px] mt-6 text-white w-full hover:opacity-[0.8] focus:opacity-[0.8]
}
.bg-modal {
  @apply fixed w-screen h-screen top-0 left-0 z-50
}
</style>
