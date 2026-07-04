const express = require("express");
const router = express.Router();
const InterviewExperience = require("../models/Experience");

router.get("/feed", async (req, res) => {
  try {
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

    // Top Companies
    const topCompanies = await InterviewExperience.aggregate([
      {
        $group: {
          _id: "$company",
          experienceCount: { $sum: 1 },
        },
      },
      {
        $sort: {
          experienceCount: -1,
        },
      },
      {
        $limit: 8,
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          experienceCount: 1,
        },
      },
    ]);

    // Trending Tags
    const trendingTags = await InterviewExperience.aggregate([
      {
        $match: {
          createdAt: { $gte: ninetyDaysAgo },
        },
      },
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 0,
          tag: "$_id",
          count: 1,
        },
      },
    ]);

    // Trending Experiences
    const trendingExperiences = await InterviewExperience.aggregate([
      {
        $match: {
          createdAt: {
            $gte: ninetyDaysAgo,
          },
        },
      },

      {
        $addFields: {
          score: {
            $add: [
              {
                $ifNull: ["$likes.count", 0],
              },
              {
                $size: {
                  $ifNull: ["$comments", []],
                },
              },
            ],
          },
        },
      },

      {
        $sort: {
          score: -1,
          createdAt: -1,
        },
      },

      {
        $limit: 10,
      },

      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
          pipeline: [
            {
              $project: {
                name: 1,
                profilePicture: 1,
                college: 1,
              },
            },
          ],
        },
      },

      // don't remove experience if author missing
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $project: {
          postTitle: 1,
          company: 1,
          role: 1,
          difficulty: 1,
          jobType: 1,
          result: 1,
          noOfRounds: 1,
          tags: 1,
          slug: 1,
          createdAt: 1,

          likes: {
            count: {
              $ifNull: ["$likes.count", 0],
            },
          },

          commentsCount: {
            $size: {
              $ifNull: ["$comments", []],
            },
          },

          content: {
            $substr: ["$content", 0, 200],
          },

          author: 1,
          score: 1,
        },
      },
    ]);

    res.status(200).json({
      topCompanies,
      trendingExperiences,
      trendingTags,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Something went wrong: " + err.message,
    });
  }
});

module.exports = router;
