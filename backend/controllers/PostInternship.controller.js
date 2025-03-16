// import PostInternship from "../models/PostInternship.model.js";
// import mongoose from "mongoose";

// // Create a new internship
// export const createInternship = async (req, res) => {
//     try {
//         if (!req.user || !req.user.id) {
//             return res.status(401).json({ success: false, message: "User not authenticated." });
//         }

//         if (req.user.userType !== "company") {
//             return res.status(403).json({ success: false, message: "Only companies can post internships." });
//         }

//         const { title, company, location, stipend, type, startDate, endDate, description, requirements, applicationDeadline } = req.body;

//         if (!title || !company || !location || !type || !startDate || !endDate || !description || !applicationDeadline) {
//             return res.status(400).json({ success: false, message: "All fields are required." });
//         }

//         const start = new Date(startDate);
//         const end = new Date(endDate);
//         const deadline = new Date(applicationDeadline);

//         if (end <= start) {
//             return res.status(400).json({ success: false, message: "End date must be after start date." });
//         }

//         if (deadline >= start) {
//             return res.status(400).json({ success: false, message: "Application deadline should be before start date." });
//         }

//         const duration = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

//         const newInternship = new PostInternship({
//             title,
//             company,
//             location,
//             stipend,
//             type,
//             startDate,
//             endDate,
//             duration,
//             description,
//             requirements,
//             applicationDeadline,
//             postedBy: new mongoose.Types.ObjectId(req.user.id),
//             status: "Active"
//         });

//         const savedInternship = await newInternship.save();

//         res.status(201).json({ success: true, message: "Internship posted successfully.", data: savedInternship });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Server error while creating internship.", error: error.message });
//     }
// };

// // Get all internships (for student browsing)
// export const getAllInternships = async (req, res) => {
//     try {
//         const { location, company, stipendMin, type } = req.query;
//         const filter = { status: "Active" };
        
//         if (location) filter.location = { $regex: location, $options: "i" };
//         if (company) filter.company = { $regex: company, $options: "i" };
//         if (type) filter.type = type;
//         if (stipendMin) filter.stipend = { $gte: stipendMin };
        
//         const internships = await PostInternship.find(filter).sort({ postedOn: -1 }).populate("postedBy", "name organization");

//         res.status(200).json({ success: true, count: internships.length, data: internships });
//     } catch (error) {
//         console.error("Error fetching internships:", error);
//         res.status(500).json({ success: false, message: "Server error while fetching internships", error: error.message });
//     }
// };

// // Get a specific internship by ID
// export const getInternshipById = async (req, res) => {
//     try {
//         const internship = await PostInternship.findById(req.params.id).populate("postedBy", "name organization email phone");
//         if (!internship) return res.status(404).json({ success: false, message: "Internship not found" });
//         res.status(200).json({ success: true, data: internship });
//     } catch (error) {
//         console.error("Error fetching internship:", error);
//         res.status(500).json({ success: false, message: "Server error while fetching internship", error: error.message });
//     }
// };

// // Get all internships posted by the logged-in company
// export const getCompanyInternships = async (req, res) => {
//     try {
//         const internships = await PostInternship.find({ postedBy: req.user._id }).sort({ postedOn: -1 });
//         res.status(200).json({ success: true, count: internships.length, data: internships });
//     } catch (error) {
//         console.error("Error fetching company internships:", error);
//         res.status(500).json({ success: false, message: "Server error while fetching company internships", error: error.message });
//     }
// };

// // Update an internship
// export const updateInternship = async (req, res) => {
//     try {
//         const internship = await PostInternship.findById(req.params.id);
//         if (!internship) return res.status(404).json({ success: false, message: "Internship not found" });

//         if (internship.postedBy.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ success: false, message: "Unauthorized: You can only update your own internship listings" });
//         }

//         let duration = internship.duration;
//         if (req.body.startDate && req.body.endDate) {
//             const start = new Date(req.body.startDate);
//             const end = new Date(req.body.endDate);
//             if (end <= start) return res.status(400).json({ success: false, message: "End date must be after start date" });
//             duration = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
//         }

//         const updatedInternship = await PostInternship.findByIdAndUpdate(req.params.id, { ...req.body, duration }, { new: true, runValidators: true });
//         res.status(200).json({ success: true, message: "Internship updated successfully", data: updatedInternship });
//     } catch (error) {
//         console.error("Error updating internship:", error);
//         res.status(500).json({ success: false, message: "Server error while updating internship", error: error.message });
//     }
// };

