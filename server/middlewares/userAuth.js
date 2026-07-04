const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Middleware to authenticate user
const userAuth = async (req, res, next) => {
  try {
    //Get token from cookies
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    //Verify Token
    const decodedObj = jwt.verify(token, process.env.JWT_SECRET);

    //Find User
    const user = await User.findById(decodedObj._id);

    //If user not found
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    //Attach user to request object
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Authentication Failed: " + err.message,
    });
  }
};

module.exports = userAuth;
