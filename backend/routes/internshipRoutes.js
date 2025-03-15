import express from "express";
import { 
  createInternship, 
  getAllInternships, 
  getInternshipById, 
  updateInternship, 
  deleteInternship,
  getCompanyInternships 
} from "../controllers/PostInternship.controller.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new internship
router.post("/create", isAuthenticated, createInternship);

// Get all internships (for students to browse)
router.get("/all", getAllInternships);

// Get specific internship by ID
router.get("/:id", getInternshipById);

// Get all internships posted by the logged-in company
router.get("/company/listings", isAuthenticated, getCompanyInternships);

// Update internship
router.put("/:id", isAuthenticated, updateInternship);

// Delete internship
router.delete("/:id", isAuthenticated, deleteInternship);

export default router;