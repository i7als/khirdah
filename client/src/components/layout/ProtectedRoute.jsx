import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import Navbar from "./Navbar";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500 dark:bg-slate-950 dark:text-slate-400">
        {t("loading")}
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-blue-50/40 dark:from-slate-950 dark:via-slate-950 dark:to-blue-950/20">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
