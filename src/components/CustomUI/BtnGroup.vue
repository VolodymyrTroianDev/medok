<template>
  <div class="flex flex-wrap justify-center lg:justify-between items-center gap-4 lg:flex-nowrap">
    <SelectLocalization/>
    <button
      class="relative"
      @click="() => {
        store.blur = true;
        emit('openBasketModal', true)
      }"
      @click.stop
    >
      <basket-img/>
      <span
        class="w-[17px] h-[17px] absolute right-0 bg-counter text-white rounded-full bottom-[-5px] text-[12px]"
      >
        {{ basket.state.selectedProducts.length }}
      </span>
    </button>
    <img
      v-if="route.name === 'ProductsItems' || route.name === 'Blog'"
      @click="openFilterMenu"
      src="../../assets/images/svg/filter-icon.svg" alt="" class="cursor-pointer 500px:hidden"
    >
    <div class="flex gap-4 items-center cursor-pointer hover:scale-105 transition ease-in-out delay-150"
         @click="$router.push({ name: 'Profile' })" v-show="auth.state.statusLogin">
      <img
        :src="database.state.data.reloadUserInfo?.photoUrl"
        alt=""
        width="45"
        height="45"
        class="rounded-full bg-white"
      />
      <div class="text-white text-base font-semibold"
           v-show="database.state.data?.reloadUserInfo?.displayName || database.state.data?.reloadUserInfo?.email">
        {{ database.state.data?.reloadUserInfo?.displayName || database.state.data?.reloadUserInfo?.email }}
      </div>
    </div>
    <button
      v-if="!auth.state.statusLogin"
      class="text-white font-semibold transform hover:-translate-y-1 transition-all duration-300"
      @click="() => {
        openLoginModal = true
        store.blur = true
      }"
    >
      {{ $t("header.login") }}
    </button>
    <button
      v-if="!auth.state.statusLogin"
      class="text-white font-semibold border-2 rounded-full py-[5px] px-[13px] hover:bg-white hover:text-counter duration-300"
      @click="() => {
        openRegisterModal = true
        store.blur = true
      }"
    >
      {{ $t("header.register") }}
    </button>
    <button
      v-if="auth.state.statusLogin"
      @click="signOut()"
      class="text-white font-semibold border-2 rounded-full py-[5px] px-[13px] hover:bg-white hover:text-counter duration-300"
    >
      {{ $t("header.signOut") }}
    </button>
  </div>
  <LoginModal
    v-if="openLoginModal"
    :openModal="openLoginModal"
    @close-login-modal="openLoginModal = false"
    @open-register-modal="openRegisterModal = true"
  />
  <RegistrationModal
    v-if="openRegisterModal"
    :openModal="openRegisterModal"
    @close-register-modal="openRegisterModal = false"
    @open-login-modal="openLoginModal = true"
  />

  <Basket
    :openModal="props.statusBasket"
    @close-basket-modal="emit('openBasketModal', false)"
  />
</template>

<script setup lang="ts">
const store = useGeneralStore(),
  auth = useAuthenticationStore(),
  database = useDatabaseStore(),
  route = useRoute(),
  basket = useBasketStore(),
  bodyOverflow = ref(""),
  openRegisterModal = ref<boolean>(false),
  openLoginModal = ref<boolean>(false);

const props = defineProps<{
  statusBasket: boolean;
}>();

const emit = defineEmits(["openBasketModal"]);
const openFilterMenu = (): void => {
  store.openMobileFilterPanel = !store.openMobileFilterPanel
  if (store.openMobileHeader) store.openMobileHeader = false;
}

const signOut = async () => {
  await auth.logOut();
}

watchEffect(() => {
  bodyOverflow.value =
    store.openMobileHeader ||
    props.statusBasket ||
    openRegisterModal.value ||
    openLoginModal.value ||
    store.openProductDescription
      ? "hidden"
      : "";

  document.body.style.overflow = bodyOverflow.value;
});
const Basket = defineAsyncComponent(
  () => import("@/components/Modals/Basket/Basket.vue")
);
</script>

<style scoped>

</style>
