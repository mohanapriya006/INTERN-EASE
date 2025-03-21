import express from "express";
import { 
    applyForInternship, 
    getApplicationsByCompany, 
    getAllApplications, 
    getApplicationsByInternship,
    updateApplicationStatus,
    getApplicationsByUser
} from "../controllers/AppliedInternship.controller.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";


const router = express.Router();

// Apply for internship
router.post("/apply", applyForInternship);

// Get all applications
router.get("/all", getAllApplications);

// Get applications by company
router.get("/company", getApplicationsByCompany);

// Get applications by internship ID
router.get("/internship/:internshipId", getApplicationsByInternship);

router.put('/:id/status', updateApplicationStatus);

router.get("/user", isAuthenticated, getApplicationsByUser);

//  router.get("/user/:userId", getApplicationsByUser); 

export default router;