// // Delete an internship
// export const deleteInternship = async (req, res) => {
//     try {
//         const internship = await PostInternship.findById(req.params.id);
//         if (!internship) return res.status(404).json({ success: false, message: "Internship not found" });
//         if (internship.postedBy.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: "Unauthorized: You can only delete your own internship listings" });
//         await PostInternship.findByIdAndDelete(req.params.id);
//         res.status(200).json({ success: true, message: "Internship deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting internship:", error);
//         res.status(500).json({ success: false, message: "Server error while deleting internship", error: error.message });
//     }
// };

import PostInternship from "../models/PostInternship.model.js";
import mongoose from "mongoose";

// Create a new internship
export const createInternship = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: "User not authenticated." });
        }

        if (req.user.userType !== "company") {
            return res.status(403).json({ success: false, message: "Only companies can post internships." });
        }

        const { title, company, location, stipend, type, startDate, endDate, description, requirements, applicationDeadline } = req.body;

        if (!title || !company || !location || !type || !startDate || !endDate || !description || !applicationDeadline) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        const deadline = new Date(applicationDeadline);

        if (end <= start) {
            return res.status(400).json({ success: false, message: "End date must be after start date." });
        }

        if (deadline >= start) {
            return res.status(400).json({ success: false, message: "Application deadline should be before start date." });
        }

        const duration = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

        const newInternship = new PostInternship({
            title,
            company,
            location,
            stipend,
            type,
            startDate,
            endDate,
            duration,
            description,
            requirements,
            applicationDeadline,
            postedBy: new mongoose.Types.ObjectId(req.user.id),
            status: "Active"
        });

        const savedInternship = await newInternship.save();

        res.status(201).json({ success: true, message: "Internship posted successfully.", data: savedInternship });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error while creating internship.", error: error.message });
    }
};

// Get all internships (for student browsing)
export const getAllInternships = async (req, res) => {
    try {
        const { location, company, stipendMin, type } = req.query;
        const filter = { status: "Active" };
        
        if (location) filter.location = { $regex: location, $options: "i" };
        if (company) filter.company = { $regex: company, $options: "i" };
        if (type) filter.type = type;
        if (stipendMin) filter.stipend = { $gte: stipendMin };
        
        const internships = await PostInternship.find(filter).sort({ postedOn: -1 }).populate("postedBy", "name organization");

        res.status(200).json({ success: true, count: internships.length, data: internships });
    } catch (error) {
        console.error("Error fetching internships:", error);
        res.status(500).json({ success: false, message: "Server error while fetching internships", error: error.message });
    }
};

// Get a specific internship by ID
export const getInternshipById = async (req, res) => {
    try {
        const internship = await PostInternship.findById(req.params.id).populate("postedBy", "name organization email phone");
        if (!internship) return res.status(404).json({ success: false, message: "Internship not found" });
        res.status(200).json({ success: true, data: internship });
    } catch (error) {
        console.error("Error fetching internship:", error);
        res.status(500).json({ success: false, message: "Server error while fetching internship", error: error.message });
    }
};

// Get all internships posted by the logged-in company
export const getCompanyInternships = async (req, res) => {
    try {
        const internships = await PostInternship.find({ postedBy: req.user._id }).sort({ postedOn: -1 });
        res.status(200).json({ success: true, count: internships.length, data: internships });
    } catch (error) {
        console.error("Error fetching company internships:", error);
        res.status(500).json({ success: false, message: "Server error while fetching company internships", error: error.message });
    }
};

// Update an internship
export const updateInternship = async (req, res) => {
    try {
        const internship = await PostInternship.findById(req.params.id);
        if (!internship) return res.status(404).json({ success: false, message: "Internship not found" });

        if (internship.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized: You can only update your own internship listings" });
        }

        let duration = internship.duration;
        if (req.body.startDate && req.body.endDate) {
            const start = new Date(req.body.startDate);
            const end = new Date(req.body.endDate);
            if (end <= start) return res.status(400).json({ success: false, message: "End date must be after start date" });
            duration = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        }

        const updatedInternship = await PostInternship.findByIdAndUpdate(req.params.id, { ...req.body, duration }, { new: true, runValidators: true });
        res.status(200).json({ success: true, message: "Internship updated successfully", data: updatedInternship });
    } catch (error) {
        console.error("Error updating internship:", error);
        res.status(500).json({ success: false, message: "Server error while updating internship", error: error.message });
    }
};

// Delete an internship
export const deleteInternship = async (req, res) => {
    try {
        const internship = await PostInternship.findById(req.params.id);
        if (!internship) return res.status(404).json({ success: false, message: "Internship not found" });
        if (internship.postedBy.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: "Unauthorized: You can only delete your own internship listings" });
        await PostInternship.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Internship deleted successfully" });
    } catch (error) {
        console.error("Error deleting internship:", error);
        res.status(500).json({ success: false, message: "Server error while deleting internship", error: error.message });
    }
};
