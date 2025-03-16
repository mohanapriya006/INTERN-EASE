
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import loginRoutes from "./routes/authRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import appliedInternshipRoutes from "./routes/appliedInternshipRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Support form data


mongoose.connect(process.env.MONGO_URI)

//mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//instead use the one above, commented code gives warnings because useNewUrlParser and useUnifiedTopology are no longer needed in Mongoose (since version 4.0.0 of the MongoDB driver).
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


app.use("/api/auth", loginRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/applied-internships", appliedInternshipRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
