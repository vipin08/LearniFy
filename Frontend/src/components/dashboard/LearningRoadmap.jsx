import { Link } from "react-router-dom";
import { Check, Code2, Hexagon } from "lucide-react";

function RoadmapNode({ item }) {
  const { label, status } = item;

  if (status === "completed") {
    return (
      <div className="roadmap-node">
        <div className="roadmap-circle completed">
          <Check size={18} />
        </div>
        <span className="roadmap-label">{label}</span>
        <span className="roadmap-status completed-text">Completed</span>
      </div>
    );
  }

  if (status === "in-progress") {
    return (
      <div className="roadmap-node">
        <div className="roadmap-circle in-progress">
          <Code2 size={18} />
        </div>
        <span className="roadmap-label">{label}</span>
        <span className="roadmap-status in-progress-text">In Progress</span>
      </div>
    );
  }

  return (
    <div className="roadmap-node">
      <div className="roadmap-circle upcoming">
        <Hexagon size={16} />
      </div>
      <span className="roadmap-label">{label}</span>
      <span className="roadmap-status upcoming-text">Upcoming</span>
    </div>
  );
}

function LearningRoadmap({ items }) {
  return (
    <div className="dashboard-card roadmap-card">
      <div className="card-header">
        <h3>Your Learning Roadmap</h3>
        <Link to="/learning">View full roadmap →</Link>
      </div>
      <div className="roadmap-track">
        <div className="roadmap-line"></div>
        <div className="roadmap-nodes">
          {items.map((item) => (
            <RoadmapNode key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LearningRoadmap;
