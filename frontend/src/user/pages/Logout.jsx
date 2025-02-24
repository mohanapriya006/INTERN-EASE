import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Logout.css";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session after confirmation
    localStorage.removeItem("userData");
    localStorage.removeItem("appliedJobs");
    localStorage.removeItem("appliedInternships");
    localStorage.removeItem("learningCertificates");
    localStorage.removeItem("acquiredCertificates");

    // Redirect to login after 5 seconds
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [navigate]);

  return (
    <div className="logout-container">
      <h1>Thank you for using <span className="highlight">INTERN@EASE</span></h1>
      <p>You have successfully logged out.</p>
      <p>Redirecting to the login page in a few seconds...</p>
      <p>
        If not redirected, <a href="/" className="login-link">click here to login</a>.
      </p>
    </div>
  );
};

export default Logout;
