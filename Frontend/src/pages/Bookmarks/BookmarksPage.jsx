import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, Trash2, BookOpen, Layers, StickyNote, ExternalLink } from "lucide-react";
import { bookmarkService } from "../../services/bookmarkService";
import PageHeader from "../../components/common/PageHeader";

function BookmarksPage() {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [filterType, setFilterType] = useState("all");

  function loadBookmarks() {
    setBookmarks(bookmarkService.getAll());
  }

  useEffect(() => {
    loadBookmarks();
  }, []);

  function handleRemove(id, e) {
    e.stopPropagation();
    if (window.confirm("Remove this bookmark?")) {
      bookmarkService.remove(id);
      loadBookmarks();
    }
  }

  function handleOpenItem(bookmark) {
    if (bookmark.type === "learning") {
      navigate(`/learning/${bookmark.itemId}`);
    } else if (bookmark.type === "note") {
      navigate(`/notes/${bookmark.itemId}`);
    } else if (bookmark.type === "flashcard") {
      navigate(`/flashcards/${bookmark.itemId}`);
    }
  }

  const filtered = bookmarks.filter((b) => filterType === "all" || b.type === filterType);

  const iconMap = {
    learning: BookOpen,
    note: StickyNote,
    flashcard: Layers,
  };

  const colorMap = {
    learning: "badge-purple",
    note: "badge-yellow",
    flashcard: "badge-green",
  };

  return (
    <div className="feature-page bookmarks-page">
      <PageHeader title="Bookmarks" subtitle="Quick access to saved lessons, flashcard decks, and note captures." />

      <div className="filters-row">
        <div className="filter-tabs">
          {["all", "learning", "note", "flashcard"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`filter-tab ${filterType === tab ? "active" : ""}`}
              onClick={() => setFilterType(tab)}
            >
              {tab === "all" ? "All Bookmarks" : tab === "learning" ? "Lessons" : tab === "note" ? "Notes" : "Flashcards"}
            </button>
          ))}
        </div>
      </div>

      <div className="bookmarks-grid">
        {filtered.map((bm) => {
          const Icon = iconMap[bm.type] || BookOpen;
          return (
            <div key={bm.id} className="bookmark-card" onClick={() => handleOpenItem(bm)}>
              <div className="bookmark-card-header">
                <span className={`type-badge ${colorMap[bm.type]}`}>
                  {bm.type.replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
                <button
                  type="button"
                  onClick={(e) => handleRemove(bm.id, e)}
                  className="bookmark-delete-btn"
                  aria-label="Remove bookmark"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="bookmark-card-body">
                <div className="bookmark-icon-wrap">
                  <Icon size={22} />
                </div>
                <h3>{bm.title}</h3>
                <span className="bookmark-added-date">
                  Saved on {new Date(bm.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>

              <div className="bookmark-card-footer">
                <button type="button" className="btn-secondary-sm open-item-btn" onClick={() => handleOpenItem(bm)}>
                  Open Item <ExternalLink size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && <p className="empty-state">No bookmarks found.</p>}
    </div>
  );
}

export default BookmarksPage;
