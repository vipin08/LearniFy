import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, BookOpen, StickyNote, Layers, HelpCircle, ArrowRight } from "lucide-react";
import { searchService } from "../../services/searchService";
import PageHeader from "../../components/common/PageHeader";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState({ topics: [], notes: [], flashcards: [], quizzes: [] });

  useEffect(() => {
    if (query.trim()) {
      setResults(searchService.searchAll(query));
    }
  }, [query]);

  const totalResults =
    results.topics.length +
    results.notes.length +
    results.flashcards.length +
    results.quizzes.length;

  return (
    <div className="feature-page search-results-page">
      <PageHeader
        title={`Search Results`}
        subtitle={query ? `Found ${totalResults} items matching "${query}"` : "Enter a search query to search across the application."}
      />

      {query && totalResults > 0 ? (
        <div className="search-results-sections">
          {/* Topics */}
          {results.topics.length > 0 && (
            <div className="search-section">
              <h2>
                <BookOpen size={20} /> Course Topics ({results.topics.length})
              </h2>
              <div className="search-items-grid">
                {results.topics.map((t) => (
                  <Link key={t.id} to={`/learning/${t.id}`} className="search-result-item-card">
                    <div>
                      <span className="search-item-cat">{t.category}</span>
                      <h3>{t.title}</h3>
                      <p className="search-item-meta">{t.difficulty} • {t.progress}% complete</p>
                    </div>
                    <ArrowRight size={18} className="arrow-hover" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {results.notes.length > 0 && (
            <div className="search-section">
              <h2>
                <StickyNote size={20} /> Captured Notes ({results.notes.length})
              </h2>
              <div className="search-items-grid">
                {results.notes.map((n) => (
                  <Link key={n.id} to={`/notes/${n.id}`} className="search-result-item-card">
                    <div>
                      <span className="search-item-cat">{n.topic}</span>
                      <h3>{n.title}</h3>
                      <p className="search-item-excerpt">{n.content}</p>
                    </div>
                    <ArrowRight size={18} className="arrow-hover" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Flashcard Decks */}
          {results.flashcards.length > 0 && (
            <div className="search-section">
              <h2>
                <Layers size={20} /> Flashcard Decks ({results.flashcards.length})
              </h2>
              <div className="search-items-grid">
                {results.flashcards.map((f) => (
                  <Link key={f.id} to={`/flashcards/${f.id}`} className="search-result-item-card">
                    <div>
                      <span className="search-item-cat">{f.topic}</span>
                      <h3>{f.title}</h3>
                      <p className="search-item-meta">{f.cards.length} cards • {f.progress}% mastered</p>
                    </div>
                    <ArrowRight size={18} className="arrow-hover" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quizzes */}
          {results.quizzes.length > 0 && (
            <div className="search-section">
              <h2>
                <HelpCircle size={20} /> Quizzes ({results.quizzes.length})
              </h2>
              <div className="search-items-grid">
                {results.quizzes.map((q) => (
                  <Link key={q.id} to={`/quizzes/${q.id}`} className="search-result-item-card">
                    <div>
                      <span className="search-item-cat">{q.topic}</span>
                      <h3>{q.title}</h3>
                      <p className="search-item-meta">{q.questionCount} questions • {q.difficulty}</p>
                    </div>
                    <ArrowRight size={18} className="arrow-hover" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        query && <p className="empty-state">No matching topics, notes, flashcard decks, or quizzes were found.</p>
      )}
    </div>
  );
}

export default SearchPage;
