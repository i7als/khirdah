import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ConnectBankPage from "./pages/ConnectBankPage";
import AccountsPage from "./pages/AccountsPage";
import AccountDetailPage from "./pages/AccountDetailPage";
import AnalysisPage from "./pages/AnalysisPage";
import NotFoundPage from "./pages/NotFoundPage";

function AppToaster() {
  const { lang } = useLanguage();
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          direction: lang === "ar" ? "rtl" : "ltr",
          fontFamily: "Tajawal, system-ui, sans-serif",
          borderRadius: "9999px",
          padding: "10px 20px",
          fontSize: "14px",
        },
        success: {
          style: { background: "#16a34a", color: "#fff" },
          iconTheme: { primary: "#fff", secondary: "#16a34a" },
        },
        error: {
          style: { background: "#dc2626", color: "#fff" },
          iconTheme: { primary: "#fff", secondary: "#dc2626" },
        },
      }}
    />
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppToaster />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/connect-bank"
              element={
                <ProtectedRoute>
                  <ConnectBankPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/accounts"
              element={
                <ProtectedRoute>
                  <AccountsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/accounts/:id"
              element={
                <ProtectedRoute>
                  <AccountDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analysis"
              element={
                <ProtectedRoute>
                  <AnalysisPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
