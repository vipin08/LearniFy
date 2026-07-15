import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, RefreshCw, Star, HelpCircle, Layers, CheckCircle } from "lucide-react";
import { flashcardService } from "../../services/flashcardService";
import { bookmarkService } from "../../services/bookmarkService";

function FlashcardDeckPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deck = flashcardService.getById(id);

  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionRatings, setSessionRatings] = useState({}); // { [cardId]: 'easy' | 'medium' | 'hard' }
  const [showResults, setShowResults] = useState(false);

  if (!deck) {
    return (
      <div className="feature-page">
        <p>Deck not found.</p>
        <Link to="/flashcards">Back to Decks</Link>
      </div>
    );
  }

  const isBookmarked = bookmarkService.isBookmarked("flashcard", deck.id);

  function toggleBookmark() {
    bookmarkService.toggle("flashcard", deck.id, deck.title);
    navigate(0);
  }

  function handleRateCard(rating) {
    const card = deck.cards[cardIndex];
    setSessionRatings({ ...sessionRatings, [card.id]: rating });

    if (cardIndex < deck.cards.length - 1) {
      setTimeout(() => {
        setIsFlipped(false);
        setCardIndex(cardIndex + 1);
      }, 200);
    } else {
      // Calculate progress percentage based on ratings
      // Easy = 100%, Medium = 60%, Hard = 30%
      const ratingsArray = Object.values({ ...sessionRatings, [card.id]: rating });
      const sum = ratingsArray.reduce((acc, r) => {
        if (r === "easy") return acc + 100;
        if (r === "medium") return acc + 60;
        return acc + 20;
      }, 0);
      const averageProgress = Math.round(sum / deck.cards.length);

      flashcardService.updateProgress(deck.id, averageProgress);
      setShowResults(true);
    }
  }

  function handlePrev() {
    if (cardIndex > 0) {
      setIsFlipped(false);
      setCardIndex(cardIndex - 1);
    }
  }

  function handleNext() {
    if (cardIndex < deck.cards.length - 1) {
      setIsFlipped(false);
      setCardIndex(cardIndex + 1);
    }
  }

  function restartSession() {
    setCardIndex(0);
    setIsFlipped(false);
    setSessionRatings({});
    setShowResults(false);
  }

  const currentCard = deck.cards[cardIndex];

  return (
    <div className="feature-page flashcard-deck-page">
      <Link to="/flashcards" className="back-link">
        ← Back to Decks
      </Link>

      <div className="deck-detail-header">
        <div>
          <span className="deck-topic-tag">{deck.topic}</span>
          <h1>{deck.title}</h1>
        </div>
        <button
          type="button"
          className={`icon-btn bookmark-btn ${isBookmarked ? "active" : ""}`}
          onClick={toggleBookmark}
          aria-label="Bookmark deck"
        >
          <Star size={20} fill={isBookmarked ? "#FFB800" : "none"} color={isBookmarked ? "#FFB800" : "#64748B"} />
        </button>
      </div>

      {showResults ? (
        <div className="deck-results-card">
          <CheckCircle size={60} color="#ff6b35" />
          <h2>Review Complete!</h2>
          <p>You've reviewed all {deck.cards.length} cards in this deck.</p>
          <div className="deck-results-summary">
            <div className="result-stat-item">
              <span className="stat-label">Total cards</span>
              <span className="stat-val">{deck.cards.length}</span>
            </div>
            <div className="result-stat-item">
              <span className="stat-label">New Mastery</span>
              <span className="stat-val text-orange">
                {flashcardService.getById(id)?.progress || 0}%
              </span>
            </div>
          </div>
          <div className="deck-results-actions">
            <button type="button" className="btn-secondary" onClick={restartSession}>
              <RefreshCw size={16} /> Study Again
            </button>
            <button type="button" className="btn-primary" onClick={() => navigate("/flashcards")}>
              All Decks
            </button>
          </div>
        </div>
      ) : (
        <div className="study-area-container">
          <div className="study-progress-info">
            <span>
              Card {cardIndex + 1} of {deck.cards.length}
            </span>
            <div className="deck-progress-bar-wrap">
              <div
                className="deck-progress-bar-fill"
                style={{ width: `${((cardIndex + 1) / deck.cards.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div
            className={`flashcard-scene ${isFlipped ? "flipped" : ""}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="flashcard-box">
              <div className="flashcard-face flashcard-front">
                <div className="face-label">Question</div>
                <div className="face-text">{currentCard?.question}</div>
                <div className="click-flip-hint">Click card to reveal answer</div>
              </div>
              <div className="flashcard-face flashcard-back">
                <div className="face-label">Answer</div>
                <div className="face-text">{currentCard?.answer}</div>
                <div className="click-flip-hint">Click card to show question</div>
              </div>
            </div>
          </div>

          <div className="deck-navigation-panel">
            <button
              type="button"
              className="btn-nav"
              onClick={handlePrev}
              disabled={cardIndex === 0}
            >
              <ChevronLeft size={20} /> Prev
            </button>

            {isFlipped ? (
              <div className="card-rating-buttons">
                <button
                  type="button"
                  className="rating-btn rating-hard"
                  onClick={() => handleRateCard("hard")}
                >
                  Hard
                </button>
                <button
                  type="button"
                  className="rating-btn rating-medium"
                  onClick={() => handleRateCard("medium")}
                >
                  Medium
                </button>
                <button
                  type="button"
                  className="rating-btn rating-easy"
                  onClick={() => handleRateCard("easy")}
                >
                  Easy
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn-primary reveal-card-btn"
                onClick={() => setIsFlipped(true)}
              >
                Reveal Answer
              </button>
            )}

            <button
              type="button"
              className="btn-nav"
              onClick={handleNext}
              disabled={cardIndex === deck.cards.length - 1}
            >
              Next <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlashcardDeckPage;
