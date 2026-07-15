import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import ProgressBar from "../../components/common/ProgressBar";
import { learningService } from "../../services/learningService";

const filters = ["all", "in-progress", "completed", "upcoming"];

function LearningPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const topics = learningService.getAllTopics();

  const filtered = topics.filter((t) => {
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    const matchSearch =
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="feature-page">
      <PageHeader title="My Learning" subtitle="Track your courses and continue where you left off." />

      <div className="filters-row">
        <div className="search-input-wrap">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`filter-tab ${statusFilter === f ? "active" : ""}`}
              onClick={() => setStatusFilter(f)}
            >
              {f === "all" ? "All" : f.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      <div className="learning-grid">
        {filtered.map((topic) => (
          <div key={topic.id} className="learning-topic-card">
            <div className="topic-card-header">
              <span className={`status-badge status-${topic.status}`}>
                {topic.status.replace("-", " ")}
              </span>
              <span className="topic-category">{topic.category}</span>
            </div>
            <h3>{topic.title}</h3>
            <p className="topic-difficulty">{topic.difficulty}</p>
            <ProgressBar value={topic.progress} />
            <div className="topic-progress-text">{topic.progress}% complete</div>
            <Link to={`/learning/${topic.id}`} className="btn-primary-sm">
              {topic.status === "completed" ? "Review" : "Continue Learning"}
            </Link>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <p className="empty-state">No topics found.</p>}
    </div>
  );
}

export default LearningPage;
