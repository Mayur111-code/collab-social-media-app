import { useState } from "react";
import API from "../api/axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LikesModal from "./LikesModal";
import CommentsModal from "./CommentsModal";
import timeAgo from "../utils/timeAgo";

export default function PostCard({ post, refresh }) {
  const [liking, setLiking] = useState(false);
  const [likesModal, setLikesModal] = useState(false);
  const [commentsModal, setCommentsModal] = useState(false);

  const authUser = useSelector((s) => s.user.user);

  const handleLike = async () => {
    setLiking(true);
    await API.put(`/posts/like/${post._id}`);
    refresh();
    setLiking(false);
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm p-4 mb-6 max-w-xl mx-auto">

      {/* AUTHOR */}
      <div className="flex items-center gap-3 mb-3">
        <Link to={`/profile/${post.author._id}`} className="flex items-center gap-3">
          <img
            src={post.author.avatar || "https://avatar.iran.liara.run/public/boy"}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-semibold">{post.author.name}</div>
            <div className="text-xs text-gray-500">{timeAgo(post.createdAt)}</div>
          </div>
        </Link>
      </div>

      {/* CONTENT */}
      <p className="text-gray-800 mb-3">{post.content}</p>

      {/* MEDIA */}
      {post.image && (
        <div className="rounded-lg overflow-hidden mb-3">
          {post.image.includes(".mp4") ? (
            <video controls className="w-full rounded-lg">
              <source src={post.image} type="video/mp4" />
            </video>
          ) : (
            <img src={post.image} className="w-full rounded-lg" />
          )}
        </div>
      )}

      {/* ACTIONS */}
      <div className="flex items-center gap-6 mt-3">
        
        {/* LIKE BUTTON */}
        <button onClick={handleLike} disabled={liking}>
          {post.likes?.includes(authUser?._id) ? 
            <AiFillHeart className="text-red-500 text-2xl" /> : 
            <AiOutlineHeart className="text-gray-700 text-2xl hover:text-red-500" />
          }
        </button>

        {/* LIKE COUNT */}
        <span
          className="text-sm text-gray-700 cursor-pointer hover:text-blue-600"
          onClick={() => setLikesModal(true)}
        >
          {post.likes?.length} likes
        </span>

        {/* COMMENTS COUNT */}
        <span
          className="text-sm text-gray-700 cursor-pointer hover:text-blue-600"
          onClick={() => setCommentsModal(true)}
        >
          {post.comments?.length || 0} comments
        </span>

      </div>

      {/* MODALS */}
      {likesModal && (
        <LikesModal
          likes={post.likedUsers || []}
          close={() => setLikesModal(false)}
        />
      )}

      {commentsModal && (
        <CommentsModal
          post={post}
          refresh={refresh}
          close={() => setCommentsModal(false)}
        />
      )}
    </div>
  );
}
