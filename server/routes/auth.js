import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import Team from "../models/Team.js";

const router = express.Router();

router.get("/github/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      { headers: { Accept: "application/json" } }
    );

    const accessToken = tokenRes.data.access_token;
    const userRes = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${accessToken}` }
    });

    let team = await Team.findOne({ githubId: userRes.data.id });
    if (!team) {
      team = await Team.create({
        githubId: userRes.data.id,
        name: userRes.data.login,
        accessToken
      });
    } else {
      team.accessToken = accessToken;
      await team.save();
    }

    const token = jwt.sign({ id: team._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.redirect(`http://localhost:3000/team-dashboard?token=${token}`);
  } catch (err) {
    res.status(500).json({ error: "Auth failed" });
  }
});

export default router;

