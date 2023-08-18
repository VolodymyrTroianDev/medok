<template>
  <div class="">
    <div class="relative flex justify-center">
      <img
        class="object-cover rounded-full cursor-pointer"
        :src="authStore.state.photoProfile"
        alt=""
        width="300"
        height="300"
        @click="toggle = !toggle"
      />
      <FsLightbox
        :toggler="toggle"
        type="image"
        :sources='[`${authStore.state.photoProfile}`]'
      />
      <label for="file-upload"
             class="photo-add absolute bottom-4 right-12 w-[59px] h-[70px] cursor-pointer bg-no-repeat bg-cover">
        <i></i>
      </label>
      <input
        id="file-upload"
        type="file"
        ref="photo"
        v-on:change="handleUpload"
        accept="image/*"
      />
    </div>
    <div class="text-center my-4">{{ $t("profile.uploadPhoto") }}</div>
    <label for="file-upload" class="red-btn flex items-center justify-center cursor-pointer">
      {{ $t("profile.choosePhoto") }}
    </label>
    <input
      id="file-upload"
      type="file"
      ref="photoBtn"
      v-on:change="handleUpload"
      accept="image/*"
    />
    <div class="w-[200px] h-[41px] my-4 mx-auto text-center font-normal text-[14px] text-gray-600">{{ $t("profile.recommend") }}</div>
  </div>
  <Cropper :cropperInfo="cropperInfo" @remove-img="cropperInfo.selectedImage = ''"/>
</template>

<script setup lang="ts">
import { useGeneralStore } from "@/store/generalStore";
import { useAuthenticationStore } from "@/store/authStore";
import {ref} from "vue";
import Cropper from "@/components/Modals/Cropper.vue";
import {CropperInfo} from "@/types/profile-types";
import FsLightbox from "fslightbox-vue/v3";
const general = useGeneralStore();
const authStore = useAuthenticationStore();
const cropperInfo = ref<CropperInfo>({
  selectedImage:''
})
const toggle = ref<boolean>(false)
const handleUpload = (e) => {
  const file = e.target.files[0];

  if (file.size > 10485760) {
    console.log("Занадто велике фото");
  } else {
    const reader = new FileReader();
    reader.onload = (event) => {
      cropperInfo.value.selectedImage = event.target.result;
    };
    reader.readAsDataURL(file);
    general.openCropperModal = true;
  }
}
</script>

<style scoped>
.photo-add {
  background-image: url("../../assets/images/svg/change-avatar.svg");
}

input[type="file"] {
  display: none;
}
</style>
