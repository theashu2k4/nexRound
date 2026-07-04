const {companies, roles, tags} = require('../utils/constants');
const mongoose = require("mongoose");

const InterviewExperienceSchema = new mongoose.Schema(
  {
    //Basic Details
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: {
      type: String,
      required: true,
      enum: [...companies, "Other"],
    },
    role: {
      type: String,
      required: true,
      enum: [...roles, "Other"],
    },
    tags: {
      type: [String],
      enum: tags,
      default: [],
    },

    jobType: {
      required: true,
      type: String,
      enum: ["On-Campus", "Off-Campus", "Internship", "PPO"],
    },

    result: {
      type: String,
      enum: ["Selected", "Rejected", "Pending", "Other"],
    },

    mode: {
      required: true,
      type: String,
      enum: ["Online", "Offline", "Hybrid", "Other"],
    },

    ctc: {
      type: Number,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard", "Other"],
    },

    //Overview and Tags
    postTitle: {
      required: true,
      type: String,
      trim: true,
      maxLength: [100, "Title must be less than 100 characters"],
      minLength: [10, "Title must be at least 10 characters long"],
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    noOfRounds: {
      type: Number,
      default: 0,
    },

    //3. Interview Rounds
    rounds: [
      {
        roundNumber: {
          type: Number,
        },

        roundName: {
          type: String,
          required: true,
          trim: true,
        },

        difficulty: {
          type: String,
          enum: ["Easy", "Medium", "Hard"],
        },
        mode: {
          type: String,
          enum: ["Online", "Offline", "Remote"],
        },
        duration: Number,
        questions: [
          {
            text: String,
            topic: String,
            link: String,
          },
        ],
        notes: String,
      },
    ],
    //4. Additional Details
    content: String,

    likes: {
      count: {
        type: Number,
        default: 0,
      },
      users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },

    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const slugify = require("slugify");

InterviewExperienceSchema.pre("save", async function () {
  if (!this.isNew) return;

  const base = slugify(`${this.company}-interview-experience`, { lower: true });
  const count = await mongoose
    .model("InterviewExperience")
    .countDocuments({ company: this.company });
  const shortHash = this._id.toString().slice(-4);

  this.slug = `${base}-${count + 1}-${shortHash}`;
});

module.exports = mongoose.model(
  "InterviewExperience",
  InterviewExperienceSchema,
);
