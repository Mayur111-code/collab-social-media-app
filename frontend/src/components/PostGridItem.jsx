import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import API from "../api/axios";

export default function PostGridItem({ post, onOpen, isOwner, refresh }) {

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!confirm("Delete this post?")) return;
    try {
      await API.delete(`/posts/delete/${post._id}`);
      refresh();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    // for edit, open the PostModal (PostModal should allow editing if isOwner)
    onOpen();
  };

  const thumb = post.image || post.video || "https://i.pravatar.cc/300";

  return (
    <div className="relative cursor-pointer group" onClick={onOpen}>
      <img src={thumb} alt="post" className="w-full h-48 object-cover rounded-lg" />
      {/* overlay actions, visible on hover */}
      {isOwner && (
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button onClick={handleEditClick} className="p-2 bg-white rounded shadow">
            <FiEdit2 />
          </button>
          <button onClick={handleDelete} className="p-2 bg-white rounded shadow">
            <FiTrash2 />
          </button>
        </div>
      )}
    </div>
  );
}
