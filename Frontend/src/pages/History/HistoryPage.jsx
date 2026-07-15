import { useEffect, useState } from "react";
import { HelpCircle, StickyNote, Layers, BookOpen, Clock, Calendar } from "lucide-react";
import { historyService } from "../../services/historyService";
import PageHeader from "../../components/common/PageHeader";

function HistoryPage() {
  const [historyItems, setHistoryItems] = useState([]);
  const [filterType, setFilterType] = useState("all");

  function loadHistory() {
    setHistoryItems(historyService.filterByType(filterType));
  }

  useEffect(() => {
    loadHistory();
  }, [filterType]);

  const iconMap = {
    quiz: HelpCircle,
    note: StickyNote,
    flashcard: Layers,
    learning: BookOpen,
  };

  const colorMap = {
    quiz: "history-purple",
    note: "history-yellow",
    flashcard: "history-green",
    learning: "history-blue",
  };

  return (
    <div className="feature-page history-page">
      <PageHeader title="History" subtitle="Keep track of your study timeline, completed quizzes, and generated notes." />

      <div className="filters-row">
        <div className="filter-tabs">
          {["all", "learning", "quiz", "note", "flashcard"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`filter-tab ${filterType === tab ? "active" : ""}`}
              onClick={() => setFilterType(tab)}
            >
              {tab === "all" ? "All History" : tab === "learning" ? "Lessons" : tab === "quiz" ? "Quizzes" : tab === "note" ? "Notes" : "Flashcards"}
            </button>
          ))}
        </div>
      </div>

      <div className="history-timeline">
        {historyItems.map((item) => {
          const Icon = iconMap[item.type] || BookOpen;
          const formattedDate = new Date(item.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div key={item.id} className="history-timeline-item">
              <div className={`history-timeline-icon ${colorMap[item.type] || ""}`}>
                <Icon size={18} />
              </div>
              <div className="history-timeline-content">
                <div className="history-meta">
                  <span className="history-type">{item.type.toUpperCase()}</span>
                  <span className="history-time-ago">
                    <Clock size={12} /> {historyService.formatTimeLabel(item.date)}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <span className="history-timestamp">
                  <Calendar size={12} /> {formattedDate}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {historyItems.length === 0 && <p className="empty-state">No learning sessions found.</p>}
    </div>
  );
}

export default HistoryPage;
