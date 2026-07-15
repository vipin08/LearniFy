import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";

// Unprotected Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Protected Pages
import DashboardPage from "./pages/Dashboard/DashboardPage";
import LearningPage from "./pages/Learning/LearningPage";
import LearningDetailPage from "./pages/Learning/LearningDetailPage";
import LearnNewPage from "./pages/Learning/LearnNewPage";
import NotesPage from "./pages/Notes/NotesPage";
import FlashcardsPage from "./pages/Flashcards/FlashcardsPage";
import FlashcardDeckPage from "./pages/Flashcards/FlashcardDeckPage";
import QuizzesPage from "./pages/Quizzes/QuizzesPage";
import QuizPlayPage from "./pages/Quizzes/QuizPlayPage";
import BookmarksPage from "./pages/Bookmarks/BookmarksPage";
import HistoryPage from "./pages/History/HistoryPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import SearchPage from "./pages/Search/SearchPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes (Dashboard Shell) */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/learning/:id" element={<LearningDetailPage />} />
            <Route path="/learn/new" element={<LearnNewPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/notes/:id" element={<NotesPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/flashcards/:id" element={<FlashcardDeckPage />} />
            <Route path="/quizzes" element={<QuizzesPage />} />
            <Route path="/quizzes/:id" element={<QuizPlayPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
