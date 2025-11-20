import { useState } from "react";
import API from "../api/axios";
import { AiOutlineClose } from "react-icons/ai";

export default function CreatePostModal({ close, refresh }) {
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFile = (e) => {
        const f = e.target.files[0];
        if (!f) return;

        setFile(f);
        setPreview(URL.createObjectURL(f));
    };

    const createPost = async () => {
        try {
            setLoading(true);
            let fileUrl = null;

            // Upload file if exists
            if (file) {
                const formData = new FormData();
                formData.append("file", file);

                const uploadRes = await API.post("/upload/file", formData);
                fileUrl = uploadRes.data.url;
            }

            // Create post
            await API.post("/posts/create", {
                content,
                image: fileUrl,
                video: fileUrl,
            });

            setLoading(false);
            close();
            refresh();

        } catch (err) {
            console.log(err);
            alert("Error creating post");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">

                <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-black"
                    onClick={close}
                >
                    <AiOutlineClose size={24} />
                </button>

                <h2 className="text-xl font-bold mb-4 text-gray-800">
                    Create Post
                </h2>

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 h-28 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="What's on your mind?"
                />


                <div className="mt-4">
                    <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFile}
                        className="block"
                    />
                </div>

                {preview && (
                    <div className="mt-3">
                        {file && file.type.startsWith("video/") ? (
                            <video src={preview} controls className="rounded-lg w-full" />
                        ) : (
                            <img src={preview} className="rounded-lg w-full" />
                        )}
                    </div>
                )}

                <button
                    onClick={createPost}
                    disabled={loading}
                    className="w-full mt-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
                >
                    {loading ? "Posting..." : "Post"}
                </button>
            </div>
        </div>
    );
}
