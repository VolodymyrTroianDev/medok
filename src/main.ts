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
import moment from "moment";
import './assets/style.scss'
import "aos/dist/aos.css";
const pinia = createPinia();
const app = createApp(App);
/*Directives */
import directives from "./directives/index";
for (let index = 0; index < Object.keys(CustomComponets).length; index++) {
  const element = Object.keys(CustomComponets)[index];
  app.component(element, CustomComponets[element]);
}

app.config.globalProperties.$moment = moment;
directives.forEach((directive) => {
  app.directive(directive.name, directive);
});
app
    .use(i18n)
    .use(VueClickAway)
    .use(router)
    .use(pinia)
    .mount("#app");
AOS.init(configureAOS);
