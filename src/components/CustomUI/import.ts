import { defineAsyncComponent } from "vue";

const OAuth = defineAsyncComponent(() => import("custom/OAuth.vue"));
const Loader = defineAsyncComponent(() => import("custom/Loader.vue"));
const InputText = defineAsyncComponent(() => import("custom/InputText.vue"));
const TextArea = defineAsyncComponent(() => import("custom/TextArea.vue"));
const InputPassword = defineAsyncComponent(
  () => import("custom/InputPassword.vue"),
);
const InputSearch = defineAsyncComponent(
  () => import("custom/InputSearch.vue"),
);
const ModalContainer = defineAsyncComponent(
  () => import("custom/ModalContainer.vue"),
);
const MyModal = defineAsyncComponent(() => import("custom/MyModal.vue"));
const CustomCounterBtn = defineAsyncComponent(
  () => import("custom/CustomCounterBtn.vue"),
);
const LocationSelect = defineAsyncComponent(
  () => import("custom/LocationSelect.vue"),
);
const RadioBtn = defineAsyncComponent(() => import("custom/RadioBtn.vue"));
const LoginModal = defineAsyncComponent(() => import("modals/Login.vue"));
const RegistrationModal = defineAsyncComponent(
  () => import("modals/Registration.vue"),
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
  TextArea,
  LoginModal,
  RegistrationModal,
};
