import { getItem, setItem, STORAGE_KEYS } from "../utils/storage";

function getBookmarks() {
  return getItem(STORAGE_KEYS.BOOKMARKS, []);
}

function saveBookmarks(bookmarks) {
  setItem(STORAGE_KEYS.BOOKMARKS, bookmarks);
}

export const bookmarkService = {
  getAll() {
    return getBookmarks();
  },

  getByType(type) {
    return getBookmarks().filter((b) => b.type === type);
  },

  isBookmarked(type, itemId) {
    return getBookmarks().some((b) => b.type === type && b.itemId === itemId);
  },

  add(item) {
    const bookmarks = getBookmarks();
    if (bookmarks.some((b) => b.type === item.type && b.itemId === item.itemId)) {
      return bookmarks;
    }
    const bookmark = { id: `bm-${Date.now()}`, ...item, date: new Date().toISOString() };
    bookmarks.unshift(bookmark);
    saveBookmarks(bookmarks);
    return bookmarks;
  },

  remove(id) {
    saveBookmarks(getBookmarks().filter((b) => b.id !== id));
  },

  toggle(type, itemId, title) {
    const existing = getBookmarks().find((b) => b.type === type && b.itemId === itemId);
    if (existing) {
      this.remove(existing.id);
      return false;
    }
    this.add({ type, itemId, title });
    return true;
  },
};
