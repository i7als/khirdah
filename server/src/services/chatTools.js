import { getSummaryData, getByCategoryData } from "../controllers/analysis.controller.js";
import { listTransactionsData } from "../controllers/transaction.controller.js";
import { getAccountsData } from "../controllers/account.controller.js";

// Kuwait has no daylight saving, so a fixed UTC+3 offset is always correct.
// Date-boundary arithmetic must never be delegated to the model — it has
// silently produced off-by-a-few-hours results before (e.g. computing
// "this month" in UTC instead of Kuwait local time). Tools instead accept a
// named period and this resolves it deterministically server-side.
const KUWAIT_OFFSET_MS = 3 * 60 * 60 * 1000;

function startOfKuwaitDay(daysAgo = 0) {
  const kuwaitNow = new Date(Date.now() + KUWAIT_OFFSET_MS);
  const kuwaitMidnight = Date.UTC(kuwaitNow.getUTCFullYear(), kuwaitNow.getUTCMonth(), kuwaitNow.getUTCDate() - daysAgo);
  return new Date(kuwaitMidnight - KUWAIT_OFFSET_MS);
}

function startOfKuwaitMonth() {
  const kuwaitNow = new Date(Date.now() + KUWAIT_OFFSET_MS);
  const kuwaitMonthStart = Date.UTC(kuwaitNow.getUTCFullYear(), kuwaitNow.getUTCMonth(), 1);
  return new Date(kuwaitMonthStart - KUWAIT_OFFSET_MS);
}

function getPeriodRange(period) {
  const to = new Date().toISOString();
  switch (period) {
    case "today":
      return { from: startOfKuwaitDay(0).toISOString(), to };
    case "week":
      return { from: startOfKuwaitDay(7).toISOString(), to };
    case "month":
      return { from: startOfKuwaitMonth().toISOString(), to };
    case "year":
      return { from: startOfKuwaitDay(365).toISOString(), to };
    case "all":
    default:
      return { from: undefined, to: undefined };
  }
}

// Tool names/descriptions are in English even though the app and its users
// are primarily Arabic — small/free tool-calling models are noticeably more
// reliable at deciding to call a tool (and picking correct arguments) when
// the schema itself is in English, regardless of what language the user
// wrote their question in. The final reply to the user is still generated
// in their language (instructed in the system prompt).
export const CHAT_TOOL_DEFINITIONS = [
  {
    type: "function",
    function: {
      name: "get_balance_summary",
      description:
        "Get the user's total balance across all linked bank accounts, plus a per-account breakdown.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "get_spending_summary",
      description:
        "Get total income, total expense, and net for a time period. Use this for questions like 'how much did I spend' or 'what's my income'.",
      parameters: {
        type: "object",
        properties: {
          period: {
            type: "string",
            enum: ["today", "week", "month", "year", "all"],
            description:
              "Time period: today, week (last 7 days), month (current calendar month so far), year (last 365 days), or all (entire history). Defaults to all.",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_spending_by_category",
      description: "Get spending (or income) broken down by category for a time period, sorted highest first.",
      parameters: {
        type: "object",
        properties: {
          period: {
            type: "string",
            enum: ["today", "week", "month", "year", "all"],
            description: "Same meaning as in get_spending_summary. Defaults to all.",
          },
          type: { type: "string", enum: ["income", "expense"], description: "Defaults to expense." },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "list_recent_transactions",
      description: "Get a list of transactions matching optional filters (merchant search, category, type, period).",
      parameters: {
        type: "object",
        properties: {
          search: { type: "string", description: "Text search on merchant name" },
          category: { type: "string" },
          type: { type: "string", enum: ["income", "expense"] },
          period: {
            type: "string",
            enum: ["today", "week", "month", "year", "all"],
            description: "Same meaning as in get_spending_summary. Defaults to all.",
          },
          limit: { type: "number", description: "Max number of results, defaults to 10" },
        },
        required: [],
      },
    },
  },
];

async function getBalanceSummary(userId) {
  const accounts = await getAccountsData(userId);
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  return {
    totalBalance,
    currency: "KWD",
    accounts: accounts.map((a) => ({
      bank: a.bank?.name,
      accountNumberMasked: a.accountNumberMasked,
      balance: a.balance,
    })),
  };
}

export async function executeChatTool(name, args, userId) {
  switch (name) {
    case "get_balance_summary":
      return getBalanceSummary(userId);
    case "get_spending_summary":
      return getSummaryData(userId, getPeriodRange(args.period));
    case "get_spending_by_category":
      return getByCategoryData(userId, { ...getPeriodRange(args.period), type: args.type });
    case "list_recent_transactions": {
      const { items } = await listTransactionsData(userId, {
        search: args.search,
        category: args.category,
        type: args.type,
        ...getPeriodRange(args.period),
        limit: Math.min(args.limit || 10, 20),
      });
      return items.map((t) => ({
        date: t.date,
        merchant: t.merchant,
        category: t.category,
        type: t.type,
        amount: t.amount,
        currency: t.currency,
      }));
    }
    default:
      return { error: `unknown tool: ${name}` };
  }
}
