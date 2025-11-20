import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true
  },

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  type: {
    type: String,
    enum: ["like", "comment", "collab_request", "collab_accepted"],
    required: true
  },

  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    default: null
  },

  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    default: null
  },

  isRead: { type: Boolean, default: false }

}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
