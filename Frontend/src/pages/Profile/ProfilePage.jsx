import { Link } from "react-router-dom";
import { Star, Award, BookOpen, StickyNote, Layers, Bookmark, Edit, Calendar } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { noteService } from "../../services/noteService";
import { bookmarkService } from "../../services/bookmarkService";
import { flashcardService } from "../../services/flashcardService";
import { quizService } from "../../services/quizService";
import PageHeader from "../../components/common/PageHeader";

function ProfilePage() {
  const { user } = useAuth();
  
  // Calculate summary counts
  const totalNotes = noteService.getAll().length;
  const totalBookmarks = bookmarkService.getAll().length;
  const totalDecks = flashcardService.getAll().length;
  const totalQuizRuns = quizService.getResults().length;

  return (
    <div className="feature-page profile-page">
      <div className="profile-header-row">
        <PageHeader title="My Profile" subtitle="Manage your dashboard identity and view your performance indicators." />
        <Link to="/settings" className="btn-secondary">
          <Edit size={16} /> Edit Profile
        </Link>
      </div>

      <div className="profile-container-grid">
        <div className="profile-identity-card">
          <div className="avatar-shield">
            <img src={user?.avatar} alt={user?.name} className="profile-main-avatar" />
            <div className="avatar-rank-badge">
              <Award size={18} fill="white" />
            </div>
          </div>
          <h2>{user?.name}</h2>
          <p className="profile-email">{user?.email}</p>

          <div className="profile-stars-counter-card">
            <Star size={24} fill="#FFB800" color="#FFB800" />
            <div className="val-lbl">
              <span className="star-val">{user?.stars ?? 320}</span>
              <span className="star-lbl">XP Stars Earned</span>
            </div>
          </div>
        </div>

        <div className="profile-stats-dashboard-card">
          <h3>Achievements Summary</h3>
          <div className="profile-stats-grid">
            <div className="profile-stat-box">
              <div className="stat-icon-wrap icon-purple">
                <BookOpen size={20} />
              </div>
              <div className="stat-details">
                <span className="val">{totalQuizRuns}</span>
                <span className="lbl">Quizzes Attempted</span>
              </div>
            </div>

            <div className="profile-stat-box">
              <div className="stat-icon-wrap icon-yellow">
                <StickyNote size={20} />
              </div>
              <div className="stat-details">
                <span className="val">{totalNotes}</span>
                <span className="lbl">Notes Captured</span>
              </div>
            </div>

            <div className="profile-stat-box">
              <div className="stat-icon-wrap icon-green">
                <Layers size={20} />
              </div>
              <div className="stat-details">
                <span className="val">{totalDecks}</span>
                <span className="lbl">Flashcard Decks</span>
              </div>
            </div>

            <div className="profile-stat-box">
              <div className="stat-icon-wrap icon-blue">
                <Bookmark size={20} />
              </div>
              <div className="stat-details">
                <span className="val">{totalBookmarks}</span>
                <span className="lbl">Saved Bookmarks</span>
              </div>
            </div>
          </div>

          <div className="profile-joined-card">
            <Calendar size={16} />
            <span>Member since May 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
