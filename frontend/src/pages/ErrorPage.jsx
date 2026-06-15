import React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-md">
        {/* Error Code */}
        <h1 className="text-7xl font-bold text-blue-600">404</h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-3">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <Home size={18} />
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
