const express = require("express");
const authRouter = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const userAuth = require("../middlewares/userAuth");
const jwt = require("jsonwebtoken");
var validator = require("validator");
const Otp = require("../models/Otp");
const { sendOtpEmail } = require("../utils/sendEmail");

// Single source of truth for how long a login session lasts.
// Keeping the JWT and the cookie in sync avoids a "valid cookie, dead token" gap.
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};

authRouter.post("/signUp", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const name = `${firstName} ${lastName}`;

    //EmailId Validation
    const existingUser = await User.findOne({ emailId: emailId });
    if (existingUser) {
      throw new Error("This EmailId already exists");
    }

    // Confirm this email was actually OTP-verified before allowing signup.
    // Otp schema field is `email`, request body field is `emailId` — map explicitly.
    const verifiedOtp = await Otp.findOne({ email: emailId, verified: true });
    if (!verifiedOtp) {
      throw new Error(
        "Please verify your email with the OTP before signing up",
      );
    }

    //Password Hashing
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(password, saltRounds);

    //Create new user
    const newUser = new User({
      name,
      emailId,
      password: hashPass,
    });
    await newUser.save();

    // Consume the verified OTP record so it can't be reused
    await Otp.deleteOne({ _id: verifiedOtp._id });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Email");
    }

    const user = await User.findOne({ emailId }).select("+password");
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const matchPass = await bcrypt.compare(password, user.password);

    if (!matchPass) {
      throw new Error("Incorrect Password");
    } else {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: SESSION_DURATION_MS / 1000,
      });
      res.cookie("token", token, {
        ...cookieOptions,
        expires: new Date(Date.now() + SESSION_DURATION_MS),
      });

      res.json({
        message: "Login Successful",
        data: {
          name: user.name,
          emailId: user.emailId,
        },
      });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.json({ message: "Logout Successful" });
});

authRouter.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await Otp.deleteMany({ email });
  await Otp.create({ email, otp });

  try {
    await sendOtpEmail(email, otp);
    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("SEND OTP ERROR:", err);
    res.status(500).json({ message: err.message || "Failed to send OTP" });
  }
});

authRouter.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Look up by the code the user actually typed — this is what validates the OTP.
    const record = await Otp.findOne({ email, otp });
    if (!record) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Now that it's confirmed valid, mark it verified for /signUp to check later.
    record.verified = true;
    await record.save();

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    res.status(500).json({ message: error.message || "Failed to verify OTP" });
  }
});

module.exports = authRouter;
