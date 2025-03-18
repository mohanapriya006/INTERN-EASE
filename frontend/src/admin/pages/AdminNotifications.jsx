import React, { useState } from "react";
import "../styles/AdminPages.css";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      sender: "user1@example.com",
      subject: "Query regarding internship",
      message: "Could you provide details on the application process?",
      timestamp: "2025-03-18 10:00 AM"
    },
    {
      id: 2,
      sender: "client@gmail.com",
      subject: "Partnership Inquiry",
      message: "We are interested in collaborating with your platform.",
      timestamp: "2025-03-18 11:30 AM"
    },
    {
      id: 3,
      sender: "hr@company.com",
      subject: "Job Application Status",
      message: "What is the status of my job application?",
      timestamp: "2025-03-18 12:45 PM"
    }
  ]);

  // Function to open Gmail compose window
  const handleReply = (email) => {
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    window.open(gmailLink, "_blank");
  };

  return (
    <div className="container">
      <h2>Admin Notifications</h2>
      <div className="card-container">
        {notifications.map((notif) => (
          <div key={notif.id} className="card">
            <h3>{notif.subject}</h3>
            <p><strong>From:</strong> {notif.sender}</p>
            <p>{notif.message}</p>
            <p className="timestamp">{notif.timestamp}</p>
            <div className="btn-group">
              <button
                className="btn reply"
                onClick={() => handleReply(notif.sender)}
              >
                Reply via Gmail
              </button>
              <button
                className="btn delete"
                onClick={() => setNotifications(notifications.filter((n) => n.id !== notif.id))}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotifications;
