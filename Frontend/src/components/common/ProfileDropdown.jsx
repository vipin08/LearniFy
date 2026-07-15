import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useClickOutside } from "../../hooks/useClickOutside";

function ProfileDropdown({ onClose }) {
  const ref = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  useClickOutside(ref, onClose);

  function handleLogout() {
    logout();
    navigate("/login");
    onClose();
  }

  return (
    <div className="dropdown-panel profile-dropdown" ref={ref}>
      <Link to="/profile" className="dropdown-item" onClick={onClose}>
        <User size={18} />
        My Profile
      </Link>
      <Link to="/settings" className="dropdown-item" onClick={onClose}>
        <Settings size={18} />
        Settings
      </Link>
      <button type="button" className="dropdown-item danger" onClick={handleLogout}>
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}

export default ProfileDropdown;
