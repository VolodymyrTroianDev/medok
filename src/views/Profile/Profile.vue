<template>
  <div class="mt-41 ml-200 font-marck-script font-serif text-[50px] text-black mb-30 md:mt-41 md:ml-75 text-center">
    {{ $t("profile.title") }}
  </div>
  <div class="flex ml-200 md:ml-75 flex-wrap lg:flex-no-wrap justify-center md:justify-start sm:ml-0 px-5 lg:px-20 gap-20">
    <UpdatePhoto />
    <div class="flex flex-col">
      <div class="flex flex-col ">
        <div class="flex items-center">
          <div class="font-medium text-2xl leading-10 text-gray-900">{{ name }}</div>
          <img src="../../assets/images/svg/edit-icon.svg" class="w-[25px] h-[27px] cursor-pointer bg-no-repeat ml-5" @click="$router.push({name: 'EditProfile'})">
        </div>
        <div class="mb-5 my-2 font-normal font-medium text-xl leading-6">{{ email }}</div>
      </div>
    <OrderHistory />
    </div>
  </div>
</template>

<script setup lang="ts">
import UpdatePhoto from "@/views/Profile/UpdatePhoto.vue";
import { useAuthenticationStore } from "@/store/authStore";
import OrderHistory from "@/views/Profile/OrderHistory.vue";
import { useDatabaseStore } from "@/store/databaseStore";
import { computed } from "vue";
const auth = useAuthenticationStore();
const database = useDatabaseStore();

const name = computed(() => {
  return database.state.data?.reloadUserInfo?.displayName
})
const email = computed(() => {
  return database.state.data?.reloadUserInfo?.email
})
</script>

<style scoped>

</style>
