import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; 
import Signup from "./pages/Signup";
import CompanyDashboard from "./company/pages/CompanyDashboard";
<<<<<<< HEAD

=======
import UserDashboard from "./user/pages/UserDashboard";
import BrowseJobs from "./user/pages/BrowseJobs";
import FindInternships from "./user/pages/FindInternships";
>>>>>>> 223b398 (Added UserDashboard, and its associated FindInternship page and BrowseJobs page)
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
<<<<<<< HEAD

        {/* <Route path="/user-dashboard" element={<UserDashboard />} />  */}
=======
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/browse-jobs" element={<BrowseJobs />} />
        <Route path="/find-internships" element={<FindInternships/>} />
>>>>>>> 223b398 (Added UserDashboard, and its associated FindInternship page and BrowseJobs page)


   
      </Routes>
    </Router>
  );
};

export default App;
