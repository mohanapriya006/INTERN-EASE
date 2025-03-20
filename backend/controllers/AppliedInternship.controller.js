import AppliedInternship from "../models/AppliedInternship.model.js";
import PostInternship from "../models/PostInternship.model.js";

// Apply for an internship
export const applyForInternship = async (req, res) => {
    console.log("Received body:", req.body);

    try {
        const { name, email, phone, resumeLink, internshipId } = req.body;
        
        // Validate required fields from user input
        if (!name || !email || !phone || !resumeLink || !internshipId) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required, including resume link." 
            });
        }

        // Fetch internship details from PostInternship
        const internship = await PostInternship.findById(internshipId);
        if (!internship) {
            return res.status(404).json({
                success: false,
                message: "Internship not found"
            });
        }

        // Create new application with data from both user input and fetched internship
        const newApplication = new AppliedInternship({
            name,
            email,
            phone,
            resumeLink,
            internshipId,
            company: internship.company,
            title: internship.title
        });

        // Save to database
        await newApplication.save();

        res.status(201).json({ 
            success: true, 
            message: "Application submitted successfully",
            data: newApplication
        });
    } catch (error) {
        console.error("Error submitting application:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Get applications for a specific company
export const getApplicationsByCompany = async (req, res) => {
    try {
        const { company } = req.query; // Use query parameters for better readability

        if (!company) {
            return res.status(400).json({ 
                success: false, 
                message: "Company name is required" 
            });
        }

        // Fetch applications only for this company
        const applications = await AppliedInternship.find({ company })
            .populate("internshipId")
            .sort({ appliedAt: -1 }); // Sort by newest first

        res.status(200).json({ 
            success: true, 
            count: applications.length,
            data: applications 
        });
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Get all applications
export const getAllApplications = async (req, res) => {
    try {
        const applications = await AppliedInternship.find()
            .populate("internshipId")
            .sort({ appliedAt: -1 });

        res.status(200).json({ 
            success: true, 
            count: applications.length,
            data: applications 
        });
    } catch (error) {
        console.error("Error fetching all applications:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Get applications by internship ID
export const getApplicationsByInternship = async (req, res) => {
    try {
        const { internshipId } = req.params;

        if (!internshipId) {
            return res.status(400).json({ 
                success: false, 
                message: "Internship ID is required" 
            });
        }

        const applications = await AppliedInternship.find({ internshipId })
            .sort({ appliedAt: -1 });

        res.status(200).json({ 
            success: true, 
            count: applications.length,
            data: applications 
        });
    } catch (error) {
        console.error("Error fetching applications by internship:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};


export const updateApplicationStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      // Validate status
      if (!["applied", "accepted", "rejected"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status value"
        });
      }
      
      const updatedApplication = await AppliedInternship.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      
      if (!updatedApplication) {
        return res.status(404).json({
          success: false,
          message: "Application not found"
        });
      }
      
      return res.status(200).json({
        success: true,
        message: `Application status updated to ${status}`,
        data: updatedApplication
      });
    } catch (error) {
      console.error("Error updating application status:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  };