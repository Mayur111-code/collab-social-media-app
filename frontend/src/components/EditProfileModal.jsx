import { useState } from "react";
import API from "../api/axios";
import { AiOutlineClose } from "react-icons/ai";

export default function EditProfileModal({ user, close }) {
  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [skills, setSkills] = useState((user.skills || []).join(","));
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(user.avatar || null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const save = async () => {
    try {
      setLoading(true);
      let avatarUrl = null;

      if (file) {
        const fd = new FormData();
        fd.append("file", file);
        const r = await API.post("/upload/file", fd);
        avatarUrl = r.data.url;
      }

      const body = {
        name,
        bio,
        skills
      };

      // If avatar uploaded, backend upload route already returned URL saved above
      if (avatarUrl) {
        // The user update endpoint expects file via multer; but we can pass avatar url via body
        // We opted earlier that updateProfile expects multer file, but here we call endpoint that supports direct fields.
        // Simpler: call update via formData with 'file' (the cloud upload already done) OR we can call update route with formData below.
      }

      // Use multipart form to allow avatar via file (preferred)
      const form = new FormData();
      form.append("name", name);
      form.append("bio", bio);
      form.append("skills", skills);
      if (file) form.append("file", file);

      await API.put("/user/update", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(false);
      close();

    } catch (err) {
      console.error(err);
      alert("Update failed");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-5 relative">
        <button className="absolute top-3 right-3" onClick={close}>
          <AiOutlineClose size={20} />
        </button>

        <h3 className="text-xl font-semibold mb-3">Edit Profile</h3>

        <div className="space-y-3">
          <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full border px-3 py-2 rounded" />
          <textarea value={bio} onChange={(e)=>setBio(e.target.value)} className="w-full border px-3 py-2 rounded h-24" />
          <input value={skills} onChange={(e)=>setSkills(e.target.value)} placeholder="js,react,node" className="w-full border px-3 py-2 rounded" />

          <div>
            <input type="file" accept="image/*" onChange={handleFile} />
            {preview && <img src={preview} className="mt-2 w-24 h-24 object-cover rounded-full" />}
          </div>

          <button onClick={save} disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded">
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
