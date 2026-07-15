import { getItem, setItem, STORAGE_KEYS } from "../utils/storage";
import { DEFAULT_FLASHCARD_DECKS } from "../data/mockData";
import { historyService } from "./historyService";

function getDecks() {
  const stored = getItem(STORAGE_KEYS.FLASHCARDS, null);
  if (!stored) {
    setItem(STORAGE_KEYS.FLASHCARDS, DEFAULT_FLASHCARD_DECKS);
    return DEFAULT_FLASHCARD_DECKS;
  }
  return stored;
}

function saveDecks(decks) {
  setItem(STORAGE_KEYS.FLASHCARDS, decks);
}

export const flashcardService = {
  getAll() {
    return getDecks();
  },

  getById(id) {
    return getDecks().find((d) => d.id === id) || null;
  },

  create(data) {
    const decks = getDecks();
    const deck = {
      id: `deck-${Date.now()}`,
      title: data.title,
      topic: data.topic || "General",
      progress: 0,
      cards: data.cards || [{ id: "fc1", question: "Sample question?", answer: "Sample answer." }],
    };
    decks.unshift(deck);
    saveDecks(decks);
    return deck;
  },

  delete(id) {
    saveDecks(getDecks().filter((d) => d.id !== id));
  },

  updateProgress(id, progress) {
    const decks = getDecks().map((d) => (d.id === id ? { ...d, progress } : d));
    saveDecks(decks);
    historyService.add({ type: "flashcard", title: `Reviewed flashcards ${decks.find((d) => d.id === id)?.title}` });
    return decks.find((d) => d.id === id);
  },

  addCard(deckId, card) {
    const decks = getDecks().map((d) => {
      if (d.id !== deckId) return d;
      return { ...d, cards: [...d.cards, { id: `fc-${Date.now()}`, ...card }] };
    });
    saveDecks(decks);
    return decks.find((d) => d.id === deckId);
  },

  search(query) {
    const q = query.toLowerCase();
    return getDecks().filter(
      (d) => d.title.toLowerCase().includes(q) || d.topic.toLowerCase().includes(q)
    );
  },
};
