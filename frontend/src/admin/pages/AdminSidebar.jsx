import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/AdminSidebar.css';

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <nav className="admin-sidebar">
      <h2 className="admin-brand">
        Admin<span className="blue">@</span>Ease
      </h2>
      <ul className="admin-menu">
        <li>
          <Link to="/admin-dashboard" className={location.pathname === "/admin-dashboard" ? "active" : ""}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/manage-users" className={location.pathname === "/manage-users" ? "active" : ""}>
            Manage Users
          </Link>
        </li>
        <li>
          <Link to="/manage-jobs" className={location.pathname === "/manage-jobs" ? "active" : ""}>
            Manage Jobs
          </Link>
        </li>
        <li>
          <Link to="/manage-internships" className={location.pathname === "/manage-internships" ? "active" : ""}>
            Manage Internships
          </Link>
        </li>
        <li>
          <Link to="/admin-notifications" className={location.pathname === "/admin-notifications" ? "active" : ""}>
            Notifications
          </Link>
        </li>
        <li>
          <Link to="/admin-courses" className={location.pathname === "/admin-courses" ? "active" : ""}>
            Courses & Certificates
          </Link>
        </li>
        <li>
          <Link to="/admin-profile" className={location.pathname === "/admin-profile" ? "active" : ""}>
            Admin Profile
          </Link>
        </li>
        <li>
          <Link to="/admin-help" className={location.pathname === "/admin-help" ? "active" : ""}>
            Help
          </Link>
        </li>
        <li>
          <Link to="/logout" className="logout">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;
