import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; 
import Signup from "./pages/Signup";
import CompanyDashboard from "./company/pages/CompanyDashboard";
import UserDashboard from "./user/pages/UserDashboard";
import BrowseJobs from "./user/pages/BrowseJobs";
import FindInternships from "./user/pages/FindInternships";
import Notifications from "./user/pages/Notifications";
import CourseAndCertificates from "./user/pages/CourseAndCertificates";
import UserProfile from "./user/pages/UserProfile";
import Help from "./user/pages/Help";
import Logout from "./user/pages/Logout";
import PostInternship from './company/pages/PostInternship';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/browse-jobs" element={<BrowseJobs />} />
        <Route path="/find-internships" element={<FindInternships />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/course-and-certificates" element={<CourseAndCertificates />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/help" element={<Help />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/post-internship" element={<PostInternship />} />
      </Routes>
    </Router>
  );
};

export default App;
