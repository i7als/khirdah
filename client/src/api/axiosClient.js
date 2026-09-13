import axios from "axios";
import toast from "react-hot-toast";
import { translations } from "../i18n/translations";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("khirdah_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let sessionExpiredHandled = false;

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const hadToken = !!error.config?.headers?.Authorization;
    if (error.response?.status === 401 && hadToken && !sessionExpiredHandled) {
      sessionExpiredHandled = true;
      localStorage.removeItem("khirdah_token");
      const lang = localStorage.getItem("khirdah_lang") === "en" ? "en" : "ar";
      toast.error(translations[lang].common.sessionExpired, { id: "session-expired" });
      if (window.location.pathname !== "/login") {
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
