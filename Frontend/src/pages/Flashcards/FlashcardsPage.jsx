import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, BookOpen, Layers, X, Save, ArrowRight } from "lucide-react";
import { flashcardService } from "../../services/flashcardService";
import PageHeader from "../../components/common/PageHeader";
import ProgressBar from "../../components/common/ProgressBar";

function FlashcardsPage() {
  const navigate = useNavigate();
  const [decks, setDecks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // New deck form states
  const [deckTitle, setDeckTitle] = useState("");
  const [deckTopic, setDeckTopic] = useState("");
  const [cards, setCards] = useState([{ question: "", answer: "" }]);

  function loadDecks() {
    setDecks(flashcardService.getAll());
  }

  useEffect(() => {
    loadDecks();
  }, []);

  function handleCreateDeck(e) {
    e.preventDefault();
    if (!deckTitle.trim()) return;

    // Filter out blank cards
    const validCards = cards
      .filter((c) => c.question.trim() !== "" && c.answer.trim() !== "")
      .map((c, i) => ({ id: `fc-${Date.now()}-${i}`, question: c.question.trim(), answer: c.answer.trim() }));

    if (validCards.length === 0) {
      alert("Please add at least one question and answer card.");
      return;
    }

    flashcardService.create({
      title: deckTitle.trim(),
      topic: deckTopic.trim() || "General",
      cards: validCards,
    });

    closeModal();
    loadDecks();
  }

  function handleDeleteDeck(deckId, e) {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this deck?")) {
      flashcardService.delete(deckId);
      loadDecks();
    }
  }

  function openCreate() {
    setDeckTitle("");
    setDeckTopic("");
    setCards([{ question: "", answer: "" }]);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function addCardInput() {
    setCards([...cards, { question: "", answer: "" }]);
  }

  function removeCardInput(index) {
    setCards(cards.filter((_, i) => i !== index));
  }

  function handleCardChange(index, field, value) {
    const updated = cards.map((c, i) => {
      if (i === index) {
        return { ...c, [field]: value };
      }
      return c;
    });
    setCards(updated);
  }

  return (
    <div className="feature-page flashcards-page">
      <div className="flashcards-header-row">
        <PageHeader title="Flashcards" subtitle="Revise vocabulary, definitions, and code syntaxes with smart spaced repetition." />
        <button type="button" className="btn-primary" onClick={openCreate}>
          <Plus size={18} /> Create Deck
        </button>
      </div>

      <div className="decks-grid">
        {decks.map((deck) => (
          <div
            key={deck.id}
            className="deck-card"
            onClick={() => navigate(`/flashcards/${deck.id}`)}
          >
            <div className="deck-card-header">
              <span className="deck-topic-tag">{deck.topic}</span>
              <button
                type="button"
                onClick={(e) => handleDeleteDeck(deck.id, e)}
                className="deck-delete-btn"
                aria-label="Delete deck"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="deck-card-body">
              <div className="deck-icon-wrapper">
                <Layers size={24} />
              </div>
              <h3>{deck.title}</h3>
              <p className="deck-card-count">{deck.cards?.length || 0} cards</p>
            </div>

            <div className="deck-card-footer">
              <div className="deck-progress-section">
                <span>Mastered</span>
                <ProgressBar value={deck.progress || 0} />
                <span className="deck-pct">{deck.progress || 0}%</span>
              </div>
              <button
                type="button"
                className="btn-primary-sm deck-study-btn"
                onClick={() => navigate(`/flashcards/${deck.id}`)}
              >
                Study <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {decks.length === 0 && <p className="empty-state">No flashcard decks found.</p>}

      {/* Create Deck Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content deck-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Deck</h2>
              <button type="button" className="close-btn" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateDeck} className="deck-form">
              <div className="form-row">
                <div className="form-group flex-2">
                  <label htmlFor="deck-title-input">Deck Title</label>
                  <input
                    id="deck-title-input"
                    type="text"
                    placeholder="e.g., JavaScript Array Functions"
                    value={deckTitle}
                    onChange={(e) => setDeckTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group flex-1">
                  <label htmlFor="deck-topic-input">Topic / Subject</label>
                  <input
                    id="deck-topic-input"
                    type="text"
                    placeholder="e.g., JavaScript"
                    value={deckTopic}
                    onChange={(e) => setDeckTopic(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-cards-list-section">
                <h3>Cards</h3>
                <div className="modal-cards-list">
                  {cards.map((card, index) => (
                    <div key={index} className="card-input-row">
                      <span className="card-input-number">{index + 1}</span>
                      <div className="card-input-fields">
                        <input
                          type="text"
                          placeholder="Front (Question)"
                          value={card.question}
                          onChange={(e) => handleCardChange(index, "question", e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Back (Answer)"
                          value={card.answer}
                          onChange={(e) => handleCardChange(index, "answer", e.target.value)}
                          required
                        />
                      </div>
                      {cards.length > 1 && (
                        <button
                          type="button"
                          className="remove-card-btn"
                          onClick={() => removeCardInput(index)}
                          aria-label="Remove card"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button type="button" className="btn-secondary-sm add-card-row-btn" onClick={addCardInput}>
                  <Plus size={14} /> Add Card
                </button>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Save size={16} /> Save Deck
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlashcardsPage;
