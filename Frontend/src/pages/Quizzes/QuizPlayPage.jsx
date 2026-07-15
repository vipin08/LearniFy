import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check, X, Award, Star, RotateCcw } from "lucide-react";
import { quizService } from "../../services/quizService";
import ProgressBar from "../../components/common/ProgressBar";

function QuizPlayPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const quiz = quizService.getById(id);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionIdx]: selectedOptionIdx }
  const [result, setResult] = useState(null);

  if (!quiz) {
    return (
      <div className="feature-page">
        <p>Quiz not found.</p>
        <Link to="/quizzes">Back to Quizzes</Link>
      </div>
    );
  }

  function handleSelectOption(optionIdx) {
    setAnswers({ ...answers, [currentIdx]: optionIdx });
  }

  function handlePrev() {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  }

  function handleNext() {
    if (currentIdx < quiz.questions.length - 1) setCurrentIdx(currentIdx + 1);
  }

  function handleSubmit() {
    // Fill unselected answers as null
    const finalAnswers = {};
    quiz.questions.forEach((_, idx) => {
      finalAnswers[idx] = answers[idx] !== undefined ? answers[idx] : null;
    });

    const submitResult = quizService.submitQuiz(quiz.id, finalAnswers);
    setResult(submitResult);
  }

  function handleRestart() {
    setCurrentIdx(0);
    setAnswers({});
    setResult(null);
  }

  const currentQuestion = quiz.questions[currentIdx];
  const isLastQuestion = currentIdx === quiz.questions.length - 1;
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = quiz.questions.length;

  return (
    <div className="feature-page quiz-play-page">
      <Link to="/quizzes" className="back-link">
        ← Back to Quizzes
      </Link>

      <div className="quiz-header-row">
        <div>
          <span className="quiz-topic-tag">{quiz.topic}</span>
          <h1>{quiz.title}</h1>
        </div>
      </div>

      {result ? (
        <div className="quiz-results-card">
          <div className="results-top">
            <Award className="award-gold" size={60} />
            <h2>Quiz Results!</h2>
            <div className="results-percentage">{result.score}%</div>
            <p className="stars-awarded-text">
              <Star size={16} fill="#FFB800" color="#FFB800" />
              <span>You earned {result.starsEarned} stars!</span>
            </p>
          </div>

          <div className="results-grid-stats">
            <div className="result-stat-card stat-correct">
              <span className="stat-label">Correct Answers</span>
              <span className="stat-val">{result.correct}</span>
            </div>
            <div className="result-stat-card stat-wrong">
              <span className="stat-label">Wrong Answers</span>
              <span className="stat-val">{result.wrong}</span>
            </div>
            <div className="result-stat-card stat-total">
              <span className="stat-label">Total Questions</span>
              <span className="stat-val">{result.total}</span>
            </div>
          </div>

          <div className="quiz-answers-review">
            <h3>Review Questions</h3>
            <div className="questions-review-list">
              {quiz.questions.map((q, idx) => {
                const userAnswer = answers[idx];
                const isCorrect = userAnswer === q.correct;
                return (
                  <div key={q.id} className={`question-review-item ${isCorrect ? "correct" : "incorrect"}`}>
                    <div className="review-q-header">
                      <span className="review-q-num">Q{idx + 1}.</span>
                      <p>{q.question}</p>
                      {isCorrect ? (
                        <Check className="icon-correct" size={18} />
                      ) : (
                        <X className="icon-incorrect" size={18} />
                      )}
                    </div>
                    <div className="review-q-options">
                      {q.options.map((opt, oIdx) => {
                        let optClass = "";
                        if (oIdx === q.correct) optClass = "correct-opt";
                        else if (oIdx === userAnswer && !isCorrect) optClass = "wrong-opt";

                        return (
                          <div key={opt} className={`review-opt-bubble ${optClass}`}>
                            {opt}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="results-actions">
            <button type="button" className="btn-secondary" onClick={handleRestart}>
              <RotateCcw size={16} /> Retake Quiz
            </button>
            <button type="button" className="btn-primary" onClick={() => navigate("/quizzes")}>
              Finish
            </button>
          </div>
        </div>
      ) : (
        <div className="quiz-play-container">
          <div className="quiz-progress-section">
            <div className="progress-info">
              <span>
                Question {currentIdx + 1} of {totalQuestions}
              </span>
              <span>
                {answeredCount} of {totalQuestions} answered
              </span>
            </div>
            <ProgressBar value={((currentIdx + 1) / totalQuestions) * 100} />
          </div>

          <div className="quiz-question-box">
            <h2>{currentQuestion.question}</h2>
            <div className="quiz-options-list">
              {currentQuestion.options.map((option, index) => {
                const isSelected = answers[currentIdx] === index;
                return (
                  <button
                    key={option}
                    type="button"
                    className={`quiz-option-button ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSelectOption(index)}
                  >
                    <span className="option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="option-text">{option}</span>
                    {isSelected && <div className="selected-dot" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="quiz-navigation-panel">
            <button
              type="button"
              className="btn-nav"
              onClick={handlePrev}
              disabled={currentIdx === 0}
            >
              <ChevronLeft size={18} /> Previous
            </button>

            {isLastQuestion ? (
              <button type="button" className="btn-primary btn-submit-quiz" onClick={handleSubmit}>
                Submit Quiz
              </button>
            ) : (
              <button type="button" className="btn-nav" onClick={handleNext}>
                Next <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPlayPage;
