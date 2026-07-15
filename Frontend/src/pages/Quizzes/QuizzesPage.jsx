import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HelpCircle, Star, Award, ChevronRight, Play } from "lucide-react";
import { quizService } from "../../services/quizService";
import PageHeader from "../../components/common/PageHeader";

function QuizzesPage() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Load quizzes, with actual scores loaded from storage
    const loaded = quizService.getAll().map((quiz) => {
      const score = quizService.getPreviousScore(quiz.id);
      return { ...quiz, previousScore: score };
    });
    setQuizzes(loaded);
  }, []);

  return (
    <div className="feature-page quizzes-page">
      <PageHeader
        title="Quizzes"
        subtitle="Challenge your understanding, gain points, and unlock stars."
      />

      <div className="quizzes-grid">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-card">
            <div className="quiz-card-header">
              <span className="quiz-topic-tag">{quiz.topic}</span>
              <span className={`quiz-difficulty-tag diff-${quiz.difficulty.toLowerCase()}`}>
                {quiz.difficulty}
              </span>
            </div>

            <div className="quiz-card-body">
              <div className="quiz-icon-wrapper">
                <HelpCircle size={24} />
              </div>
              <h3>{quiz.title}</h3>
              <p className="quiz-q-count">{quiz.questionCount} Questions</p>
            </div>

            <div className="quiz-card-footer">
              <div className="quiz-score-indicator">
                {quiz.previousScore !== null ? (
                  <div className="quiz-score-badge">
                    <Award size={14} />
                    <span>Best: {quiz.previousScore}%</span>
                  </div>
                ) : (
                  <span className="quiz-unplayed">Not attempted</span>
                )}
              </div>
              
              <button
                type="button"
                className="btn-primary-sm quiz-start-btn"
                onClick={() => navigate(`/quizzes/${quiz.id}`)}
              >
                <Play size={12} fill="white" /> Start
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizzesPage;
