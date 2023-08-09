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
const MyModal = defineAsyncComponent(
  () => import("@/components/CustomUI/MyModal.vue")
);
const CustomCounterBtn = defineAsyncComponent(
  () => import("@/components/CustomUI/CustomCounterBtn.vue")
);
export default {
  OAuth,
  Loader,
  InputText,
  InputPassword,
  InputSearch,
  ModalContainer,
  MyModal,
  CustomCounterBtn
};
