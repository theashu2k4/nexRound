const express = require("express");
const userAuth = require("../middlewares/userAuth");
const InterviewExperience = require("../models/Experience");
const likeRouter = express.Router();

likeRouter.post("/experiences/:id/likes", userAuth, async (req, res) => {
  try {
    const experience = await InterviewExperience.findById(req.params.id);

    // Check if the experience exists
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    // Check if the user has already liked the experience
    const alreadyLiked = experience.likes.users.some(
        (userId) => userId.toString() === (req.user._id.toString()));

// If the user hasn't liked the experience yet, add the like
    if (!alreadyLiked) {
        experience.likes += 1;
    }
// Add the user's ID to the list of users who liked the experience
    experience.likes.users.push(req.user._id);

// Update the like count based on the number of users who liked the experience
    experience.likes.count = experience.likes.users.length;
    await experience.save();
    res.status(200).json({ message: "Like added successfully", likes: experience.likes });
}
  catch (err) {
    res.status(500).json({ message: "An error occurred while adding the like" 
    });
  }
});

// UNLIKE
likeRouter.delete("/experience/:id/like", userAuth, async (req, res) => {
  try {
    const experience = await InterviewExperience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
// Check if the user has already liked the experience
    const alreadyLiked = experience.likes.users.some(
      (userId) => userId.toString() === req.user._id.toString()
    );
// If the user hasn't liked the experience yet, return an error
    if (!alreadyLiked) {
      return res.status(400).json({ message: "Not liked yet" });
    }
// Remove the user's ID from the list of users who liked the experience and update the like count
    experience.likes.users.pull(req.user._id);
    experience.likes.count = experience.likes.users.length;

    await experience.save();

    res.status(200).json({ message: "Unliked", likesCount: experience.likes.count });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong: " + err.message });
  }
});

module.exports = likeRouter;