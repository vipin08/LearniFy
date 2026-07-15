import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Star, Flame, Bell, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { searchService } from "../../services/searchService";
import ProfileDropdown from "../common/ProfileDropdown";
import NotificationPanel from "../common/NotificationPanel";
import SearchSuggestions from "../common/SearchSuggestions";

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const searchRef = useRef(null);

  const suggestions = query.trim() ? searchService.searchAll(query) : null;

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  }

  function handleSuggestionSelect() {
    setShowSuggestions(false);
    setQuery("");
  }

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="header-greeting rubik-doodle-shadow-regular">
          Hi, {user?.name || "Vipin"}!
        </div>
        <form className="header-search" onSubmit={handleSearchSubmit} ref={searchRef}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search for anything..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />
          {showSuggestions && query.trim() && (
            <SearchSuggestions
              results={suggestions}
              query={query}
              onSelect={handleSuggestionSelect}
              onClose={() => setShowSuggestions(false)}
              parentRef={searchRef}
            />
          )}
        </form>
      </div>

      <div className="header-actions">
        <div className="streak-badge">
          <Flame size={16} fill="#FF6B35" color="#FF6B35" />
          <span>7</span>
        </div>

        <div className="stars-badge">
          <Star size={16} fill="#FFB800" color="#FFB800" />
          <span>{user?.stars ?? 320}</span>
        </div>

        <div className="header-icon-wrap">
          <button
            type="button"
            className="header-icon-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>
          {showNotifications && (
            <NotificationPanel onClose={() => setShowNotifications(false)} />
          )}
        </div>

        <div className="header-profile-wrap">
          <button
            type="button"
            className="header-profile"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
          >
            <img src={user?.avatar} alt={user?.name} className="header-avatar" />
            <span>Hi, {user?.name}</span>
            <ChevronDown size={16} />
          </button>
          {showProfile && <ProfileDropdown onClose={() => setShowProfile(false)} />}
        </div>
      </div>
    </header>
  );
}

export default Header;
