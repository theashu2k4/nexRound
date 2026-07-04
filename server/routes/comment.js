const express = require("express");
const InterviewExperience = require("../models/Experience");
const userAuth = require("../middlewares/userAuth");

const commentRouter = express.Router();

commentRouter.get("/experience/:id/comments", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const experience = await InterviewExperience.findById(req.params.id)
      .populate("comments.user", "name profilePicture")
      .select("comments");

    if (!experience) {
      return res.status(404).json({ message: "This is an Invalid Id" });
    }

    // Sort the comments in descending order based on the createdAt field
    const sortedComments = experience.comments.sort(
      (a, b) => b.createdAt - a.createdAt,
    );

    // Implement pagination logic
    const startIdx = (page - 1) * limit;
    const endIdx = startIdx + limit;
    const paginatedComments = sortedComments.slice(startIdx, endIdx);

    res.status(200).json({
      data: paginatedComments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(sortedComments.length / limit),
        totalComments: experience.comments.length,
        hasMore: startIdx + limit < experience.comments.length,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "ERROR: " + err.message });
  }
});

commentRouter.post("/experience/:id/comment", userAuth, async (req, res) => {
  try {
    const { text } = req.body;

    // Validate that the comment text is provided and not empty
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }
    // Find the experience by ID
    const experience = await InterviewExperience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: "This is an Invalid Id" });
    }
    // Add the new comment to the experience's comments array
    experience.comments.push({
      user: req.user._id,
      text: text.trim(),
      createdAt: new Date(),
    });

    await experience.save();
    // Get the newly added comment (the last one in the array)
    const newComment = experience.comments[experience.comments.length - 1];

    res
      .status(201)
      .json({
        message: "Comment added successfully",
        commentsCount: experience.comments.length,
        newComment,
      });
  } catch (err) {
    res.status(500).json({ message: "ERROR: " + err.message });
  }
});

module.exports = commentRouter;