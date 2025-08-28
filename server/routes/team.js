import express from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import Submission from "../models/Submission.js";
import Team from "../models/Team.js";

const router = express.Router();

// middleware
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
}

router.get("/repos", auth, async (req, res) => {
  const team = await Team.findById(req.user.id);
  const repos = await axios.get("https://api.github.com/user/repos", {
    headers: { Authorization: `token ${team.accessToken}` }
  });
  res.json(repos.data);
});

router.post("/submit", auth, async (req, res) => {
  const { repoName, commitSha } = req.body;
  const submission = await Submission.findOneAndUpdate(
    { teamId: req.user.id },
    { repoName, latestCommit: commitSha, timestamp: new Date() },
    { upsert: true, new: true }
  );

  const io = req.app.get("io");
  io.to("admins").emit("leaderboardUpdated", submission);

  res.json(submission);
});

export default router;
