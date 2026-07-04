const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const multer = require("multer");

const profileRouter = express.Router();
const userAuth = require("../middlewares/userAuth");
const cloudinary = require("../config/cloudinary"); // adjust path to wherever you saved cloudinary.js

// Memory storage — file lives briefly in RAM as a buffer, then gets streamed
// to Cloudinary. Nothing is written to local disk, so this works fine on
// hosts with ephemeral/read-only filesystems.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB cap
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    res.status(200).json({ user: loggedInUser });
  } catch (err) {
    res.status(400).json({ message: "ERROR: " + err.message });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    // NOTE: "firstName" and "lastName" were removed from this list — the User
    // schema only has a single "name" field. Mongoose silently drops unknown
    // fields on save by default, so firstName/lastName edits were never
    // actually persisting. Use "name" instead.
    const allowedEditFields = [
      "name",
      "emailId",
      "college",
      "graduationYear",
      "branch",
      "skills",
      "profilePicture",
    ];
    const isEditAllowed = Object.keys(req.body).every((field) =>
      allowedEditFields.includes(field),
    );

    const loggedInUser = req.user;

    if (!isEditAllowed) {
      return res.status(400).json({
        message: "You are trying to edit fields that are not allowed",
      });
    }

    Object.keys(req.body).forEach((key) => {
      if (allowedEditFields.includes(key)) {
        loggedInUser[key] = req.body[key];
      }
    });
    await loggedInUser.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: loggedInUser,
    });
  } catch (err) {
    res.status(400).json({
      message: "ERROR : " + err.message,
    });
  }
});

// Change password — requires the current password for verification before
// allowing the change. Distinct from /profile/edit because it needs that
// extra check and a hashing step, rather than a plain field overwrite.
profileRouter.patch("/profile/change-password", userAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are both required",
      });
    }

    if (!validator.isStrongPassword(newPassword)) {
      return res.status(400).json({
        message:
          "New password must be strong (min 8 chars, upper/lowercase, number, symbol)",
      });
    }

    // req.user from userAuth was fetched without the password field
    // (schema has select: false), so re-fetch this one user WITH password.
    const User = require("../models/User");
    const userWithPassword = await User.findById(req.user._id).select(
      "+password",
    );

    const matches = await bcrypt.compare(
      currentPassword,
      userWithPassword.password,
    );
    if (!matches) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const saltRounds = 10;
    userWithPassword.password = await bcrypt.hash(newPassword, saltRounds);
    await userWithPassword.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(400).json({ message: "ERROR: " + err.message });
  }
});

// Avatar upload — accepts a single file under the field name "avatar",
// uploads it to Cloudinary, then saves the resulting URL onto the user's
// profilePicture field. Frontend must send this as multipart/form-data,
// NOT JSON (so it can't go through the generic /profile/edit route).
profileRouter.post(
  "/profile/avatar",
  userAuth,
  upload.single("avatar"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      // Convert the in-memory buffer to a data URI Cloudinary's SDK accepts
      const base64 = req.file.buffer.toString("base64");
      const dataUri = `data:${req.file.mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "nexround/avatars",
        public_id: `user_${req.user._id}`,
        overwrite: true,
        transformation: [{ width: 300, height: 300, crop: "fill" }],
      });

      const loggedInUser = req.user;
      loggedInUser.profilePicture = result.secure_url;
      await loggedInUser.save();

      res.status(200).json({
        message: "Avatar updated successfully",
        profilePicture: result.secure_url,
        user: loggedInUser,
      });
    } catch (err) {
      res.status(400).json({ message: "ERROR: " + err.message });
    }
  },
);

module.exports = profileRouter;
