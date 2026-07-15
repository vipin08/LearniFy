import WelcomeSection, { StartLearningCard, ContinueLearningCard } from "../../components/dashboard/WelcomeSection";
import LearningRoadmap from "../../components/dashboard/LearningRoadmap";
import RecentActivity from "../../components/dashboard/RecentActivity";
import RecentNotes from "../../components/dashboard/RecentNotes";
import QuickActions from "../../components/dashboard/QuickActions";
import { learningService } from "../../services/learningService";
import { noteService } from "../../services/noteService";
import { historyService } from "../../services/historyService";
import { RECENT_ACTIVITY } from "../../data/mockData";

function DashboardPage() {
  const currentLearning = learningService.getCurrentLearning();
  const roadmap = learningService.getRoadmap();
  const recentNotes = noteService.getRecent(3);
  const recentActivity = historyService.getRecent(3).map((item, i) => ({
    ...RECENT_ACTIVITY[i],
    id: item.id,
    title: item.title,
    time: item.timeLabel,
  }));

  return (
    <div className="dashboard-page">
      <WelcomeSection />

      <div className="action-cards-row">
        <StartLearningCard />
        <ContinueLearningCard learning={currentLearning} />
      </div>

      <div className="dashboard-grid">
        <LearningRoadmap items={roadmap} />
        <RecentActivity items={recentActivity.length ? recentActivity : RECENT_ACTIVITY} />
      </div>

      <div className="dashboard-grid bottom-grid">
        <RecentNotes notes={recentNotes} />
        <QuickActions />
      </div>
    </div>
  );
}

export default DashboardPage;
