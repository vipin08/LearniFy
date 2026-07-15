import { getItem, setItem, STORAGE_KEYS } from "../utils/storage";
import { DEFAULT_HISTORY } from "../data/mockData";

function getHistory() {
  const stored = getItem(STORAGE_KEYS.HISTORY, null);
  if (!stored) {
    setItem(STORAGE_KEYS.HISTORY, DEFAULT_HISTORY);
    return DEFAULT_HISTORY;
  }
  return stored;
}

function saveHistory(items) {
  setItem(STORAGE_KEYS.HISTORY, items);
}

function formatTimeLabel(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export const historyService = {
  getAll() {
    return getHistory();
  },

  getRecent(limit = 5) {
    return getHistory().slice(0, limit);
  },

  add(entry) {
    const items = getHistory();
    const item = {
      id: `h-${Date.now()}`,
      type: entry.type,
      title: entry.title,
      date: new Date().toISOString(),
      timeLabel: "Just now",
    };
    items.unshift(item);
    saveHistory(items);
    return item;
  },

  filterByType(type) {
    if (!type || type === "all") return getHistory();
    return getHistory().filter((h) => h.type === type);
  },

  formatTimeLabel,
};
