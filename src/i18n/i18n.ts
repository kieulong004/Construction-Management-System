import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import DASHBOARD_EN from "../locales/en/dashboard.json";
import DASHBOARD_VI from "../locales/vi/dashboard.json";

export const resources = {
  en: {
    dashboard: DASHBOARD_EN,
  },
  vi: {
    dashboard: DASHBOARD_VI,
  },
};

export const defaultNS = "dashboard";

i18n.use(initReactI18next).init({
  resources,
  lng: "vi", // Ngôn ngữ mặc định
  ns: ["dashboard"], // Namespace
  defaultNS,
  fallbackLng: "vi", // Ngôn ngữ dự phòng
  interpolation: { escapeValue: false },
});

export default i18n;
