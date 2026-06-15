import React from "react";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Spinner */}
      <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-4 text-gray-600 text-lg font-medium">
        Loading, please wait...
      </p>
    </div>
  );
};

export default LoadingScreen;
