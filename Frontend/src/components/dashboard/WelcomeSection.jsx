import { useNavigate } from "react-router-dom";
import { Plus, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import welcomeStudents from "../../assets/welcome_students.png";

function WelcomeSection() {
  return (
    <div className="welcome-section">
      <div className="welcome-illustration">
        <img
          src={welcomeStudents}
          alt="Students study group"
          className="welcome-illustration-img"
        />
      </div>
    </div>
  );
}

export function StartLearningCard() {
  const navigate = useNavigate();

  return (
    <button type="button" className="action-card start-learning-card" onClick={() => navigate("/learn/new")}>
      <div className="action-card-icon">
        <Plus size={24} />
      </div>
      <div className="action-card-content">
        <h3>Start Learning</h3>
        <p>Pick a topic, choose a category and let AI create the perfect learning experience for you.</p>
      </div>
      <div className="action-card-arrow">
        <ArrowRight size={20} />
      </div>
    </button>
  );
}

export function ContinueLearningCard({ learning }) {
  const navigate = useNavigate();

  if (!learning) return null;

  return (
    <div className="action-card continue-learning-card">
      <div className="continue-icon">⚛️</div>
      <div className="action-card-content">
        <h3>Continue Learning</h3>
        <p className="continue-topic">{learning.title}</p>
        <div className="continue-progress">
          <div className="progress-bar thin">
            <div className="progress-fill progress-orange" style={{ width: `${learning.progress}%` }}></div>
          </div>
          <span>{learning.progress}%</span>
        </div>
      </div>
      <button
        type="button"
        className="btn-continue"
        onClick={() => navigate(`/learning/${learning.topicId || learning.id}`)}
      >
        Continue
      </button>
    </div>
  );
}

export default WelcomeSection;
