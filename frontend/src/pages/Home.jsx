import { useEffect, useState } from "react";
import API from "../api/axios";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await API.get("/posts/all");
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading posts...
      </div>
    );

  return (
    <div className="pt-20 pb-10 px-4 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-bold text-center mb-6">
        Home Feed
      </h2>

      {/* POSTS LIST */}
      <div className="flex flex-col items-center">
        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No posts yet</p>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} post={post} refresh={fetchPosts} />
          ))
        )}
      </div>
    </div>
  );
}
