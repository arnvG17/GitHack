import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  repoName: String,
  latestCommit: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Submission", submissionSchema);
