const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middlewares/userAuth");

// Returns the currently logged-in user, based on the JWT cookie.
// userAuth middleware verifies the cookie and attaches req.user;
// if there's no valid cookie it should respond 401 before reaching here.
userRouter.get("/user", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.json({
      data: {
        name: user.name,
        emailId: user.emailId,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = userRouter;