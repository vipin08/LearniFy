import { useRef, useState, useEffect } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { notificationService } from "../../services/notificationService";

function NotificationPanel({ onClose }) {
  const ref = useRef(null);
  const [notifications, setNotifications] = useState(notificationService.getAll());
  useClickOutside(ref, onClose);

  useEffect(() => {
    setNotifications(notificationService.getAll());
  }, []);

  function markRead(id) {
    setNotifications(notificationService.markAsRead(id));
  }

  function markAllRead() {
    setNotifications(notificationService.markAllAsRead());
  }

  return (
    <div className="dropdown-panel notification-panel" ref={ref}>
      <div className="panel-header">
        <h3>Notifications</h3>
        <button type="button" onClick={markAllRead}>Mark all read</button>
      </div>
      <div className="notification-list">
        {notifications.map((n) => (
          <button
            key={n.id}
            type="button"
            className={`notification-item ${n.read ? "read" : "unread"}`}
            onClick={() => markRead(n.id)}
          >
            <p>{n.message}</p>
            <span>{n.time}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default NotificationPanel;
