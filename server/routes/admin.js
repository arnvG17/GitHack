import express from "express";
import Submission from "../models/Submission.js";

const router = express.Router();

router.post("/login", (req, res) => {
  if (req.body.password === process.env.ADMIN_PASSWORD) {
    res.json({ ok: true });
  } else {
    res.status(403).json({ error: "Wrong password" });
  }
});

router.get("/leaderboard", async (req, res) => {
  const subs = await Submission.find().populate("teamId");
  res.json(subs);
});

export default router;
