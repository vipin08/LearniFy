import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, Plus, Star, Trash2, Edit3, Bookmark, X, Save } from "lucide-react";
import { noteService } from "../../services/noteService";
import PageHeader from "../../components/common/PageHeader";

function NotesPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [filterFavorite, setFilterFavorite] = useState(false);
  const [selectedTag, setSelectedTag] = useState("All");

  // Form State for Create/Edit Modal
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formTopic, setFormTopic] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formColor, setFormColor] = useState("yellow");

  // Load notes
  function loadNotes() {
    setNotes(noteService.getAll());
  }

  useEffect(() => {
    loadNotes();
  }, []);

  // Handle URL Note ID (/notes/:id)
  useEffect(() => {
    if (id) {
      const note = noteService.getById(id);
      if (note) {
        openEdit(note);
      }
    }
  }, [id]);

  function handleSave(e) {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const tagsArray = formTags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    if (isEditMode) {
      noteService.update(currentNoteId, {
        title: formTitle.trim(),
        content: formContent.trim(),
        topic: formTopic.trim() || "General",
        tags: tagsArray,
        color: formColor,
      });
    } else {
      noteService.create({
        title: formTitle.trim(),
        content: formContent.trim(),
        topic: formTopic.trim() || "General",
        tags: tagsArray,
        color: formColor,
      });
    }

    closeModal();
    loadNotes();
    navigate("/notes"); // clear any note ID from path
  }

  function handleDelete(noteId, e) {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this note?")) {
      noteService.delete(noteId);
      loadNotes();
      if (id === noteId) {
        navigate("/notes");
      }
    }
  }

  function handleToggleFavorite(noteId, e) {
    e.stopPropagation();
    noteService.toggleFavorite(noteId);
    loadNotes();
  }

  function openCreate() {
    setIsEditMode(false);
    setCurrentNoteId(null);
    setFormTitle("");
    setFormContent("");
    setFormTopic("");
    setFormTags("");
    setFormColor("yellow");
    setShowModal(true);
  }

  function openEdit(note) {
    setIsEditMode(true);
    setCurrentNoteId(note.id);
    setFormTitle(note.title);
    setFormContent(note.content);
    setFormTopic(note.topic);
    setFormTags(note.tags.join(", "));
    setFormColor(note.color || "yellow");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    navigate("/notes");
  }

  // Get all unique tags for filter options
  const allTags = ["All", ...new Set(notes.flatMap((n) => n.tags || []))];

  // Filter notes based on filters
  const filtered = notes.filter((n) => {
    const matchSearch =
      !search ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()) ||
      n.topic.toLowerCase().includes(search.toLowerCase());
    const matchFavorite = !filterFavorite || n.favorite;
    const matchTag = selectedTag === "All" || n.tags.includes(selectedTag);
    return matchSearch && matchFavorite && matchTag;
  });

  return (
    <div className="feature-page notes-page">
      <div className="notes-header-row">
        <PageHeader title="Recent Notes" subtitle="Capture ideas, code snippets, and study key concepts." />
        <button type="button" className="btn-primary" onClick={openCreate}>
          <Plus size={18} /> Create Note
        </button>
      </div>

      <div className="filters-row">
        <div className="search-input-wrap">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          <button
            type="button"
            className={`filter-tab ${filterFavorite ? "active" : ""}`}
            onClick={() => setFilterFavorite(!filterFavorite)}
          >
            <Star size={16} fill={filterFavorite ? "#FFB800" : "none"} /> Favorites Only
          </button>
          
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="filter-select"
          >
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                Tag: {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="notes-grid">
        {filtered.map((note) => (
          <div
            key={note.id}
            className={`note-card note-card-${note.color || "yellow"}`}
            onClick={() => openEdit(note)}
          >
            <div className="note-card-header">
              <span className="note-topic-tag">{note.topic}</span>
              <div className="note-actions">
                <button
                  type="button"
                  onClick={(e) => handleToggleFavorite(note.id, e)}
                  className="note-action-btn favorite"
                >
                  <Star
                    size={16}
                    fill={note.favorite ? "#FFB800" : "none"}
                    color={note.favorite ? "#FFB800" : "#64748B"}
                  />
                </button>
                <button
                  type="button"
                  onClick={(e) => handleDelete(note.id, e)}
                  className="note-action-btn delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <h3>{note.title}</h3>
            <p className="note-excerpt">{note.content}</p>
            <div className="note-card-footer">
              <span className="note-date">{note.date}</span>
              <div className="note-tags-wrap">
                {note.tags.slice(0, 2).map((t) => (
                  <span key={t} className="note-tag">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <p className="empty-state">No notes found.</p>}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content note-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{isEditMode ? "Edit Note" : "Create Note"}</h2>
              <button type="button" className="close-btn" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="note-form">
              <div className="form-group">
                <label htmlFor="note-title">Title</label>
                <input
                  id="note-title"
                  type="text"
                  placeholder="Note Title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="note-topic">Topic</label>
                <input
                  id="note-topic"
                  type="text"
                  placeholder="e.g., JavaScript, React (optional)"
                  value={formTopic}
                  onChange={(e) => setFormTopic(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="note-tags">Tags (comma separated)</label>
                <input
                  id="note-tags"
                  type="text"
                  placeholder="e.g., arrays, functions, frontend"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Card Color</label>
                <div className="color-selectors">
                  {["yellow", "blue", "green"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`color-selector color-${c} ${formColor === c ? "selected" : ""}`}
                      onClick={() => setFormColor(c)}
                      aria-label={`${c} color`}
                    />
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="note-content">Content</label>
                <textarea
                  id="note-content"
                  placeholder="Write your note contents here..."
                  rows={8}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Save size={16} /> Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotesPage;
