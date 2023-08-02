import { createI18n } from "vue-i18n";
import en from "./en.json";
import ua from "./ua.json";

// Type-define 'en-US' as the master schema for the resource
type MessageSchema = typeof en;
const data = import.meta.glob("../localization/*.json");

export default createI18n<[MessageSchema], "en" | "ua">({
  legacy: false,
  globalInjection: true,
  locale: "ua",
  availableLocales: ["en", "ua"],
  messages: {
    en,
    ua,
  },
});
