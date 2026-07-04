const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      maxLength: [30, "Name must be less than 30 characters"],
      minLength: [3, "Name must be at least 3 characters long"],
    },

    emailId: {
      type: String,
      trim: true,
      required: [true, "EmailId is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Please provide a valid EmailId",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters long"],
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password must be strong");
        }
      },
      select: false, // don't return password by default
    },

    // Additional fields for the user profile

    college: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    graduationYear: {
      type: Number,
      min: 1950,
      max: new Date().getFullYear() + 5,
    },

    branch: {
      type: String,
      trim: true,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    profilePicture: {
      type: String,
      default: "",
      trim: true,
    },

    // Array of references to Experience documents
    experiences: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InterviewExperience",
      },
    ],

    // Array of references to Experience documents for bookmarks
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InterviewExperience",
      },
    ],

    // Account control
    isVerified: {
      type: Boolean,
      default: false,
    },

    // Role-based access control
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // Last login timestamp
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", UserSchema);
