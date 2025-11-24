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
  enum: ["like", "comment", "follow", "collab_request", "collab_accepted", "removed_from_project"],
  required: true
},


  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },

  isRead: { type: Boolean, default: false },

  // ⏳ AUTO DELETE AFTER 5 DAYS
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 24 * 60 * 60, // 5 days
  },

});


export default mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
