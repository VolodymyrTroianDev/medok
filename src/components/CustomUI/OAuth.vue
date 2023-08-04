<template>
  <div class="flex justify-evenly gap-[10px] py-[30px]">
    <img src="../../assets/images/svg/social/facebook.svg" class="w-[31px] h-[31] cursor-pointer" alt="Facebook" title="Facebook" @click="facebookSignIn">
    <img src="../../assets/images/svg/social/google.svg" class="w-[31px] h-[31] cursor-pointer" alt="Google" title="Google" @click="googleSignIn">
  </div>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from "@/store/authStore";

const auth = useAuthenticationStore();
 const googleSignIn = async () => {
    await auth.signInWithGoogle();
 }
 const facebookSignIn = async () => {
   await auth.signInWithFacebook();
 }
</script>

<style lang="scss" scoped>
.modal__social-networks {
  margin: 30px 0 30px 0;
}
.google,
.facebook,
.instagram {
  width: 31px;
  height: 31px;
}
</style>
