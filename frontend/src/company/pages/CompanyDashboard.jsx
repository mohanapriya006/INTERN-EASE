import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CompanyDashboard.css';

const CompanyDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <nav className="sidebar">
      <h2 className="brand">
  <span className="white">Intern</span><span className="blue">@</span><span className="white">Ease</span>
</h2>


        <ul className="menu">
          <li><Link to="/company-dashboard" className="active">Dashboard</Link></li>
          <li><Link to="/post-internship">Post Internship</Link></li>
          <li><Link to="/view-candidates">View Candidates</Link></li>
          <li><Link to="/manage-applications">Manage Applications</Link></li>
          <li><Link to="/interview-scheduling">Interview Scheduling</Link></li>
          <li><Link to="/reports-analytics">Reports & Analytics</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/logout" className="logout">Logout</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <div className="welcome-message">Welcome to your Dashboard</div>
          <div className="profile">Profile</div>
        </header>
        <div className="dashboard-body">
          <h1>Company Dashboard</h1>
          <p>Select an option from the sidebar to manage your company’s activities.</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
