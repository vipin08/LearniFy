export function getItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

export const STORAGE_KEYS = {
  NOTES: "learnify_notes",
  FLASHCARDS: "learnify_flashcards",
  BOOKMARKS: "learnify_bookmarks",
  SETTINGS: "learnify_settings",
  QUIZ_RESULTS: "learnify_quiz_results",
  LEARNING_PROGRESS: "learnify_learning_progress",
  HISTORY: "learnify_history",
  NOTIFICATIONS: "learnify_notifications",
  USER: "learnify_user",
  CUSTOM_TOPICS: "learnify_custom_topics",
};
