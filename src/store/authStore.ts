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
  sendEmailVerification
} from "firebase/auth";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadString
} from "firebase/storage";
import { reactive} from "vue";
import {getItem, setItem} from "@/services/LocalStorage";
import {useI18n} from "vue-i18n";
import {authStore, Errors, Login} from "@/types/auth-types";
import LoginEnum from "@/enums/LoginEnum";
import {useGeneralStore} from "@/store/generalStore";
import {useDatabaseStore} from "@/store/databaseStore";

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
  const { t } = useI18n();
  const database = useDatabaseStore();
  const Errors = reactive<Errors>(
    {
      login: {status: false, text: ""},
      register: {status: false, text: ""},
    }
  )
  const auth:any = getAuth();
  const general = useGeneralStore();

  const loginUser = async (data: Login) => {
    general.statusLoader = true;
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      state.statusLogin = true;
      setItem("uid", state.uid);
      general.statusLoader = false;
      checkOpenModal();
    } catch (e:any) {
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
      general.statusLoader = false;
      setTimeout(() => {
        Errors.login.status = false;
      }, 3000);
    }
  }
 const logOut = async () => {
    try {
      await signOut(auth)
      state.statusLogin = false;
      general.statusLoader = false;
    } catch (e) {
      console.error(e)
    }
  }
  const checkAuthSession = async () =>{
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        general.statusLoader = true;
        downloadUrlPhoto(user.uid);
        state.statusLogin = true;
        general.statusLoader = false;
        state.email = user.email;
        state.name = user.displayName;
        state.uid = user.uid;
        state.userInfo = user;
        setItem("uid", state.uid);
        general.statusLoader = false;
      } else  {
        state.statusLogin = false;
        setTimeout(() => {
          general.statusLoader = false;
        }, 1000);
        logOut();
      }
    })
  }
  const signInWithGoogle = async () => {
    general.statusLoader = true;
    const provider = new GoogleAuthProvider();
    try {
      const req = await signInWithPopup(getAuth(), provider)
      if (!database.state.data?.auth) await database.createUserInfo(req.user)
      checkOpenModal();
    } catch (e) {
      generateErrors("register",t("errors.serverError"));
      generateErrors("login", t("errors.serverError"));
      general.openRegistrationModal = true;
      general.openLoginModal = true;
    }
  }
  const signInWithFacebook = async () => {
    general.statusLoader = true;
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(getAuth(), provider);
      checkOpenModal();
      general.statusLoader = false;
    } catch (e) {
      generateErrors("register",t("errors.serverError"));
      generateErrors("login", t("errors.serverError"));
      general.openRegistrationModal = true;
      general.openLoginModal = true;
    }
  }
  const register = async (data)=> {
    general.statusLoader = true;
    try {
      const res = await createUserWithEmailAndPassword(getAuth(), data.email, data.password);
      await database.createUserInfo(res.user);
      general.statusLoader = false;
      Errors.register.status = false;
      checkOpenModal();
    } catch (e:any) {
      general.openRegistrationModal = true;
      Errors.register.status = true;
      general.statusLoader = false;
      console.log(e)
      switch (e.code) {
        case "auth/email-already-in-use":
          Errors.register.text = t("errors.emailAlready");
          break;
        case "auth/weak-password":
          Errors.register.text = t("errors.weakPassword");
          break;
        default:
          Errors.register.text = t("errors.serverError");
          break;
      }
      setTimeout(() => {
        Errors.register.status = false;
      }, 3000);
    }
  }
  const generateErrors = (type:string, text:string) => {
    Errors[`${type}`].status = true;
    Errors[`${type}`].text = text;
    setTimeout(() => {
      Errors[`${type}`].status = false;
      Errors[`${type}`].text = "";
    }, 3000);
  }
  const checkOpenModal = ()=> {
    general.openRegistrationModal = general.openRegistrationModal ? false : general.openRegistrationModal;
    general.openLoginModal = general.openLoginModal ? false : general.openLoginModal;
  }
  const updatePhotoProfile = async (file) => {
    const storage = getStorage();
    const mountainImagesRef = ref(storage,`gs://medok-karpatskyj.appspot.com/images/${state.uid}.jpg`);
    try {
      await uploadString(mountainImagesRef, file, 'data_url');
      general.openCropperModal = false;
      await downloadUrlPhoto(state.uid);
    } catch (error) {
      console.log(error);
    }
  }
  const downloadUrlPhoto = async (uid) => {
    const storage = getStorage();
    try {
      const photo = await getDownloadURL(
        ref(storage, `gs://medok-karpatskyj.appspot.com/images/${uid}.jpg`)
      );
      await database.updateReloadUserInfo(uid, photo);
    } catch (e) {
      console.log(e);
    }
  }
  return {
    state,
    Errors,
    loginUser,
    logOut,
    checkAuthSession,
    signInWithGoogle,
    signInWithFacebook,
    register,
    generateErrors,
    updatePhotoProfile
  }

})
