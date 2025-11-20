import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import CreatePostModal from "./CreatePostModal";
import API from "../api/axios";   // <-- IMPORTANT

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user.user);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearch = async (text) => {
    setSearch(text);

    if (text.trim().length === 0) {
      setResults([]);
      setShowSearch(false);
      return;
    }

    try {
      const { data } = await API.get(`/search?q=${text}`);
      setResults(data);
      setShowSearch(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Create Post Modal */}
      {openCreate && (
        <CreatePostModal
          close={() => setOpenCreate(false)}
          refresh={() => window.location.reload()}
        />
      )}

      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Collab
          </Link>

          {/* Hamburger (Mobile) */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>

          {/* MAIN MENU */}
          <div
            className={`md:flex gap-6 items-center 
            ${open ? "block" : "hidden"} md:block bg-white md:bg-transparent p-4 md:p-0`}
          >
            <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600">
              Home
            </Link>

            <Link to="/explore" className="block py-2 text-gray-700 hover:text-blue-600">
              Explore
            </Link>

            <Link to="/projects" className="block py-2 text-gray-700 hover:text-blue-600">
              Projects
            </Link>

            {/* SEARCH BAR */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search developers..."
                className="w-full px-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
              />

            {/* SEARCH DROPDOWN */}
{showSearch && (
  <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg max-h-64 overflow-y-auto z-50">

    {/* No results message */}
    {results.length === 0 ? (
      <div className="px-4 py-3 text-gray-500 text-sm text-center">
        No developers found
      </div>
    ) : (
      results.map((u) => (
        <Link
          key={u._id}
          to={`/profile/${u._id}`}
          onClick={() => {
            setShowSearch(false);
            setSearch("");
          }}
          className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <img
            src={u.avatar || "https://i.pravatar.cc/50"}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{u.name}</p>
            <p className="text-xs text-gray-500">
              {u.skills?.slice(0, 3).join(", ") || "No skills"}
            </p>
          </div>
        </Link>
      ))
    )}
  </div>
)}

            </div>

            <Link to="/notifications" className="block py-2 text-gray-700 hover:text-blue-600">
              Notifications
            </Link>

            <Link
              to={`/profile/${user?._id}`}
              className="block py-2 text-gray-700 hover:text-blue-600"
            >
              Profile
            </Link>

            {/* CREATE POST BUTTON */}
            <button
              onClick={() => setOpenCreate(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Create
            </button>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="mt-3 md:mt-0 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
