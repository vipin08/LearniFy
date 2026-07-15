import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <span className="material-symbols-outlined brand-icon filled">menu_book</span>
          Learnify
        </Link>

        <div className="nav-links">
          <a className="nav-link active" href="#">
            Subjects
          </a>
          <a className="nav-link" href="#">
            Courses
          </a>
          <a className="nav-link" href="#">
            Degrees
          </a>
          <a className="nav-link" href="#">
            For business
          </a>
        </div>

        <div className="nav-actions">
          <Link to="/login" className="btn-text">
            Login
          </Link>
          <Link to="/signup" className="btn-primary">
            Sign up
          </Link>
        </div>

        <button
          className="menu-toggle"
          aria-label="Toggle Menu"
          onClick={toggleMenu}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      <div className={`container mobile-menu ${menuOpen ? "open" : ""}`}>
        <a className="nav-link active" href="#">
          Subjects
        </a>
        <a className="nav-link" href="#">
          Courses
        </a>
        <a className="nav-link" href="#">
          Degrees
        </a>
        <a className="nav-link" href="#">
          For business
        </a>
        <Link to="/login" className="btn-text">
          Login
        </Link>
        <Link to="/signup" className="btn-primary">
          Sign up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
