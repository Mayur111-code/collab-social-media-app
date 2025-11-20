import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditProfileModal from "../components/EditProfileModal";
import PostGridItem from "../components/PostGridItem";
import PostModal from "../components/PostModal";

export default function Profile() {
  const { id } = useParams();
  const authUser = useSelector((s) => s.user.user);

  const [followersModal, setFollowersModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);

  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [{ data: u }, { data: p }] = await Promise.all([
        API.get(`/user/${id}`),
        API.get(`/posts/user/${id}`)
      ]);

      setUser(u);
      setPosts(p);

      setFollowersCount(u.followers?.length || 0);

      setIsFollowing(
        authUser
          ? (u.followers || []).some(
              (f) => f.toString() === authUser._id || f === authUser._id
            )
          : false
      );

    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) return <div className="pt-24 text-center">Loading...</div>;

  const handleFollow = async () => {
    try {
      const res = await API.put(`/user/follow/${id}`);
      setIsFollowing(true);
      setFollowersCount(res.data.followersCount);
    } catch (err) {
      console.error(err);
      alert("Follow failed");
    }
  };

  const handleUnfollow = async () => {
    try {
      const res = await API.put(`/user/unfollow/${id}`);
      setIsFollowing(false);
      setFollowersCount(res.data.followersCount);
    } catch (err) {
      console.error(err);
      alert("Unfollow failed");
    }
  };

  // -------- Followers / Following Modals -------- //

  const openFollowers = async () => {
    const { data } = await API.get(`/user/followers/${id}`);
    setFollowersList(data);
    setFollowersModal(true);
  };

  const openFollowing = async () => {
    const { data } = await API.get(`/user/following/${id}`);
    setFollowingList(data);
    setFollowingModal(true);
  };

  // Toggle follow/unfollow inside modal
  const handleFollowToggle = async (targetId) => {
    try {
      const alreadyFollowing = followersList.some((u) => u._id === authUser._id);

      if (alreadyFollowing) {
        await API.put(`/user/unfollow/${targetId}`);
      } else {
        await API.put(`/user/follow/${targetId}`);
      }

      fetchData();
      openFollowers();
      openFollowing();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-24 px-4 max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.avatar || "https://avatar.iran.liara.run/public/boy"}
          alt="avatar"
          className="w-28 h-28 rounded-full object-cover border"
        />

        <div className="flex-1">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">{user.name}</h1>

            {/* Edit button (if my profile) */}
            {authUser && authUser._id === user._id && (
              <button
                onClick={() => setOpenEdit(true)}
                className="ml-2 px-3 py-1 bg-blue-600 text-white rounded"
              >
                Edit Profile
              </button>
            )}

            {/* Follow / Unfollow */}
            {authUser && authUser._id !== user._id && (
              isFollowing ? (
                <button onClick={handleUnfollow} className="ml-2 px-3 py-1 bg-gray-200 rounded">
                  Unfollow
                </button>
              ) : (
                <button onClick={handleFollow} className="ml-2 px-3 py-1 bg-blue-600 text-white rounded">
                  Follow
                </button>
              )
            )}
          </div>

          <p className="text-sm text-gray-600 mt-2">{user.bio}</p>

          {/* Skills */}
          <div className="mt-3 flex flex-wrap gap-2">
            {user.skills?.map((s, i) => (
              <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {s}
              </span>
            ))}
          </div>

          {/* Posts / Followers / Following */}
          <div className="mt-3 text-sm text-gray-700 flex gap-6">
            <span className="cursor-pointer hover:text-blue-600" onClick={openFollowers}>
              <b>{followersCount}</b> Followers
            </span>

            <span className="cursor-pointer hover:text-blue-600" onClick={openFollowing}>
              <b>{user.following?.length || 0}</b> Following
            </span>

            <span><b>{posts.length}</b> Posts</span>
          </div>
        </div>
      </div>

      {/* POSTS GRID */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Posts</h2>

        {posts.length === 0 ? (
          <p className="text-gray-600">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {posts.map((p) => (
              <PostGridItem
                key={p._id}
                post={p}
                onOpen={() => setSelectedPost(p)}
                isOwner={authUser && authUser._id === p.author._id}
                refresh={fetchData}
              />
            ))}
          </div>
        )}
      </div>

      {/* EDIT PROFILE MODAL */}
      {openEdit && (
        <EditProfileModal
          user={user}
          close={() => { setOpenEdit(false); fetchData(); }}
        />
      )}

      {/* POST MODAL */}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          close={() => setSelectedPost(null)}
          refresh={fetchData}
        />
      )}

     {/* FOLLOWERS MODAL */}
{followersModal && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white w-80 rounded-lg shadow p-4">
      <h2 className="text-lg font-bold mb-3">Followers</h2>

      <div className="max-h-64 overflow-y-auto">
        {followersList.map((u) => (
          <Link
            to={`/profile/${u._id}`}
            key={u._id}
            className="flex items-center gap-3 py-2 border-b hover:bg-gray-100 rounded cursor-pointer"
            onClick={() => setFollowersModal(false)}   // close modal on click
          >
            <img
              src={u.avatar || "https://avatar.iran.liara.run/public/boy"}
              className="w-10 h-10 rounded-full"
            />

            <div className="flex-1">
              <p className="font-semibold">{u.name}</p>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={() => setFollowersModal(false)}
        className="w-full mt-3 py-2 bg-gray-200 rounded"
      >
        Close
      </button>
    </div>
  </div>
)}

{/* FOLLOWING MODAL */}
{followingModal && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white w-80 rounded-lg shadow p-4">
      <h2 className="text-lg font-bold mb-3">Following</h2>

      <div className="max-h-64 overflow-y-auto">
        {followingList.map((u) => (
          <Link
            to={`/profile/${u._id}`}
            key={u._id}
            className="flex items-center gap-3 py-2 border-b hover:bg-gray-100 rounded cursor-pointer"
            onClick={() => setFollowingModal(false)}
          >
            <img
              src={u.avatar || "https://avatar.iran.liara.run/public/boy"}
              className="w-10 h-10 rounded-full"
            />

            <div className="flex-1">
              <p className="font-semibold">{u.name}</p>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={() => setFollowingModal(false)}
        className="w-full mt-3 py-2 bg-gray-200 rounded"
      >
        Close
      </button>
    </div>
  </div>
)}


    </div>
  );
}
