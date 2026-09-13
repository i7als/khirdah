// Maps a preset range key to {from, to} ISO bounds for the summary/by-category
// endpoints, plus a sensible month count for the (always-monthly) trend chart
// so it never collapses to a single bar for short ranges.
export function getDateRange(key) {
  const now = new Date();
  const to = now.toISOString();
  let from = null;
  let trendMonths = 6;

  switch (key) {
    case "week": {
      const d = new Date(now);
      d.setDate(d.getDate() - 7);
      from = d.toISOString();
      trendMonths = 3;
      break;
    }
    case "month": {
      from = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      trendMonths = 3;
      break;
    }
    case "3m": {
      const d = new Date(now);
      d.setMonth(d.getMonth() - 3);
      from = d.toISOString();
      trendMonths = 3;
      break;
    }
    case "6m": {
      const d = new Date(now);
      d.setMonth(d.getMonth() - 6);
      from = d.toISOString();
      trendMonths = 6;
      break;
    }
    case "year": {
      const d = new Date(now);
      d.setFullYear(d.getFullYear() - 1);
      from = d.toISOString();
      trendMonths = 12;
      break;
    }
    case "all":
    default:
      from = null;
      trendMonths = 12;
      break;
  }

  return { from, to, trendMonths };
}
