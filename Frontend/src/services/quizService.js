import { getItem, setItem, STORAGE_KEYS } from "../utils/storage";
import { QUIZZES } from "../data/mockData";
import { historyService } from "./historyService";
import { authService } from "./authService";

function getResults() {
  return getItem(STORAGE_KEYS.QUIZ_RESULTS, []);
}

function saveResults(results) {
  setItem(STORAGE_KEYS.QUIZ_RESULTS, results);
}

export const quizService = {
  getAll() {
    return QUIZZES;
  },

  getById(id) {
    return QUIZZES.find((q) => q.id === id) || null;
  },

  getResults() {
    return getResults();
  },

  getPreviousScore(quizId) {
    const results = getResults().filter((r) => r.quizId === quizId);
    if (!results.length) return null;
    return results[results.length - 1].score;
  },

  submitQuiz(quizId, answers) {
    const quiz = this.getById(quizId);
    if (!quiz) return null;

    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });

    const total = quiz.questions.length;
    const score = Math.round((correct / total) * 100);
    const starsEarned = Math.round(score / 10);

    const result = {
      id: `result-${Date.now()}`,
      quizId,
      quizTitle: quiz.title,
      score,
      correct,
      wrong: total - correct,
      total,
      starsEarned,
      date: new Date().toISOString(),
    };

    const results = getResults();
    results.push(result);
    saveResults(results);

    const user = authService.getCurrentUser();
    authService.updateProfile({ stars: (user.stars || 0) + starsEarned });

    historyService.add({ type: "quiz", title: `Completed quiz on ${quiz.title}` });

    return result;
  },

  search(query) {
    const q = query.toLowerCase();
    return QUIZZES.filter(
      (quiz) => quiz.title.toLowerCase().includes(q) || quiz.topic.toLowerCase().includes(q)
    );
  },
};
