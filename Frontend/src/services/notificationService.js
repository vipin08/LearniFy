import { getItem, setItem, STORAGE_KEYS } from "../utils/storage";
import { DEFAULT_NOTIFICATIONS } from "../data/mockData";

function getNotifications() {
  const stored = getItem(STORAGE_KEYS.NOTIFICATIONS, null);
  if (!stored) {
    setItem(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS);
    return DEFAULT_NOTIFICATIONS;
  }
  return stored;
}

function saveNotifications(notifications) {
  setItem(STORAGE_KEYS.NOTIFICATIONS, notifications);
}

export const notificationService = {
  getAll() {
    return getNotifications();
  },

  getUnreadCount() {
    return getNotifications().filter((n) => !n.read).length;
  },

  markAsRead(id) {
    const notifications = getNotifications().map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    saveNotifications(notifications);
    return notifications;
  },

  markAllAsRead() {
    const notifications = getNotifications().map((n) => ({ ...n, read: true }));
    saveNotifications(notifications);
    return notifications;
  },
};
