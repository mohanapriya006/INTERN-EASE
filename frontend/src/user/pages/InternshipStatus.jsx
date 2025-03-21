import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/InternshipStatus.css";

const InternshipStatus = () => {
    const [applications, setApplications] = useState([]);
    const [filters, setFilters] = useState({ company: "", status: "" });
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Fetch current user's applications using JWT token
        fetchCurrentUserApplications();
    }, []);

    const fetchCurrentUserApplications = async () => {
        try {
            // Get the JWT token from localStorage or wherever you store it
            const token = localStorage.getItem('token'); // Adjust this based on where you store your token
            
            // Call the API with the token in the Authorization header
            const response = await axios.get("http://localhost:5000/api/applied-internships/user", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (response.data.success) {
                setApplications(response.data.data);
            } else {
                setApplications([]);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching applications:", error);
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value.trim() });
    };

    // Filter applications based on selected filters
    const filteredApplications = applications.filter(application =>
        (filters.company === "" || application.company.toLowerCase().includes(filters.company.toLowerCase())) &&
        (filters.status === "" || application.status.toLowerCase() === filters.status.toLowerCase())
    );

    // Function to get status badge class
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "accepted":
                return "status-badge success";
            case "rejected":
                return "status-badge danger";
            default:
                return "status-badge pending";
        }
    };

    // Format date function
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="internship-status-container">
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
                    <li><Link to="/internship-status" className="active">Internship Status</Link></li>
                    <li><Link to="/course-and-certificates">Courses & Certificates</Link></li>
                    <li><Link to="/user-profile">User Profile</Link></li>
                    <li><Link to="/help">Help</Link></li>
                    
                    <li><Link to="/logout" className="logout">Logout</Link></li>
                </ul>
            </nav>
            
            <div className="main-content">
                <header className="dashboard-header">
                    <div className="welcome-message">Your Internship Applications Status</div>
                </header>

             
                {loading ? (
                    <div className="loading">Loading your applications...</div>
                ) : (
                    <div className="application-list">
                        {filteredApplications.length > 0 ? filteredApplications.map((application) => (
                            <div key={application._id} className="application-card">
                                <h3>{application.title}</h3>
                                <p><strong>Company:</strong> {application.company}</p>
                                <p><strong>Applied On:</strong> {formatDate(application.appliedAt)}</p>
                                <div className="status-container">
                                    <span className={getStatusBadgeClass(application.status)}>
                                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                    </span>
                                </div>
                                <div className="application-details">
                                    <p><strong>Name:</strong> {application.name}</p>
                                    <p><strong>Email:</strong> {application.email}</p>
                                    <p><strong>Phone:</strong> {application.phone}</p>
                                    <p><strong>Resume:</strong> <a href={application.resumeLink} target="_blank" rel="noopener noreferrer" className="resume-link">View Resume</a></p>
                                </div>
                            </div>
                        )) : (
                            <div className="no-applications">
                                <p>You haven't applied to any internships yet.</p>
                                <Link to="/find-internships" className="find-internships-btn">
                                    Find Internships
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InternshipStatus;