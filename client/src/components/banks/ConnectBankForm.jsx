import { useState } from "react";

export default function ConnectBankForm({ bank, onSubmit, onCancel, submitting }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ bankId: bank._id, username, password });
  }

  return (
    <div className="max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-2 text-sm text-amber-700">
        <strong>محاكاة فقط</strong> — هذا ليس اتصالاً حقيقيًا بـ {bank.name}. أي قيمة تُقبل هنا.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            اسم المستخدم (وهمي)
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            كلمة المرور (وهمية)
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2 pt-1">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting ? "جاري الربط..." : "ربط"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}
