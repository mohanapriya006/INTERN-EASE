import mongoose from "mongoose";

const postInternshipSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  company: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  stipend: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['Remote', 'On-Site', 'Hybrid'],
    required: true 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  },
  duration: { 
    type: String,
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  requirements: { 
    type: String, 
    required: true 
  },
  applicationDeadline: { 
    type: Date, 
    required: true 
  },
  postedOn: { 
    type: Date, 
    default: Date.now 
  },
  postedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Company',
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Active', 'Closed', 'Draft'],
    default: 'Active' 
  },
  applications: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Application' 
  }]
}, {
  timestamps: true
});

const PostInternship = mongoose.model("PostInternship", postInternshipSchema);

export default PostInternship;
