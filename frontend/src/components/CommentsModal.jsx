import { useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import timeAgo from "../utils/timeAgo";



export default function CommentsModal({ post, close, refresh }) {

  const [comment, setComment] = useState("");
  const authUser = useSelector((s) => s.user.user);


  const submitComment = async () => {
    if (!comment.trim()) return;

    await API.put(`/posts/comment/${post._id}`, { text: comment });
    setComment("");
    refresh();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      
      <div className="bg-white w-full max-w-lg rounded-lg shadow p-4">

        <h2 className="text-lg font-bold mb-3">Comments</h2>

        <div className="max-h-64 overflow-y-auto mb-3">
          {(post.comments || []).map((c) => (
  <div key={c._id} className="flex items-start gap-3 py-2 border-b relative">

    <img
      src={c.user.avatar || "https://i.pravatar.cc/50"}
      className="w-8 h-8 rounded-full"
    />

    <div className="flex-1">
      <Link to={`/profile/${c.user._id}`}>
        <p className="font-semibold">{c.user.name}</p>
      </Link>
      <p className="text-sm text-gray-700">{c.text}</p>

      <p className="text-xs text-gray-500">{timeAgo(c.createdAt)}</p>
    </div>

    {/* DELETE BUTTON */}
    {c.user._id === authUser._id && (
      <button
        onClick={async () => {
          await API.delete(`/posts/comment/${post._id}/${c._id}`);
          refresh();
        }}
        className="text-red-500 text-xs absolute right-2 top-2 hover:underline"
      >
        Delete
      </button>
    )}

  </div>
))}

        </div>

        {/* Add a new comment */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={comment}
            placeholder="Write a comment..."
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg bg-gray-50"
          />

          <button
            onClick={submitComment}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Post
          </button>
        </div>

        <button
          onClick={close}
          className="w-full mt-3 py-2 bg-gray-200 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
