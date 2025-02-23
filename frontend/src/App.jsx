import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; 
import Signup from "./pages/Signup";
import CompanyDashboard from "./company/pages/CompanyDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />

        {/* <Route path="/user-dashboard" element={<UserDashboard />} />  */}


   
      </Routes>
    </Router>
  );
};

export default App;
