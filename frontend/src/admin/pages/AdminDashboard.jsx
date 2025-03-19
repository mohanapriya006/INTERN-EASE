import React from 'react';
import AdminSidebar from './AdminSidebar'; // Import Sidebar
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <AdminSidebar /> {/* Sidebar Component */}

      {/* Main Content */}
      <div className="admin-main-content">
        <header className="admin-dashboard-header">
          <div className="admin-welcome-message">Welcome, Admin</div>
          <div className="admin-profile">👤 Admin Profile</div>
        </header>

        <div className="admin-dashboard-body">
          <h1>Manage the Platform Efficiently</h1>
          <p>Monitor users, approve job postings, manage courses, and oversee all platform activities.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
