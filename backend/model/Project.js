import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  image: { type: String, default: "" },

  // team members — IDs of users
  team: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  // linked to post (optional)
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    default: null
  },

}, { timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", projectSchema);
