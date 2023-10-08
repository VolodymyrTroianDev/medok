<template>
  <MyModal :show="general.openCropperModal" styles="h-fit" @close-modal.self="closeModal">
    <img src="../../assets/images/svg/basket/basket-close-btn.svg" alt="close"
         class="absolute top-4 right-4 h-5 w-5 cursor-pointer" @click="closeModal">
    <cropper
      class="mt-10 w-full"
      ref="cropperRef"
      :src="props.cropperInfo?.selectedImage"
      :auto-zoom="true"
      imageRestriction="fit-area"
      :canvas="{
        width: 400,
	      height: 500,
	      left: 0,
	      top: 0
      }"
      :stencil-component="CircleStencil"
      :stencil-props="{
	    	aspectRatio: 10/10,
	    	height: 500,
	    }"
    />
    <button class="red-btn" @click="cropImage">{{ $t("profile.uploadAvatar") }}</button>
  </MyModal>
</template>

<script setup lang="ts">
import {Cropper, CircleStencil} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import MyModal from "@/components/CustomUI/MyModal.vue";
import {useGeneralStore} from "@/store/generalStore";
import {ref} from "vue";
import {useAuthenticationStore} from "@/store/authStore";

const general = useGeneralStore();
const auth = useAuthenticationStore();
const height = ref("50%")
const emit = defineEmits(["removeImg", "updateCropper"]);
const props = defineProps<{
  cropperInfo: any
}>()
const cropperRef = ref();
const closeModal = () => {
  emit("removeImg");
  general.openCropperModal = false;
}
const cropImage = () => {
  const result = cropperRef.value.getResult();
  emit("updateCropper",result.canvas.toDataURL(props.cropperInfo?.type))

}
</script>

<style scoped>
</style>
