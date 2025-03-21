import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/CourseAndCertificates.css";

const availableCourses = [
  { id: 1, title: "Web Development", duration: "6 weeks", provider: "Udemy", certificate: "Yes" },
  { id: 2, title: "Data Science", duration: "8 weeks", provider: "Coursera", certificate: "Yes" },
  { id: 3, title: "Machine Learning", duration: "10 weeks", provider: "edX", certificate: "Yes" },
  { id: 4, title: "Cyber Security", duration: "4 weeks", provider: "Pluralsight", certificate: "Yes" },
  { id: 5, title: "Cloud Computing", duration: "5 weeks", provider: "Google Cloud", certificate: "Yes" },
];

const CourseAndCertificates = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    return JSON.parse(localStorage.getItem("enrolledCourses")) || [];
  });

  useEffect(() => {
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  const handleEnroll = (course) => {
    if (!enrolledCourses.some((c) => c.id === course.id)) {
      setEnrolledCourses([...enrolledCourses, course]);
      alert(`Enrolled in ${course.title}! 🎉`);
    } else {
      alert(`You are already enrolled in ${course.title}`);
    }
  };

  const handleDownloadCertificate = (courseTitle) => {
    alert(`Downloading certificate for ${courseTitle}... 🏆`);
  };

  return (
    <div className="course-certificates-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2 className="brand">
          <span style={{ color: "white" }}>Intern</span>
          <span className="blue">@</span>
          <span style={{ color: "white" }}>Ease</span>
        </h2>
        <ul className="menu">
          <li><Link to="/user-dashboard">Dashboard</Link></li>
          <li>
                      <a
                        href="http://resumeanalyser-zrncmw3djin5dqqslxseks.streamlit.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resume Matcher
                      </a>
                    </li>
          <li><Link to="/browse-jobs">Browse Jobs</Link></li>
          <li><Link to="/find-internships">Find Internships</Link></li>
          <li><Link to="/internship-status">Internship Status</Link></li>
          <li><Link to="/course-and-certificates" className="active">Courses & Certificates</Link></li>
          <li><Link to="/user-profile">User Profile</Link></li>
          <li><Link to="/help">Help</Link></li>
          
          <li><Link to="/logout" className="logout">Logout</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <h1>Courses & Certificates</h1>

        {/* Available Courses */}
        <div className="courses-section">
          <h2>Available Courses</h2>
          <div className="course-list">
            {availableCourses.map((course) => (
              <div key={course.id} className="course-card">
                <h3>{course.title}</h3>
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Provider:</strong> {course.provider}</p>
                <button className="enroll-btn" onClick={() => handleEnroll(course)}>Enroll</button>
              </div>
            ))}
          </div>
        </div>

        {/* Enrolled Courses & Certificates */}
        {enrolledCourses.length > 0 && (
          <div className="enrolled-section">
            <h2>Enrolled Courses & Certificates</h2>
            <div className="course-list">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="course-card enrolled">
                  <h3>{course.title}</h3>
                  <p><strong>Duration:</strong> {course.duration}</p>
                  <p><strong>Provider:</strong> {course.provider}</p>
                  <button className="certificate-btn" onClick={() => handleDownloadCertificate(course.title)}>Download Certificate</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseAndCertificates;
