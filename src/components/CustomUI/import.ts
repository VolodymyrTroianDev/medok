import { defineAsyncComponent } from "vue";

const OAuth = defineAsyncComponent(
  () => import("@/components/CustomUI/OAuth.vue")
);
const Loader = defineAsyncComponent(
  () => import("@/components/CustomUI/Loader.vue")
);
const InputText = defineAsyncComponent(
  () => import("@/components/CustomUI/InputText.vue")
);
const InputPassword = defineAsyncComponent(
  () => import("@/components/CustomUI/InputPassword.vue")
);
const InputSearch = defineAsyncComponent(
  () => import("@/components/CustomUI/InputSearch.vue")
);
const ModalContainer = defineAsyncComponent(
  () => import("@/components/CustomUI/ModalContainer.vue")
);

export default {
  OAuth,
  Loader,
  InputText,
  InputPassword,
  InputSearch,
  ModalContainer
};
