import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  StickyNote,
  Layers,
  HelpCircle,
  Bookmark,
  History,
  Settings,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/learning", label: "My Learning", icon: BookOpen },
  { to: "/notes", label: "Notes", icon: StickyNote },
  { to: "/flashcards", label: "Flashcards", icon: Layers },
  { to: "/quizzes", label: "Quizzes", icon: HelpCircle },
  { to: "/bookmarks", label: "Bookmarks", icon: Bookmark },
  { to: "/history", label: "History", icon: History },
  { to: "/settings", label: "Settings", icon: Settings },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <GraduationCap size={22} />
        </div>
        <div>
          <h1>Learnify</h1>
          <p>Learn Smarter with AI</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer-card">
        <p>Keep learning, keep growing!</p>
        <div className="sidebar-plant">🌱</div>
      </div>
    </aside>
  );
}

export default Sidebar;
