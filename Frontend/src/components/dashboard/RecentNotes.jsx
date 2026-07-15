import { Link } from "react-router-dom";
import { Star, StickyNote } from "lucide-react";

const colorMap = {
  yellow: "note-yellow",
  blue: "note-blue",
  green: "note-green",
};

function RecentNotes({ notes }) {
  return (
    <div className="dashboard-card notes-card">
      <div className="card-header">
        <h3>Recent Notes</h3>
        <Link to="/notes">View all notes →</Link>
      </div>
      <div className="recent-notes-grid">
        {notes.map((note) => (
          <Link key={note.id} to={`/notes/${note.id}`} className={`recent-note-item ${colorMap[note.color]}`}>
            <div className="recent-note-icon">
              <StickyNote size={20} />
            </div>
            <h4>{note.title}</h4>
            <span className="recent-note-date">{note.date}</span>
            {note.favorite && (
              <Star size={14} fill="#FFB800" color="#FFB800" className="recent-note-star" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecentNotes;
