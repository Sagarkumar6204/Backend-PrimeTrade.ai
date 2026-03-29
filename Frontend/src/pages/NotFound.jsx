import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-white px-4">
      {/* Animated 404 Text */}
      <h1 className="text-9xl font-extrabold tracking-widest animate-pulse text-blue-500">
        404
      </h1>
      
      <div className="bg-blue-600 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Lost in Space? 🚀
        </h2>
        <p className="text-gray-400 mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved to a different galaxy.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 border border-blue-500 text-blue-500 rounded-lg font-bold hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            Go Back
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all duration-300"
          >
            Return Home
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 text-gray-600 text-xs tracking-widest uppercase">
        Primetrade.ai Intelligence System
      </div>
    </div>
  );
};

export default NotFound;