// import { useState } from "react";
// import API from "../api/axios";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/userSlice";
// import { useNavigate, Link } from "react-router-dom";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await API.post("/auth/register", {
//         name,
//         email,
//         password,
//       });

//       if (data.token) {
//         dispatch(setUser({ user: data.user, token: data.token }));
//         navigate("/login");
//       }

//     } catch (err) {
//       console.log(err);
//       alert("Registration failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">

//         <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
//           Create an Account
//         </h2>

//         <form onSubmit={handleRegister} className="space-y-5">

//           {/* Name */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">
//               Full Name
//             </label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 border rounded-lg bg-gray-50 
//                          focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Mayur Borse"
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               className="w-full px-4 py-2 border rounded-lg bg-gray-50 
//                          focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="you@example.com"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 border rounded-lg bg-gray-50
//                          focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="••••••••"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-600 text-white font-semibold 
//                        rounded-lg hover:bg-blue-700 transition"
//           >
//             Register
//           </button>

//         </form>

//         <p className="text-center text-gray-600 mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600 font-semibold hover:underline">
//             Login
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// }



// import { useState } from "react";
// import API from "../api/axios";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/userSlice";
// import { useNavigate, Link } from "react-router-dom";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await API.post("/auth/register", {
//         name,
//         email,
//         password,
//       });

//       // AUTO LOGIN AFTER REGISTER
//       dispatch(setUser({ user: data.user, token: data.token }));

//       navigate("/"); // home feed
//     } catch (err) {
//       console.log(err);
//       alert(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">

//         <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
//           Create Your Account
//         </h2>

//         <form onSubmit={handleRegister} className="space-y-5">

//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">Name</label>
//             <input
//               type="text"
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-lg bg-gray-50"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">Email</label>
//             <input
//               type="email"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-lg bg-gray-50"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">Password</label>
//             <input
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-lg bg-gray-50"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
//           >
//             Register
//           </button>

//         </form>

//         <p className="text-center text-gray-600 mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600 font-semibold hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import API from "../api/axios";
import { setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFile = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let avatarURL = null;

      // UPLOAD avatar to Cloudinary
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const upload = await API.post("/upload/file", formData);
        avatarURL = upload.data.url;
      }

      // Send registration data
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
        avatar: avatarURL,
      });

      dispatch(setUser({ user: data.user, token: data.token }));
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        {/* AVATAR UPLOAD */}
        <div className="flex flex-col items-center mb-4">
          <label className="cursor-pointer">
            <img
              src={
                preview ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              className="w-24 h-24 rounded-full object-cover border shadow"
            />
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>

          <p className="text-xs text-gray-500 mt-1">Tap to upload photo</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">

          <div>
            <label className="text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg bg-gray-50"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg bg-gray-50"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg bg-gray-50"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
}
