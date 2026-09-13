import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { translateApiMessage } from "../i18n/translations";
import Wordmark from "../components/layout/Wordmark";
import PasswordInput from "../components/common/PasswordInput";
import { MailIcon, UserIcon } from "../components/icons";

export default function RegisterPage() {
  const { register } = useAuth();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      toast.error(translateApiMessage(err.response?.data?.message, lang) || err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-slate-50 px-4 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <h1 className="mb-1 text-center">
          <Wordmark />
        </h1>
        <p className="mb-6 text-center text-sm text-slate-500 dark:text-slate-400">
          {t("auth.register")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("auth.name")}
            </label>
            <div className="relative">
              <UserIcon className="pointer-events-none absolute end-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder={t("auth.namePlaceholder")}
                className="w-full rounded-xl border border-slate-300 py-2.5 ps-3 pe-10 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("auth.email")}
            </label>
            <div className="relative">
              <MailIcon className="pointer-events-none absolute end-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder={t("auth.emailPlaceholder")}
                className="w-full rounded-xl border border-slate-300 py-2.5 ps-3 pe-10 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("auth.password")}
            </label>
            <PasswordInput
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              placeholder={t("auth.passwordHintPlaceholder")}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-blue-600 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95 disabled:opacity-60"
          >
            {submitting ? t("auth.registerLoading") : t("auth.registerButton")}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          {t("auth.haveAccount")}{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
            {t("auth.login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
