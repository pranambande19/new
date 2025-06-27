import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center">
      <div className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome Home!
        </h1>
        <p className="text-white mb-6 text-lg">
          Manage your profile, view your information, and stay connected.
        </p>
        <Link
          to="/profile"
          className="inline-block bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-100 transition-all duration-300"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
