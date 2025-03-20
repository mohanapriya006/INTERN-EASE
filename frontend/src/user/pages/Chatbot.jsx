import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const handleChatbotClick = () => {
    window.open('https://trialapp-mo7vnv3cdlmxs9lhuupjhx.streamlit.app/', '_blank');
  };

  return (
    <div className="user-dashboard-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2 className="brand">
          <span style={{ color: "white" }}>Intern</span> 
          <span className="blue">@</span>
          <span style={{ color: "white" }}>Ease</span>
        </h2>
        <ul className="menu">
          <li><Link to="/user-dashboard" className="active">Dashboard</Link></li>
          <li><Link to="/browse-jobs">Browse Jobs</Link></li>
          <li><Link to="/find-internships">Find Internships</Link></li>
          <li><Link to="/notifications">Notifications</Link></li>
          <li><Link to="/course-and-certificates">Courses & Certificates</Link></li>
          <li><Link to="/user-profile">User Profile</Link></li>
          <li><Link to="/help">Help</Link></li>

          {/* Chatbot Link - Opens Streamlit Page */}
          <li>
            <a 
              href="https://trialapp-mo7vnv3cdlmxs9lhuupjhx.streamlit.app/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              💬 Chatbot
            </a>
          </li>

          <li><Link to="/logout" className="logout">Logout</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <div className="welcome-message">Welcome to Your Dashboard</div>
          <div className="profile">👤 Profile</div>
        </header>
        
        <div className="dashboard-body">
          <h1>Empower Your Career with Inter@Ease</h1>
          <p>Explore a world of opportunities, upskill with the latest courses, and manage your career seamlessly.</p>
        </div>
      </div>

      {/* Chatbot Button */}
      <div className="chatbot-container">
        <button className="chatbot-button" onClick={handleChatbotClick}>
          💬 Chatbot
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
