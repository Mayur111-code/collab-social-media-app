import { Link } from "react-router-dom";

export default function LikesModal({ likes, close }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-80 rounded-lg shadow p-4">

        <h2 className="text-lg font-bold mb-3">Liked by</h2>

        <div className="max-h-64 overflow-y-auto">
          {likes.length === 0 ? (
            <p className="text-center text-gray-500 py-3">No likes yet</p>
          ) : (
            likes.map((u) => (
              <Link
                key={u._id}
                to={`/profile/${u._id}`}
                onClick={close}
                className="flex items-center gap-3 py-2 border-b hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={u.avatar || "https://i.pravatar.cc/50"}
                  className="w-10 h-10 rounded-full"
                />
                <p className="font-semibold">{u.name}</p>
              </Link>
            ))
          )}
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
