import { getItem, setItem, STORAGE_KEYS } from "../utils/storage";
import { DEFAULT_NOTES } from "../data/mockData";
import { historyService } from "./historyService";

function getNotes() {
  const stored = getItem(STORAGE_KEYS.NOTES, null);
  if (!stored) {
    setItem(STORAGE_KEYS.NOTES, DEFAULT_NOTES);
    return DEFAULT_NOTES;
  }
  return stored;
}

function saveNotes(notes) {
  setItem(STORAGE_KEYS.NOTES, notes);
}

export const noteService = {
  getAll() {
    return getNotes();
  },

  getById(id) {
    return getNotes().find((n) => n.id === id) || null;
  },

  getRecent(limit = 3) {
    return getNotes().slice(0, limit);
  },

  create(data) {
    const notes = getNotes();
    const note = {
      id: `note-${Date.now()}`,
      title: data.title,
      content: data.content,
      topic: data.topic || "General",
      tags: data.tags || [],
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      favorite: false,
      color: data.color || "yellow",
    };
    notes.unshift(note);
    saveNotes(notes);
    historyService.add({ type: "note", title: `Created note: ${note.title}` });
    return note;
  },

  update(id, updates) {
    const notes = getNotes().map((n) => (n.id === id ? { ...n, ...updates } : n));
    saveNotes(notes);
    return notes.find((n) => n.id === id);
  },

  delete(id) {
    const notes = getNotes().filter((n) => n.id !== id);
    saveNotes(notes);
  },

  toggleFavorite(id) {
    const note = this.getById(id);
    if (note) return this.update(id, { favorite: !note.favorite });
    return null;
  },

  search(query) {
    const q = query.toLowerCase();
    return getNotes().filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.topic.toLowerCase().includes(q)
    );
  },
};
