import {defineStore} from "pinia";
import {getItem} from "../services/LocalStorage";
import {uploadBytesResumable} from "firebase/storage";
import {ref} from "vue";

export const useGeneralStore = defineStore({
  id: "GeneralStore",
  state: () => ({
    useLanguage: getItem("language") || "ua",
    statusLogin: false,
    statusLoader: false,
    email: "",
    name: "",
    Errors: {
      login: {status: false, text: ""},
      register: {status: false, text: ""},
    },
    photoProfile: null,
    userInfo: null,
    openBasketModal: false,
    openLoginModal: false,
    openProductDescription: false,
    openRegistrationModal: false,
    openForgotPasswordModal: false,
    openForgotPasswordModalStep1: false,
    openForgotPasswordModalStep2: false,
    openMobileFilterPanel: false,
    openMobileHeader: false,
    widthScreen: "",
    dataLogin: {email: "", password: ""},
    screenWidth: null,
    openCropperModal:false,
    dataRegister: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    openFilterSideBar: false,
    openLeftSideBar: true,
  }),
  getters: {},
  actions: {

    }
  },
});
