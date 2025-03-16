<template>
  <div
    class="flex flex-col min-h-screen relative w-full"
    :class="{
      'blur-sm': store.blur,
    }"
    id="top"
  >
    <router-view name="Header" />
    <div class="mb-auto">
      <router-view name="default" />
    </div>
    <router-view name="Footer" />
    <div
      class="fixed bottom-5 right-5 w-[40px] h-[40px] rounded-[50%] opacity-30 p-[10px] hover:cursor-pointer hover:opacity-100 transition duration-500 bg-custom-red flex justify-center items-center"
      @click="scrollOnTop()"
    >
      <img
        src="../public/assets/images/svg/icons/arrov-top.svg"
        alt="arrov-top"
        class="h-[20px]"
      />
    </div>
  </div>

  <Loader v-if="store.statusLoader" />
</template>

<script setup lang="ts">
import { useGeneralStore } from "@/store/generalStore";
import { useAuthenticationStore } from "@/store/authStore";
import { onMounted } from "vue";
import { useSeoMeta } from "@unhead/vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useTitle } from "@vueuse/core";

const store = useGeneralStore(),
  auth = useAuthenticationStore(),
  { t } = useI18n(),
  title = useTitle(),
  router = useRouter();

router.beforeEach((to) => {
  title.value = `${t(to.meta.title)} | ${t("header.title")}`;
});

onMounted(async () => {
  store.statusLoader = true;
  try {
    await auth.checkAuthSession();
    setTimeout(() => {
      store.statusLoader = false;
    }, 4000);
  } catch (e) {}
});

useSeoMeta({
  title: t("header.title"),
  description: t("article.title"),
  ogDescription: t("article.title"),
  ogTitle: t("article.title"),
  ogImage: "https://medok-karpatskyj.web.app/assets/blog-1-img-d7e73eb7.jpg",
  twitterCard: "summary_large_image",
});

const scrollOnTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};
</script>

<style lang="scss">
.modal {
  box-shadow: 0 0 26px rgba(0, 0, 0, 0.247);
  @apply fixed  inset-1/2 transform -translate-x-1/2 -translate-y-1/2
  bg-white max-w-[480px] w-full px-3 h-fit
  sm:px-10 pt-0  rounded-[20px] pb-[25px] z-[51];
}

.red-btn {
  @apply bg-custom-red rounded-[30px] h-[35px] mt-6 text-white w-full hover:opacity-[0.8] focus:opacity-[0.8];
}
</style>
