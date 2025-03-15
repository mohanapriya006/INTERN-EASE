// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables

// export const isAuthenticated = (req, res, next) => {
//     const token = req.header("Authorization"); // Get token from request headers

//     if (!token) {
//         return res.status(401).json({ message: "Access denied. No token provided." });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token
//         req.user = decoded; // Attach user data to request object
//         next(); // Move to the next middleware or route handler
//     } catch (error) {
//         res.status(400).json({ message: "Invalid token." });
//     }
// };

import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import Company from "../models/Company.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

    let user = await User.findById(decoded.id);
    if (!user) {
      user = await Company.findById(decoded.id);
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid token, user not found" });
    }

    req.user = { id: user._id.toString(), userType: decoded.userType };

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
