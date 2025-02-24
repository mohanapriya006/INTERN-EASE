import React, { useState, useEffect } from "react";
import "../styles/Notifications.css";

const Notifications = () => {
  // Fetch stored notifications from localStorage
  const [notifications, setNotifications] = useState(() => {
    return JSON.parse(localStorage.getItem("notifications")) || [];
  });

  // Simulating a new notification being received
  useEffect(() => {
    const newNotification = JSON.parse(localStorage.getItem("newNotification"));
    if (newNotification) {
      setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
      localStorage.removeItem("newNotification"); // Clear new notification
    }
  }, []);

  // Function to clear notifications
  const clearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem("notifications");
  };

  return (
    <div className="notifications-container">
      <h1>Notifications</h1>
      {notifications.length > 0 ? (
        <div className="notification-list">
          {notifications.map((notification, index) => (
            <div key={index} className="notification-card">
              <p>{notification.message}</p>
              <small>{notification.date}</small>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-notifications">No new notifications.</p>
      )}
      {notifications.length > 0 && (
        <button className="clear-btn" onClick={clearNotifications}>
          Clear All
        </button>
      )}
    </div>
  );
};

export default Notifications;
