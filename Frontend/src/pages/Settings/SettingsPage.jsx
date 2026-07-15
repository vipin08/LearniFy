import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings, Bell, Palette, LogOut, Save } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { settingsService } from "../../services/settingsService";
import PageHeader from "../../components/common/PageHeader";

const AVATAR_OPTIONS = [
  "/avatars/1.png",
  "/avatars/2.jpg",
  "/avatars/3.jpg",
  "/avatars/4.png",
];

function SettingsPage() {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  // Load current settings
  const currentSettings = settingsService.get();

  // Form states
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || AVATAR_OPTIONS[0]);

  const [difficulty, setDifficulty] = useState(currentSettings.learning.difficulty);
  const [style, setStyle] = useState(currentSettings.learning.style);
  const [dailyGoal, setDailyGoal] = useState(currentSettings.learning.dailyGoal);

  const [studyReminders, setStudyReminders] = useState(currentSettings.notifications.studyReminders);
  const [streakReminders, setStreakReminders] = useState(currentSettings.notifications.streakReminders);
  const [learningUpdates, setLearningUpdates] = useState(currentSettings.notifications.learningUpdates);

  const [theme, setTheme] = useState(currentSettings.appearance.theme || "light");

  function handleSaveProfile(e) {
    e.preventDefault();
    updateUser({ name, email, avatar });
    alert("Profile saved successfully!");
  }

  function handleSavePreferences(e) {
    e.preventDefault();
    settingsService.update("learning", { difficulty, style, dailyGoal });
    alert("Learning preferences updated!");
  }

  function handleSaveNotifications(e) {
    e.preventDefault();
    settingsService.update("notifications", { studyReminders, streakReminders, learningUpdates });
    alert("Notification settings updated!");
  }

  function handleThemeChange(newTheme) {
    setTheme(newTheme);
    settingsService.setTheme(newTheme);
    if (newTheme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }

  useEffect(() => {
    // Check local storage theme on mount
    const savedSettings = settingsService.get();
    if (savedSettings.appearance.theme === "dark") {
      document.body.classList.add("dark-theme");
    }
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="feature-page settings-page">
      <PageHeader title="Settings" subtitle="Configure profile details, study parameters, and accessibility settings." />

      <div className="settings-container">
        <aside className="settings-tabs-sidebar">
          <button
            type="button"
            className={`settings-tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={18} /> Profile Info
          </button>
          <button
            type="button"
            className={`settings-tab-btn ${activeTab === "preferences" ? "active" : ""}`}
            onClick={() => setActiveTab("preferences")}
          >
            <Settings size={18} /> Study Settings
          </button>
          <button
            type="button"
            className={`settings-tab-btn ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            <Bell size={18} /> Notifications
          </button>
          <button
            type="button"
            className={`settings-tab-btn ${activeTab === "appearance" ? "active" : ""}`}
            onClick={() => setActiveTab("appearance")}
          >
            <Palette size={18} /> Appearance
          </button>
          <hr className="settings-divider" />
          <button type="button" className="settings-tab-btn danger" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </button>
        </aside>

        <main className="settings-tabs-content">
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="settings-form">
              <h3>Profile Settings</h3>
              
              <div className="avatar-pick-section">
                <label>Choose Avatar</label>
                <div className="avatar-options-grid">
                  {AVATAR_OPTIONS.map((url) => (
                    <button
                      key={url}
                      type="button"
                      className={`avatar-option-btn ${avatar === url ? "selected" : ""}`}
                      onClick={() => setAvatar(url)}
                    >
                      <img src={url} alt="Profile option" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="settings-name-input">Full Name</label>
                <input
                  id="settings-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="settings-email-input">Email Address</label>
                <input
                  id="settings-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-primary">
                <Save size={16} /> Save Profile Info
              </button>
            </form>
          )}

          {activeTab === "preferences" && (
            <form onSubmit={handleSavePreferences} className="settings-form">
              <h3>Learning Preferences</h3>

              <div className="form-group">
                <label htmlFor="settings-diff-select">Default Difficulty</label>
                <select
                  id="settings-diff-select"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="settings-style-select">Learning Style</label>
                <select
                  id="settings-style-select"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                >
                  <option value="Visual">Visual Course Content</option>
                  <option value="Reading">Reading Modules</option>
                  <option value="Interactive">Interactive Guides</option>
                  <option value="Video">Video Modules</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="settings-goal-input">Daily Learning Goal (minutes)</label>
                <input
                  id="settings-goal-input"
                  type="number"
                  min="5"
                  max="300"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(Number(e.target.value))}
                  required
                />
              </div>

              <button type="submit" className="btn-primary">
                <Save size={16} /> Save Preferences
              </button>
            </form>
          )}

          {activeTab === "notifications" && (
            <form onSubmit={handleSaveNotifications} className="settings-form">
              <h3>Notification Controls</h3>

              <div className="checkbox-setting-row">
                <input
                  type="checkbox"
                  id="remind-study"
                  checked={studyReminders}
                  onChange={(e) => setStudyReminders(e.target.checked)}
                />
                <label htmlFor="remind-study">
                  <strong>Study Reminders</strong>
                  <span>Receive reminders to meet your daily learning goals.</span>
                </label>
              </div>

              <div className="checkbox-setting-row">
                <input
                  type="checkbox"
                  id="remind-streak"
                  checked={streakReminders}
                  onChange={(e) => setStreakReminders(e.target.checked)}
                />
                <label htmlFor="remind-streak">
                  <strong>Streak Alerts</strong>
                  <span>Keep updated to maintain your daily streak count.</span>
                </label>
              </div>

              <div className="checkbox-setting-row">
                <input
                  type="checkbox"
                  id="receive-updates"
                  checked={learningUpdates}
                  onChange={(e) => setLearningUpdates(e.target.checked)}
                />
                <label htmlFor="receive-updates">
                  <strong>Curriculum Updates</strong>
                  <span>Get notifications when new AI learning tracks are unlocked.</span>
                </label>
              </div>

              <button type="submit" className="btn-primary">
                <Save size={16} /> Save Notifications
              </button>
            </form>
          )}

          {activeTab === "appearance" && (
            <div className="settings-form">
              <h3>Appearance Settings</h3>
              <p className="section-hint">Select a color theme profile for the layout shell.</p>

              <div className="theme-options-row">
                <button
                  type="button"
                  className={`theme-option-card light ${theme === "light" ? "active" : ""}`}
                  onClick={() => handleThemeChange("light")}
                >
                  <div className="theme-card-preview" />
                  <span>Light Mode</span>
                </button>
                <button
                  type="button"
                  className={`theme-option-card dark ${theme === "dark" ? "active" : ""}`}
                  onClick={() => handleThemeChange("dark")}
                >
                  <div className="theme-card-preview" />
                  <span>Dark Mode</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default SettingsPage;
