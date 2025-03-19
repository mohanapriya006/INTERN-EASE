import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CompanyDashboard from "./company/pages/CompanyDashboard";
import UserDashboard from "./user/pages/UserDashboard";
import AdminCourses from "./admin/pages/AdminCourses";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminHelp from "./admin/pages/AdminHelp";
import AdminNotifications from "./admin/pages/AdminNotifications";
import AdminProfile from "./admin/pages/AdminProfile";
import AdminSidebar from "./admin/pages/AdminSidebar";
import ManageInternships from "./admin/pages/ManageInternships";
import ManageJobs from "./admin/pages/ManageJobs";
import ManageUsers from "./admin/pages/ManageUsers";
import BrowseJobs from "./user/pages/BrowseJobs";
import FindInternships from "./user/pages/FindInternships";
import Notifications from "./user/pages/Notifications";
import CourseAndCertificates from "./user/pages/CourseAndCertificates";
import UserProfile from "./user/pages/UserProfile";
import Help from "./user/pages/Help";
import Logout from "./user/pages/Logout";
<<<<<<< HEAD


=======
import PostInternship from './company/pages/PostInternship';
import ViewApplications from './company/pages/ViewApplications';
>>>>>>> 6d096ed (fetched applicatons to the comapny side)
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Company Routes */}
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
<<<<<<< HEAD
=======
        <Route path="/post-internship" element={<PostInternship />} />
        <Route path="/view-applications" element={<ViewApplications />} />
>>>>>>> 6d096ed (fetched applicatons to the comapny side)
      
        {/* User Routes */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/browse-jobs" element={<BrowseJobs />} />
        <Route path="/find-internships" element={<FindInternships />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/course-and-certificates" element={<CourseAndCertificates />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/help" element={<Help />} />
        <Route path="/logout" element={<Logout />} />
<<<<<<< HEAD
=======
        <Route path="/post-internship" element={<PostInternship />} />
>>>>>>> 6d096ed (fetched applicatons to the comapny side)

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-courses" element={<AdminCourses />} />
        <Route path="/admin-help" element={<AdminHelp />} />
        <Route path="/admin-notifications" element={<AdminNotifications />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/admin-sidebar" element={<AdminSidebar />} />
        <Route path="/manage-internships" element={<ManageInternships />} />
        <Route path="/manage-jobs" element={<ManageJobs />} />
        <Route path="/manage-users" element={<ManageUsers />} />

        {/* 404 Page */}
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
