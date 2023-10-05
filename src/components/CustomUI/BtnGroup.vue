<template>
  <div class="flex flex-wrap justify-center lg:justify-between items-center gap-4 lg:flex-nowrap">
    <SelectLocalization/>
    <button class="relative" @click="store.openBasketModal = !store.openBasketModal" @click.stop>
      <basket-img/>
      <span
        class="w-[17px] h-[17px] absolute right-0 bottom-0 bg-counter text-white rounded-full bottom-[-5px] text-[12px]">{{ basket.state.selectedProducts.length }}</span>
    </button>
    <img
      v-if="route.name === 'ProductsItems' || route.name === 'Blog'"
      @click="openFilterMenu"
      src="../../assets/images/svg/filter-icon.svg" alt="" class="cursor-pointer 500px:hidden"
    >
    <div class="flex gap-4 items-center cursor-pointer hover:scale-105 transition ease-in-out delay-150" @click="$router.push({ name: 'Profile' })" v-show="auth.state.statusLogin">
      <img
        :src="database.state.data.reloadUserInfo?.photoUrl"
        alt=""
        width="45"
        height="45"
        class="rounded-full bg-white"
      />
      <div class="text-white text-base font-semibold" v-show="database.state.data?.reloadUserInfo?.displayName || database.state.data?.reloadUserInfo?.email">{{ database.state.data?.reloadUserInfo?.displayName || database.state.data?.reloadUserInfo?.email }}</div>
    </div>
    <button
      v-if="!auth.state.statusLogin"
      class="text-white font-semibold transform hover:-translate-y-1 transition-all duration-300"
      @click="store.openLoginModal = true"
    >
      {{ $t("header.login") }}
    </button>
    <button
      v-if="!auth.state.statusLogin"
      class="text-white font-semibold border-2 rounded-full py-[5px] px-[13px] hover:bg-white hover:text-counter duration-300"
      @click="store.openRegistrationModal = true"
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
</template>

<script setup lang="ts">
import BasketImg from "@/assets/images/svg/basket-img.vue";
import SelectLocalization from "@/components/CustomUI/SelectLocalization.vue";
import {useGeneralStore} from "@/store/generalStore";
import {useRoute} from "vue-router";
import {useAuthenticationStore} from "@/store/authStore";
import {useBasketStore} from "@/store/basketStore";
import {useDatabaseStore} from "@/store/databaseStore";


const store = useGeneralStore();
const auth = useAuthenticationStore();
const database = useDatabaseStore();
const route = useRoute();
const basket = useBasketStore();
const openFilterMenu = () => {
  store.openMobileFilterPanel = !store.openMobileFilterPanel
  if (store.openMobileHeader) store.openMobileHeader = false;
}
const signOut = async ()=>{
  await auth.logOut();
}
</script>

<style scoped>

</style>
