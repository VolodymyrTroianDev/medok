import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/index";
import i18n from "@/localization/i18n";
import "@fontsource/marck-script";
import AOS from "aos";
import configureAOS from "../aoc.configure";
import CustomComponets from "./components/CustomUI/import";
import "./assets/style.scss";
import "aos/dist/aos.css";
import { getDatabase } from "firebase/database";
const pinia = createPinia();
let app;
/*Directives */
import directives from "./directives/index";
import { firebaseConfig } from "@/libs/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/uk";
import { createHead } from "@unhead/vue";
import VueMitter from "@nguyenshort/vue3-mitt";
import InlineSvg from "vue-inline-svg";
import Vue3Toastify, { ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.extend(relativeTime);
dayjs.locale("uk");
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase),
  database = getDatabase(firebase),
  auth = getAuth(),
  head = createHead();

export { db, database };

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);
    app
      .use(head)
      .use(i18n)
      .component("inline-svg", InlineSvg)
      .use(router)
      .use(pinia)
      .use(VueMitter)
      .use(Vue3Toastify, {
        autoClose: 3000,
      } as ToastContainerOptions)
      .mount("#app");
    AOS.init(configureAOS);
  }
  for (let index = 0; index < Object.keys(CustomComponets).length; index++) {
    const element = Object.keys(CustomComponets)[index];
    app.component(element, CustomComponets[element]);
  }
  directives.forEach((directive) => {
    app.directive(directive.name, directive);
  });
});
