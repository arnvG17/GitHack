import express from "express";
import crypto from "crypto";
import Submission from "../models/Submission.js";
import verifyWebhook from "../utils/verifyWebhook.js";

const router = express.Router();

/**
 * GitHub webhook handler
 * Triggered when a push happens in a repo
 */
router.post("/", express.json({ type: "*/*" }), async (req, res) => {
  try {
    const signature = req.headers["x-hub-signature-256"];
    const event = req.headers["x-github-event"];

    // Verify payload using HMAC + SECRET
    const isValid = verifyWebhook(req.body, signature);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    if (event === "push") {
      const { repository, head_commit } = req.body;

      // Save the commit info into DB
      const newSubmission = new Submission({
        repoId: repository.id,
        repoName: repository.full_name,
        commitId: head_commit.id,
        commitMessage: head_commit.message,
        timestamp: new Date(head_commit.timestamp),
      });

      await newSubmission.save();

      // Emit update event to frontend via socket.io
      req.app.get("io").emit("new_commit", {
        repo: repository.full_name,
        commitMessage: head_commit.message,
        timestamp: head_commit.timestamp,
      });
    }

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
