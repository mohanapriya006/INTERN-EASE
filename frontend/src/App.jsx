import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; 
import Signup from "./pages/Signup";
import CompanyDashboard from "./company/pages/CompanyDashboard";
import UserDashboard from "./user/pages/UserDashboard";
import BrowseJobs from "./user/pages/BrowseJobs";
import FindInternships from "./user/pages/FindInternships";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/browse-jobs" element={<BrowseJobs />} />
        <Route path="/find-internships" element={<FindInternships/>} />


   
      </Routes>
    </Router>
  );
};

export default App;
