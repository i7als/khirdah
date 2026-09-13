import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { fetchChatHistory, sendChatMessage } from "../api/chatApi";
import { useLanguage } from "../context/LanguageContext";
import { SendIcon } from "../components/icons";
import { SkeletonBox } from "../components/common/Skeleton";

export default function ChatPage() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    fetchChatHistory()
      .then(setMessages)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    setInput("");
    setMessages((prev) => [...prev, { _id: `u-${Date.now()}`, role: "user", content: text }]);
    setSending(true);

    try {
      const { reply } = await sendChatMessage(text);
      setMessages((prev) => [...prev, { _id: `a-${Date.now()}`, role: "assistant", content: reply }]);
    } catch {
      toast.error(t("chat.errorGeneric"));
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl dark:text-slate-100">
          {t("chat.title")}
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">{t("chat.subtitle")}</p>
      </div>

      <div className="flex h-[60vh] flex-col gap-3 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {loading ? (
          <>
            <SkeletonBox className="h-10 w-2/3" />
            <SkeletonBox className="ms-auto h-10 w-1/2" />
            <SkeletonBox className="h-10 w-3/5" />
          </>
        ) : messages.length === 0 ? (
          <p className="m-auto max-w-sm text-center text-sm text-slate-500 dark:text-slate-400">
            {t("chat.emptyGreeting")}
          </p>
        ) : (
          messages.map((m) => (
            <div key={m._id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))
        )}
        {sending && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-slate-100 px-4 py-2.5 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {t("chat.thinking")}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("chat.inputPlaceholder")}
          className="flex-1 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95 disabled:pointer-events-none disabled:opacity-50"
        >
          <SendIcon className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
