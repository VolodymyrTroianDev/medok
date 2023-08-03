import {defineStore} from "pinia";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { reactive} from "vue";
import {getItem, setItem} from "@/services/LocalStorage";
import {useI18n} from "vue-i18n";
import {authStore, Errors, Login} from "@/types/auth-types";
import LoginEnum from "@/enums/LoginEnum";

export const useAuthenticationStore = defineStore("authentication", () => {
  const state = reactive<authStore>({
    uid: getItem("uid") || "",
    statusLogin: false,
    isLoading: false,
    email: "",
    name: "",
    photoProfile: null,
    userInfo: null,
  });
  const { t } = useI18n()
  const Errors = reactive<Errors>(
    {
      login: {status: false, text: ""},
      register: {status: false, text: ""},
    }
  )
  const auth = getAuth();

  const login = async (data: Login) => {
    state.isLoading = true;
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      state.statusLogin = true;
      state.statusLogin = true;
      setItem("uid", auth.currentUser.uid);
    } catch (e) {
        Errors.login.status = true;
      switch (e.code) {
        case LoginEnum.EMAIL:
          Errors.login.text = t("errors.invalidEmail");
          break;
        case LoginEnum.USER_NOT_FOUND:
          Errors.login.text = t("errors.userNotFound");
          break;
        case LoginEnum.WRONG_PASSWORD:
          Errors.login.text = t("errors.wrongPassword");
          break;
        default:
          Errors.login.text = t("errors.wrongPasswordAndEmail");
          break;
      }
      setTimeout(() => {
        Errors.login.status = false;
      }, 3000);
    }
  }
 const logOut = async () => {
    try {
      await signOut(auth)
      state.statusLogin = false;
      state.isLoading = false;
    } catch (e) {
      console.error(e)
    }
  }
  const checkAuthSession = async () =>{
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        state.statusLogin = true;
        state.isLoading = false;
        state.email = user.email;
        state.name = user.displayName;
        state.uid = user.uid;
        state.userInfo = user;
        setItem("uid", state.uid);
        // downloadUrlPhoto(state.uid);
      } else  {
        state.statusLogin = false;
        setTimeout(() => {
          state.isLoading = false;
        }, 1000);
        logOut();
      }
    })
  }
  return {
    state,
    Errors,
    login,
    logOut,
    checkAuthSession
  }

})
