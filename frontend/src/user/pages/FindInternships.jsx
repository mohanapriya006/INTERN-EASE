import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/FindInternships.css";

const FindInternships = () => {
    const [internships, setInternships] = useState([]);
    const [filters, setFilters] = useState({ location: "", company: "", stipend: "", type: "" });
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [appliedInternships, setAppliedInternships] = useState(new Set());
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        resumeLink: ""
    });
    const userId = "actual_user_id"; // Replace with actual user authentication logic
    
    useEffect(() => {
        axios.get("http://localhost:5000/api/internships/all")
            .then(response => {
                if (response.data.success) {
                    setInternships(response.data.data);
                }
            })
            .catch(error => console.error("Error fetching internships:", error));
    }, []);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value.trim() });
    };

    const handleApplyClick = (internship) => {
        setSelectedInternship(internship);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedInternship(null);
        setFormData({
            name: "",
            email: "",
            phone: "",
            resumeLink: ""
        });
    };

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitApplication = async () => {
        if (!selectedInternship || !formData.resumeLink || !formData.name || !formData.email || !formData.phone) {
            alert("Please fill all required fields");
            return;
        }
        
        const submitData = {
            internshipId: selectedInternship._id,
            company: selectedInternship.company,
            title: selectedInternship.title,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            resumeLink: formData.resumeLink
        };

        try {
            await axios.post("http://localhost:5000/api/applied-internships/apply", submitData);

            setAppliedInternships(new Set([...appliedInternships, selectedInternship._id]));
            alert("Application submitted successfully!");
            handleCloseModal();
        } catch (error) {
            console.error("Error applying for internship:", error);
            alert("Error submitting application. Please try again.");
        }
    };

    const filteredInternships = internships.filter(internship =>
        (filters.location === "" || internship.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (filters.company === "" || internship.company.toLowerCase().includes(filters.company.toLowerCase())) &&
        (filters.stipend === "" || internship.stipend.includes(filters.stipend)) &&
        (filters.type === "" || internship.type.toLowerCase() === filters.type.toLowerCase())
    );

    return (
        <div className="find-internships-container">
            <nav className="sidebar">
                <h2 className="brand">
                    <span style={{ color: "white" }}>Intern</span> 
                    <span className="blue">@</span>
                    <span style={{ color: "white" }}>Ease</span>
                </h2>
                <ul className="menu">
                    <li><Link to="/user-dashboard">Dashboard</Link></li>
                    <li><Link to="/browse-jobs">Browse Jobs</Link></li>
                    <li><Link to="/find-internships" className="active">Find Internships</Link></li>
                    <li><Link to="/internship-status">Internship Status</Link></li>
                    <li><Link to="/course-and-certificates">Courses & Certificates</Link></li>
                    <li><Link to="/user-profile">User Profile</Link></li>
                    <li><Link to="/help">Help</Link></li>
                    <li><Link to="/logout" className="logout">Logout</Link></li>
                </ul>
            </nav>
            
            <div className="main-content">
                <header className="dashboard-header">
                    <div className="welcome-message">Find the Best Internship Opportunities</div>
                </header>

                <div className="filters">
                    <input type="text" name="location" placeholder="Location" onChange={handleFilterChange} />
                    <input type="text" name="company" placeholder="Company Name" onChange={handleFilterChange} />
                    <input type="text" name="stipend" placeholder="Stipend (e.g. ₹25K/month)" onChange={handleFilterChange} />
                    <select name="type" onChange={handleFilterChange}>
                        <option value="">Internship Type</option>
                        <option value="Remote">Remote</option>
                        <option value="On-Site">On-Site</option>
                    </select>
                </div>
                <div className="internship-list">
                    {filteredInternships.length > 0 ? filteredInternships.map((internship) => (
                        <div key={internship._id} className="internship-card">
                            <h3>{internship.title}</h3>
                            <p><strong>Company:</strong> {internship.company}</p>
                            <p><strong>Location:</strong> {internship.location}</p>
                            <p><strong>Stipend:</strong> {internship.stipend}</p>
                            <p><strong>Type:</strong> {internship.type}</p>
                            <button
                                className={appliedInternships.has(internship._id) ? "applied-btn" : "apply-btn"}
                                onClick={() => handleApplyClick(internship)}
                                disabled={appliedInternships.has(internship._id)}
                            >
                                {appliedInternships.has(internship._id) ? "Applied" : "Apply Now"}
                            </button>
                        </div>
                    )) : <p>No internships found.</p>}
                </div>
            </div>
            {showModal && selectedInternship && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Apply for {selectedInternship.title}</h2>
                        <div className="company-info">
                            <p><strong>Company:</strong> {selectedInternship.company}</p>
                            <p><strong>Description:</strong> {selectedInternship.description}</p>
                            <p><strong>Requirements:</strong> {selectedInternship.requirements}</p>
                        </div>
                        
                        <div className="application-form">
                            <div className="form-group">
                                <label>Full Name:</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleFormChange} 
                                    required 
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Email:</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleFormChange} 
                                    required 
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Phone Number:</label>
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={handleFormChange} 
                                    required 
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Google Drive Resume Link:</label>
                                <input 
                                    type="url" 
                                    name="resumeLink"
                                    placeholder="https://drive.google.com/file/d/..."
                                    value={formData.resumeLink} 
                                    onChange={handleFormChange} 
                                    required 
                                />
                            </div>
                            
                            <button onClick={handleSubmitApplication} className="submit-btn">Submit Application</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindInternships;
