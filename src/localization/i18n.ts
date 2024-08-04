import { createI18n, useI18n as vueUseI18n } from "vue-i18n";
import en from "./en.json";
import ua from "./ua.json";

type MessageSchema = typeof en;

const i18n = createI18n<[MessageSchema], "en" | "ua">({
  legacy: false,
  globalInjection: true,
  locale: "ua",
  availableLocales: ["en", "ua"],
  messages: {
    en,
    ua,
  },
});

export { i18n, vueUseI18n as useI18n };
export default i18n;
