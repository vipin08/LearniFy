import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link to="/" className="footer-brand">
            <span className="material-symbols-outlined filled">menu_book</span>
            Learnify
          </Link>
          <p className="footer-text">
            Transforming the learning experience through conversational AI and
            community.
          </p>
        </div>

        <div>
          <h4 className="footer-heading">Platform</h4>
          <ul className="footer-links">
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Resources</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Legal</h4>
          <ul className="footer-links">
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Support</h4>
          <ul className="footer-links">
            <li>
              <a href="#">Support</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Learnify Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
