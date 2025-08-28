import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: String,
  githubId: String,
  accessToken: String
});

export default mongoose.model("Team", teamSchema);
