import OpenAI from "openai";
import ChatMessage from "../models/ChatMessage.js";
import { CHAT_TOOL_DEFINITIONS, executeChatTool } from "../services/chatTools.js";

const HISTORY_LIMIT = 20;
const MAX_TOOL_ROUNDS = 4;

function buildSystemPrompt() {
  return `You are a financial assistant inside "Khirdah" (خرده), an app that aggregates a user's Kuwaiti bank accounts in one place. Your only job is to help the user understand their financial situation inside this app: their balances, transactions, and spending by category.

When calling a tool that accepts a "period" argument, pick the value (today/week/month/year/all) that matches the user's question instead of computing any date yourself — the server resolves the actual date boundaries, never guess or compute them.

Strict rules:
- Never state any financial number (balance, amount, net) without first calling the matching tool and using its actual result. Never invent or estimate a number.
- The currency is always Kuwaiti Dinar (KWD).
- If the user asks about anything outside their financial situation in this app (news, general investment advice, unrelated topics), politely decline and steer them back to their accounts and transactions here.
- Always reply in the same language the user wrote in (Arabic or English) — this rule applies only to your final reply text, not to how you call tools.
- Always write numbers using Western digits (0123456789), never Eastern Arabic-Indic numerals (٠١٢٣٤٥٦٧٨٩), even when replying in Arabic. Copy the digits from the tool result exactly as given — never re-transcribe or convert them.
- Reply in plain text only — no markdown formatting (no **bold**, no #headings, no bullet lists with -/*).
- Be concise, direct, and friendly.`;
}

export async function getHistory(req, res, next) {
  try {
    const messages = await ChatMessage.find({ user: req.userId }).sort("createdAt");
    res.json(messages);
  } catch (err) {
    next(err);
  }
}

export async function sendMessage(req, res, next) {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ message: "الرسالة مطلوبة" });
    }

    await ChatMessage.create({ user: req.userId, role: "user", content: message });

    const history = await ChatMessage.find({ user: req.userId }).sort("createdAt");
    const recent = history.slice(-HISTORY_LIMIT);

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL || undefined,
    });
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    let messages = [
      { role: "system", content: buildSystemPrompt() },
      ...recent.map((m) => ({ role: m.role, content: m.content })),
    ];

    let finalText = null;
    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const completion = await client.chat.completions.create({
        model,
        messages,
        tools: CHAT_TOOL_DEFINITIONS,
      });

      const choice = completion.choices[0].message;

      if (!choice.tool_calls || choice.tool_calls.length === 0) {
        finalText = choice.content;
        break;
      }

      messages.push(choice);

      for (const toolCall of choice.tool_calls) {
        const args = JSON.parse(toolCall.function.arguments || "{}");
        const result = await executeChatTool(toolCall.function.name, args, req.userId);
        messages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(result),
        });
      }
    }

    if (!finalText) {
      finalText = "عذرًا، صار خطأ أثناء معالجة سؤالك. حاول مرة ثانية.";
    }

    await ChatMessage.create({ user: req.userId, role: "assistant", content: finalText });

    res.json({ reply: finalText });
  } catch (err) {
    next(err);
  }
}
