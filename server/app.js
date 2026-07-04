const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "https://nex-round.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

//Routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const likeRouter = require("./routes/like");
const commentRouter = require("./routes/comment");
const experienceRouter = require("./routes/experience");
const feedRouter = require("./routes/feed");
const userRouter = require("./routes/user"); // fixed — was mistakenly requiring ./routes/profile again

// Use the routers

app.use("/api", likeRouter);
app.use("/api", commentRouter);
app.use("/api", experienceRouter);
app.use("/api", authRouter);
app.use("/api", feedRouter);
app.use("/api", profileRouter);
app.use("/api", userRouter);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Start the server
const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err.stack);
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
