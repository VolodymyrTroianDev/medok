import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import router from "./router/index";
import i18n from "@/localization/i18n";
import VueClickAway from "vue3-click-away";
import "@fontsource/marck-script";
import AOS from "aos";
import configureAOS from "../aoc.configure";
import CustomComponets from "./components/CustomUI/import"
import './assets/style.scss'
import "aos/dist/aos.css";
const pinia = createPinia();
let app;
/*Directives */
import directives from "./directives/index";
import {firebaseConfig} from "@/libs/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
export { db };
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (!app) {
    app = createApp(App)
    app
      .use(i18n)
      .use(VueClickAway)
      .use(router)
      .use(pinia)
      .mount("#app");
    AOS.init(configureAOS);
  }
  for (let index = 0; index < Object.keys(CustomComponets).length; index++) {
    const element = Object.keys(CustomComponets)[index];
    app.component(element, CustomComponets[element]);
  }
  console.log(user)
  directives.forEach((directive) => {
    app.directive(directive.name, directive);
  });
});
