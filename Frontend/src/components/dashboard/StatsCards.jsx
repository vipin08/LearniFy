import { BookOpen, Clock } from "lucide-react";
import { DASHBOARD_STATS } from "../../data/mockData";

const stats = [
  {
    label: "Topics Learned",
    value: DASHBOARD_STATS.topicsLearned,
    trend: `↑ ${DASHBOARD_STATS.topicsTrend}% this week`,
    icon: BookOpen,
    color: "purple",
  },
  {
    label: "Study Time",
    value: DASHBOARD_STATS.studyTime,
    trend: `↑ ${DASHBOARD_STATS.studyTrend}% this week`,
    icon: Clock,
    color: "green",
  },
];

function StatsCards() {
  return (
    <div className="stats-grid">
      {stats.map(({ label, value, trend, icon: Icon, color }) => (
        <div key={label} className="stat-card">
          <div className={`stat-icon stat-icon-${color}`}>
            <Icon size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{value}</span>
            <span className="stat-label">{label}</span>
            <span className={`stat-trend ${color === "green" || color === "purple" ? "trend-up" : ""}`}>{trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
