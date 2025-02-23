<template>
  <div
    class="relative w-6"
    @click="toggleDropdown()"
    v-on-click-outside="closeDropdown"
  >
    <UaImg
      class="cursor-pointer rounded w-6"
      v-show="GeneralStore.useLanguage === 'ua'"
    />
    <UkImg
      class="cursor-pointer rounded w-6"
      v-show="GeneralStore.useLanguage === 'en'"
    />
    <Transition>
      <div
        class="absolute left-1/2 transform -translate-x-1/2 bg-white p-2 rounded top-7"
        v-if="store.activeDropdown"
      >
        <UaImg
          class="pointer cursor-pointer rounded w-6 mb-[5px]"
          @click="selectLanguage('ua')"
        />
        <UkImg
          class="pointer cursor-pointer rounded w-6"
          @click="selectLanguage('en')"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";

const { locale } = useI18n();
const router = useRouter();
const GeneralStore = useGeneralStore();
const productsStore = useProductsStore();
const route = useRoute();
const store = reactive({
  activeDropdown: false,
});
const selectLanguage = async (locales: string) => {
  setItem("language", locales);
  console.log();

  if (locale.value !== locales) {
    locale.value = locales;
    GeneralStore.useLanguage = locales;
    const to = router.resolve({ params: { locale: locales } });
    await router.push(to);
    if (route.name === "ProductsItems") {
      await productsStore.fetchProducts(locale.value);
    }
  }
};

const toggleDropdown = () => {
  store.activeDropdown = !store.activeDropdown;
};

onMounted(() => {
  selectLanguage(GeneralStore.useLanguage);
});
const closeDropdown = () => {
  store.activeDropdown = false;
};
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
