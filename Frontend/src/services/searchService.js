import { learningService } from "./learningService";
import { noteService } from "./noteService";
import { flashcardService } from "./flashcardService";
import { quizService } from "./quizService";

export const searchService = {
  searchAll(query) {
    if (!query.trim()) return { topics: [], notes: [], flashcards: [], quizzes: [] };
    return {
      topics: learningService.searchTopics(query),
      notes: noteService.search(query),
      flashcards: flashcardService.search(query),
      quizzes: quizService.search(query),
    };
  },
};
