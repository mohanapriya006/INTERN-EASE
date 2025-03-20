import mongoose from "mongoose";

const AppliedInternshipSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    resumeLink: { type: String, required: true }, // Changed from resume to resumeLink
    internshipId: { type: mongoose.Schema.Types.ObjectId, ref: "PostInternship", required: true },
    company: { type: String, required: true },
    title: { type: String, required: true },
    appliedAt: { type: Date, default: Date.now },
    status: { type: String, default: "applied", enum: ["applied", "accepted", "rejected"] }
});

const AppliedInternship = mongoose.model("AppliedInternship", AppliedInternshipSchema);

export default AppliedInternship;