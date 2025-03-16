import express from "express";
import { 
    applyForInternship, 
    getApplicationsByCompany, 
    getAllApplications, 
    getApplicationsByInternship 
} from "../controllers/AppliedInternship.controller.js";

const router = express.Router();

// Apply for internship
router.post("/apply", applyForInternship);

// Get all applications
router.get("/all", getAllApplications);

// Get applications by company
router.get("/company", getApplicationsByCompany);

// Get applications by internship ID
router.get("/internship/:internshipId", getApplicationsByInternship);

export default router;