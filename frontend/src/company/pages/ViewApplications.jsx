import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/ViewApplications.css";

const ViewApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [company, setCompany] = useState("");

    useEffect(() => {
        setLoading(true);
        fetchApplications();
    }, []);

    const fetchApplications = async (companyName = "") => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:5000/api/applied-internships/company?company=${encodeURIComponent(companyName)}`
            );

            if (response.data.success) {
                setApplications(response.data.data);
                setError(null);
            } else {
                setError("Failed to fetch applications");
                setApplications([]);
            }
        } catch (error) {
            console.error("Error fetching applications:", error);
            setError("Choose the company to view Applications");
            setApplications([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCompanySearch = (e) => {
        e.preventDefault();
        if (company.trim()) {
            fetchApplications(company.trim());
        }
    };

    const handleAccept = async (applicationId) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/applied-internships/${applicationId}/status`,
                { status: "accepted" }
            );
            
            if (response.data.success) {
                // Update the application status in the local state
                setApplications(prevApplications => 
                    prevApplications.map(app => 
                        app._id === applicationId ? { ...app, status: "accepted" } : app
                    )
                );
            } else {
                alert(`Failed to accept ${applications.find(app => app._id === applicationId)?.name}`);
            }
        } catch (error) {
            console.error("Error accepting application:", error);
            alert(`Failed to accept application: ${error.message}`);
        }
    };

    const handleReject = async (applicationId) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/applied-internships/${applicationId}/status`,
                { status: "rejected" }
            );
            
            if (response.data.success) {
                // Update the application status in the local state
                setApplications(prevApplications => 
                    prevApplications.map(app => 
                        app._id === applicationId ? { ...app, status: "rejected" } : app
                    )
                );
            } else {
                alert(`Failed to reject ${applications.find(app => app._id === applicationId)?.name}`);
            }
        } catch (error) {
            console.error("Error rejecting application:", error);
            alert(`Failed to reject application: ${error.message}`);
        }
    };

    return (
        <div className="view-applications-container">
            <nav className="sidebar">
                <h2 className="brand">
                    <span style={{ color: "white" }}>Intern</span> 
                    <span className="blue">@</span>
                    <span style={{ color: "white" }}>Ease</span>
                </h2>
                <ul className="menu">
                    <li><Link to="/company-dashboard">Dashboard</Link></li>
                    <li><Link to="/post-internship">Post Internship</Link></li>
                    <li><Link to="/view-applications" className="active">View Applications</Link></li>
                    <li><Link to="/interview-scheduling">Interview Scheduling</Link></li>
                    <li><Link to="/reports-analytics">Reports & Analytics</Link></li>
                  
                    <li><Link to="/logout" className="logout">Logout</Link></li>
                </ul>
            </nav>
            
            <div className="main-content">
                <header className="dashboard-header">
                    <div className="welcome-message">Manage Internship Applications</div>
                </header>

                <div className="company-search">
                    <form onSubmit={handleCompanySearch}>
                        <input 
                            type="text" 
                            placeholder="Enter Company Name" 
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                        <button type="submit" className="search-btn">Search</button>
                    </form>
                </div>

                {loading ? (
                    <div className="loading">Loading applications...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : applications.length === 0 ? (
                    <div className="no-applications">No applications found.</div>
                ) : (
                    <div className="applications-list">
                        <h3>Applications {company && `for ${company}`}</h3>
                        <table className="applications-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Resume</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((application) => (
                                    <tr key={application._id} className={application.status ? `status-${application.status}` : ""}>
                                        <td>{application.name}</td>
                                        <td>{application.email}</td>
                                        <td>{application.phone}</td>
                                        <td>
                                            <a href={application.resumeLink} target="_blank" rel="noopener noreferrer" className="resume-link">
                                                View Resume
                                            </a>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${application.status || 'applied'}`}>
                                                {application.status ? application.status.charAt(0).toUpperCase() + application.status.slice(1) : 'Applied'}
                                            </span>
                                        </td>
                                        <td className="action-buttons">
                                            {(!application.status || application.status === "applied") ? (
                                                <>
                                                    <button className="accept-btn" onClick={() => handleAccept(application._id)}>
                                                        Accept
                                                    </button>
                                                    <button className="reject-btn" onClick={() => handleReject(application._id)}>
                                                        Reject
                                                    </button>
                                                </>
                                            ) : (
                                                <span>{application.status === "accepted" ? "Accepted" : "Rejected"}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewApplications;