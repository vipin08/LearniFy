import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useClickOutside } from "../../hooks/useClickOutside";

function SearchSuggestions({ results, query, onSelect, onClose, parentRef }) {
  const ref = useRef(null);
  useClickOutside(parentRef, onClose);

  const navigate = useNavigate();
  const hasResults =
    results &&
    (results.topics.length ||
      results.notes.length ||
      results.flashcards.length ||
      results.quizzes.length);

  function goTo(path) {
    navigate(path);
    onSelect();
  }

  function goToSearch() {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    onSelect();
  }

  if (!hasResults) {
    return (
      <div className="search-suggestions" ref={ref}>
        <p className="suggestion-empty">No results for "{query}"</p>
        <button type="button" className="suggestion-view-all" onClick={goToSearch}>
          View all search results
        </button>
      </div>
    );
  }

  return (
    <div className="search-suggestions" ref={ref}>
      {results.topics.slice(0, 3).map((t) => (
        <button key={t.id} type="button" className="suggestion-item" onClick={() => goTo(`/learning/${t.id}`)}>
          <span className="suggestion-type">Topic</span>
          {t.title}
        </button>
      ))}
      {results.notes.slice(0, 3).map((n) => (
        <button key={n.id} type="button" className="suggestion-item" onClick={() => goTo(`/notes/${n.id}`)}>
          <span className="suggestion-type">Note</span>
          {n.title}
        </button>
      ))}
      {results.flashcards.slice(0, 2).map((f) => (
        <button key={f.id} type="button" className="suggestion-item" onClick={() => goTo(`/flashcards/${f.id}`)}>
          <span className="suggestion-type">Deck</span>
          {f.title}
        </button>
      ))}
      {results.quizzes.slice(0, 2).map((q) => (
        <button key={q.id} type="button" className="suggestion-item" onClick={() => goTo(`/quizzes/${q.id}`)}>
          <span className="suggestion-type">Quiz</span>
          {q.title}
        </button>
      ))}
      <button type="button" className="suggestion-view-all" onClick={goToSearch}>
        View all results for "{query}"
      </button>
    </div>
  );
}

export default SearchSuggestions;
