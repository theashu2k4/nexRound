const experienceRouter = require("express").Router();
const userAuth = require("../middlewares/userAuth");
const InterviewExperience = require("../models/Experience");

//CREATE
experienceRouter.post("/experience", userAuth, async (req, res) => {
  try {
    const {
      company,
      role,
      jobType,
      result,
      mode,
      ctc,
      difficulty,
      postTitle,
      tags,
      rounds,
      content,
    } = req.body;

    const experience = new InterviewExperience({
      author: req.user._id,
      company,
      role,
      jobType,
      result,
      mode,
      ctc,
      difficulty,
      postTitle,
      tags,
      rounds,
      content,
      noOfRounds: rounds ? rounds.length : 0,
    });
    await experience.save();

    req.user.experiences.push(experience._id);
    await req.user.save();

    res
      .status(201)
      .json({ message: "Experience posted successfully", data: experience });
  } catch (err) {
    console.error("FULL ERROR:", err); 
    res.status(400).json({ message: "ERROR : " + err.message });
  }
});

experienceRouter.get("/my-experiences", userAuth, async (req, res) => {
  try {
    const experiences = await InterviewExperience.find({
      author: req.user._id,
    })
      .sort({
        createdAt: -1,
      })
      .populate("author", "name profilePicture college");

    res.status(200).json({
      data: experiences,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


//GET by Slug
experienceRouter.get("/experience/:slug", async (req, res) => {
  try {
    const experience = await InterviewExperience.findOne({
      slug: req.params.slug,
    })
      .populate("author", "name profilePicture college")
      .populate("comments.user", "name profilePicture");

    if (!experience) {
      return res.status(400).json({ message: "Experience not Found" });
    }

    res.status(200).json({ message: "Experience found", data: experience });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong: " + err.message });
  }
});

//UPDATE
experienceRouter.patch("/experience/:id", userAuth, async (req, res) => {
  try {
    const experience = await InterviewExperience.findById(req.params.id);

    const allowedUpdates = [
      "postTitle",
      "content",
      "tags",
      "rounds",
      "result",
      "mode",
      "ctc",
      "difficulty",
    ];

    if (!experience) {
      return res.status(400).json({ message: "Experience not found" });
    }

    //Check if the user is the author of the experience
    if (experience.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this experience" });
    }

    //Update the experience with the provided fields
    allowedUpdates.forEach((key) => {
      if (req.body[key] !== undefined) {
        experience[key] = req.body[key];
      }
    });

    // Update the number of rounds if rounds are provided
    if (req.body.rounds) {
      experience.noOfRounds = req.body.rounds.length;
    }

    await experience.save();
    res
      .status(200)
      .json({ message: "Experience updated successfully", data: experience });
  } catch (err) {
    res.status(500).json({ message: "ERROR: " + err.message });
  }
});

//DELETE
experienceRouter.delete("/experience/:id", userAuth, async (req, res) => {
  try {
    const experience = await InterviewExperience.findById(req.params.id);
    if (!experience) {
      return res.status(400).json({ message: "Experience not found" });
    }
    //Check if the user is the author of the experience
    if (experience.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this experience" });
    }

    //Delete the experience
    await experience.deleteOne();

    //Remove the experience from the user's experiences array
    req.user.experiences.pull(experience._id);

    //Save the user
    await req.user.save();

    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "ERROR: " + err.message });
  }
});

// GET all experiences for a specific company (public — no auth required for browsing)
experienceRouter.get("/experiences/company/:companyName", async (req, res) => {
  try {
    const experiences = await InterviewExperience.find({
      company: req.params.companyName,
    })
      .sort({ createdAt: -1 })
      .populate("author", "name profilePicture college");

    res.status(200).json({
      data: experiences,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = experienceRouter;