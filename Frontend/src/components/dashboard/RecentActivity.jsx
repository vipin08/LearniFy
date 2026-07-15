import { Link } from "react-router-dom";
import { HelpCircle, StickyNote, Layers } from "lucide-react";

const iconMap = {
  quiz: HelpCircle,
  note: StickyNote,
  flashcard: Layers,
};

const colorMap = {
  purple: "activity-purple",
  orange: "activity-orange",
  green: "activity-green",
};

function RecentActivity({ items }) {
  return (
    <div className="dashboard-card activity-card">
      <div className="card-header">
        <h3>Recent Activity</h3>
        <Link to="/history">View all activity →</Link>
      </div>
      <div className="activity-list">
        {items.map((item) => {
          const Icon = iconMap[item.icon] || HelpCircle;
          return (
            <div key={item.id} className="activity-item">
              <div className={`activity-icon ${colorMap[item.color]}`}>
                <Icon size={16} />
              </div>
              <div className="activity-info">
                <p>{item.title}</p>
                <span>{item.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentActivity;
