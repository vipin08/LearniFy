import { useNavigate } from "react-router-dom";
import { HelpCircle, StickyNote, Layers, Bookmark } from "lucide-react";

const actions = [
  { label: "Take Quiz", icon: HelpCircle, color: "pink", path: "/quizzes" },
  { label: "Add Note", icon: StickyNote, color: "yellow", path: "/notes", state: { openCreate: true } },
  { label: "New Flashcard", icon: Layers, color: "green", path: "/flashcards", state: { openCreate: true } },
  { label: "Bookmark", icon: Bookmark, color: "purple", path: "/bookmarks" },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-card quick-actions-card">
      <h3>Quick Actions</h3>
      <div className="quick-actions-grid">
        {actions.map(({ label, icon: Icon, color, path, state }) => (
          <button
            key={label}
            type="button"
            className={`quick-action-btn quick-${color}`}
            onClick={() => navigate(path, { state })}
          >
            <Icon size={22} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
