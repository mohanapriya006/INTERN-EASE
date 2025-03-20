import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
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

          {/* Resume Matcher */}
          <li>
            <a
              href="http://resumeanalyser-zrncmw3djin5dqqslxseks.streamlit.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume Matcher
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

        {/* Grid Layout for Compact Sections */}
        <div className="grid-container">
          {/* Featured Jobs */}
          <div className="section card">
            <h2>🔥 Featured Jobs</h2>
            <ul className="job-list">
              <li>🔹 <strong>Software Developer</strong> at Google</li>
              <li>🔹 <strong>Data Analyst</strong> at Microsoft</li>
              <li>🔹 <strong>UI/UX Designer</strong> at Amazon</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="section card">
            <h2>🔗 Quick Links</h2>
            <div className="quick-links">
              <a href="/user-profile">👤 View Profile</a>
              <a href="/browse-jobs">💼 Browse Jobs</a>
              <a href="/course-and-certificates">📚 Courses & Certificates</a>
            </div>
          </div>

          {/* Career Tips */}
          <div className="section card">
            <h2>💡 Career Tips</h2>
            <p>✨ Stay updated with industry trends and acquire new skills regularly.<br />
              🚀 Customize your resume for every application.<br />
              🌟 Network actively to build strong connections.
            </p>
          </div>

          {/* Chatbot Link */}
          <div className="section card">
            <h2>💬 Chatbot</h2>
            <a
              href="http://chatbot-u7su2g5xjfhrdef9vcz2xp.streamlit.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="chatbot-link"
            >
              Open Chatbot
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
