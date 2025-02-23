import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organization: { type: String, required: true },
  phone: { type: String, required: true }
});

const Company = mongoose.model("Company", companySchema);
export default Company;
