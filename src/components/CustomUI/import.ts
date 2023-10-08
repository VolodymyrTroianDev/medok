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
const TextArea = defineAsyncComponent(
  () => import("@/components/CustomUI/TextArea.vue")
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
const LocationSelect = defineAsyncComponent(
  () => import("@/components/CustomUI/LocationSelect.vue")
);
const RadioBtn = defineAsyncComponent(
  () => import("@/components/CustomUI/RadioBtn.vue")
);

export default {
  OAuth,
  Loader,
  InputText,
  InputPassword,
  InputSearch,
  ModalContainer,
  MyModal,
  CustomCounterBtn,
  LocationSelect,
  RadioBtn,
  TextArea
};
