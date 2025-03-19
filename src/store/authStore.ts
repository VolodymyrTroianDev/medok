import { defineStore } from "pinia";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import LoginEnum from "@/enums/LoginEnum";
import { Login } from "@/types/auth-types";
import { getDatabase, ref, set, get } from "firebase/database";
import { db } from "@/main";

export const useAuthenticationStore = defineStore("authentication", () => {
  const state = reactive<AuthStore>({
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
  const Errors = reactive<Errors>({
    login: { status: false, text: "" },
    register: { status: false, text: "" },
  });
  const auth: any = getAuth();
  const general = useGeneralStore();

  const fetchUserRole = async (user: User) => {
    if (!user) return;

    const db = getDatabase();
    const userRef = ref(db, `users/${user.uid}`);

    try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        state.role = snapshot.val().role || "user";
      } else {
        state.role = "user";
      }
    } catch (error) {
      state.role = "user";
    }
  };
  const loginUser = async (data: Login) => {
    general.statusLoader = true;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      state.statusLogin = true;
      setItem("uid", userCredential.user.uid);
      await fetchUserRole(userCredential.user);
      general.statusLoader = false;
      checkOpenModal();
    } catch (e: any) {
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
  };
  const logOut = async () => {
    try {
      await signOut(auth);
      state.statusLogin = false;
      general.statusLoader = false;
      state.role = "";
    } catch (e) {
      console.error(e);
    }
  };
  const checkAuthSession = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserRole(user);
        await downloadUrlPhoto(user.uid);
        general.statusLoader = true;
        state.statusLogin = true;
        state.photoProfile = user.photoURL;
        general.statusLoader = false;
        state.email = user.email;
        state.name = user.displayName;
        state.uid = user.uid;
        state.userInfo = user;
        setItem("uid", state.uid);
        general.statusLoader = false;
      } else {
        state.statusLogin = false;
        state.role = "";
        setTimeout(() => {
          general.statusLoader = false;
        }, 1000);
        await logOut();
      }
    });
  };
  const signInWithGoogle = async () => {
    general.statusLoader = true;
    const provider = new GoogleAuthProvider();
    try {
      const req = await signInWithPopup(getAuth(), provider);
      if (!database.state.data?.auth) await database.createUserInfo(req.user);
      checkOpenModal();
    } catch (e) {
      generateErrors("register", t("errors.serverError"));
      generateErrors("login", t("errors.serverError"));
      general.openRegistrationModal = true;
      general.openLoginModal = true;
    }
  };
  const signInWithFacebook = async () => {
    general.statusLoader = true;
    const provider = new FacebookAuthProvider();
    try {
      const req = await signInWithPopup(getAuth(), provider);
      checkOpenModal();
      general.statusLoader = false;
      await fetchUserRole(req.user);
    } catch (e) {
      generateErrors("register", t("errors.serverError"));
      generateErrors("login", t("errors.serverError"));
      general.openRegistrationModal = true;
      general.openLoginModal = true;
    }
  };
  const register = async (data) => {
    general.statusLoader = true;
    try {
      const res = await createUserWithEmailAndPassword(
        getAuth(),
        data.email,
        data.password,
      );
      await database.createUserInfo(res.user);
      await set(ref(db, `users/${res.user.uid}`), {
        email: data.email,
        role: "user",
      });
      await fetchUserRole(res.user);
      general.statusLoader = false;
      Errors.register.status = false;
      checkOpenModal();
    } catch (e: any) {
      Errors.register.status = true;
      general.statusLoader = false;
      console.log(e);
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
  };
  const generateErrors = (type: string, text: string) => {
    Errors[`${type}`].status = true;
    Errors[`${type}`].text = text;
    setTimeout(() => {
      Errors[`${type}`].status = false;
      Errors[`${type}`].text = "";
    }, 3000);
  };
  const checkOpenModal = () => {
    general.openRegistrationModal = general.openRegistrationModal
      ? false
      : general.openRegistrationModal;
    general.openLoginModal = general.openLoginModal
      ? false
      : general.openLoginModal;
  };
  const updatePhotoProfile = async (file: string) => {
    const storage = getStorage();
    const filePath = `images/${state.uid}.jpg`;
    const imageRef = storageRef(storage, filePath);

    try {
      await uploadString(imageRef, file, "data_url");
      general.openCropperModal = false;
      await downloadUrlPhoto(state.uid);
    } catch (error) {
      console.error("Помилка при завантаженні фото:", error);
    }
  };
  const downloadUrlPhoto = async (uid: string) => {
    const storage = getStorage();
    const filePath = `images/${uid}.jpg`;
    const imageRef = storageRef(storage, filePath);
    try {
      const photoURL = await getDownloadURL(imageRef);
      await database.updateReloadUserInfo(uid, photoURL);
    } catch (error) {
      console.error("Помилка при завантаженні URL фото:", error);
    }
  };
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
    updatePhotoProfile,
  };
});
