import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CompanyDashboard.css';

const CompanyDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <nav className="sidebar">
<<<<<<< HEAD
        <h2 className="brand">
          Inter<span className="blue">@</span>Ease
        </h2>
=======
      <h2 className="brand">
                    <span style={{ color: "white" }}>Intern</span> 
                    <span className="blue">@</span>
                    <span style={{ color: "white" }}>Ease</span>
                </h2>


>>>>>>> 6d096ed (fetched applicatons to the comapny side)
        <ul className="menu">
          <li><Link to="/company-dashboard" className="active">Dashboard</Link></li>
          <li><Link to="/post-internship">Post Internship</Link></li>
          <li><Link to="/view-applications">View Applications</Link></li>
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
