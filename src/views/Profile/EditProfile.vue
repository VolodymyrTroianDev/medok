<template>
  <div class="mt-41 ml-200 font-marck-script font-serif text-[50px] text-black mb-30 md:mt-41 md:ml-75 text-center">{{ $t("profile.title") }}</div>
  <div class="flex items-center ml-200 md:ml-75 flex-wrap lg:flex-no-wrap justify-center md:justify-start sm:ml-0 px-5 lg:px-20 gap-20">
    <UpdatePhoto/>
    <div class="w-full lg:w-1/2 flex flex-col gap-5">
      <div class="flex justify-between gap-8 flex-wrap lg:flex-nowrap ">
        <input-text v-model="data.name" :value="data.name" class="focus:ring-0 focus:ring-offset-0 w-full">
          {{ $t("profile.name") }}
        </input-text>
        <input-text v-model="data.email" :value="data.email" class="focus:ring-0 focus:ring-offset-0 w-full">
          {{ $t("profile.email") }}
        </input-text>
      </div>
      <div class="flex justify-between gap-8 flex-wrap lg:flex-nowrap ">
        <input-password v-model="data.password" :value="data.password"
                        class="focus:ring-0 focus:ring-offset-0 w-full">{{ $t("profile.oldPassword") }}
        </input-password>
        <input-password v-model="data.newPassword" :value="data.newPassword"
                        class="focus:ring-0 focus:ring-offset-0 w-full">{{ $t("profile.newPassword") }}
        </input-password>

      </div>
      <button class="red-btn max-w-[400px] w-full mx-auto mb-5" @click="onSubmit">{{ $t("profile.saveChanges") }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import UpdatePhoto from "@/views/Profile/UpdatePhoto.vue";
import { reactive } from "vue";
import { useAuthenticationStore } from "@/store/authStore";
const auth = useAuthenticationStore()
const data = reactive({
  name: auth.state.name || "",
  email: auth.state.email || "",
  password:"",
  newPassword:""
})
const onSubmit = () => {
  console.log(data)
}
</script>

