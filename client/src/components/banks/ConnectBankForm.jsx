import { useState } from "react";
import { UserIcon, LockIcon } from "../icons";

export default function ConnectBankForm({ bank, onSubmit, onCancel, submitting }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ bankId: bank._id, username, password });
  }

  return (
    <div className="max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-2 text-sm text-amber-700">
        <strong>محاكاة فقط</strong> — هذا ليس اتصالاً حقيقيًا بـ {bank.name}. أي قيمة تُقبل هنا.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            اسم المستخدم (وهمي)
          </label>
          <div className="relative">
            <UserIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="أي اسم مستخدم"
              className="w-full rounded-xl border border-slate-300 py-2.5 pr-10 pl-3 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            كلمة المرور (وهمية)
          </label>
          <div className="relative">
            <LockIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="أي كلمة مرور"
              className="w-full rounded-xl border border-slate-300 py-2.5 pr-10 pl-3 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-full bg-blue-600 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95 disabled:opacity-60"
          >
            {submitting ? "جاري الربط..." : "ربط"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="rounded-full border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 active:scale-95"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}
