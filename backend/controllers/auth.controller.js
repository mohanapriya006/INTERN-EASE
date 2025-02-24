import User from "../models/User.model.js";
import Company from "../models/Company.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { userType, name, email, password, phone, organization } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;

    if (userType === "user") {
      newUser = new User({ name, email, password: hashedPassword, phone });
    } else {
      newUser = new Company({ name, email, password: hashedPassword, phone, organization });
    }

    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    let userType = "user";

    if (!user) {
      user = await Company.findOne({ email });
      userType = "company";
    }

    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, userType }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token, userType });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
