import React, { useState } from "react";
import API from "../api/axios";
import PostCard from "./PostCard";

export default function PostModal({ post, close, refresh }) {
  // We will reuse PostCard to show details but allow editing via separate UI if needed.
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl p-4 relative">
        <button className="absolute top-3 right-3" onClick={close}>Close</button>

        {/* You can reuse PostCard (it shows actions) */}
        <PostCard post={post} refresh={refresh} />
      </div>
    </div>
  );
}
