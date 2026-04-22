const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    // 👤 Personal Information
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    location: {
      type: String,
    },

    // 💼 Professional Information
    experience: {
      type: String,
      enum: ["fresher", "junior", "mid", "senior", "lead"],
      required: true,
    },

    yearsOfExperience: {
      type: Number,
      default: 0,
    },

    currentSalary: {
      type: String,
    },

    expectedSalary: {
      type: String,
      required: true,
    },

    // 📄 Resume
    resume: {
      type: String,
      required: true,
    },

    // 🔗 Social Links
    linkedin: {
      type: String,
    },

    github: {
      type: String,
    },

    // ℹ️ Additional Info
    noticePeriod: {
      type: String,
      required: true,
    },

    coverLetter: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);
