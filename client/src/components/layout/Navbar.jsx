import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LogoIcon from "./LogoIcon";

const navLinkClass = ({ isActive }) =>
  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 ${
    isActive ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <LogoIcon className="h-12 w-12 shrink-0" />
            <span className="text-5xl font-extrabold tracking-tight text-blue-600">خرده</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:inline">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50 active:scale-95"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
        <nav className="mt-3 flex items-center gap-1">
          <NavLink to="/dashboard" className={navLinkClass} end>
            الرئيسية
          </NavLink>
          <NavLink to="/accounts" className={navLinkClass}>
            حساباتي
          </NavLink>
          <NavLink to="/analysis" className={navLinkClass}>
            تحليل الإنفاق
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
