import React from 'react';
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4">
      
      {/* Content Container */}
      <div className="max-w-3xl text-center space-y-8">
        
        {/* Animated Badge (Optional Aesthetic) */}
        <div className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wide text-blue-600 uppercase bg-blue-100 rounded-full animate-bounce">
          New: Version 2.0 is Live
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          Manage Your Tasks with <span className="text-blue-600">Precision.</span>
        </h1>

        {/* Short Content/Description */}
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Sagnir Technologies presents a powerful platform to streamline your workflow. 
          Whether you're an <strong>Admin</strong> managing a team or a <strong>User</strong> 
          tracking daily goals, we've got you covered.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button
            onClick={() => navigate('/register')}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-blue-200 transition-all duration-300 transform hover:-translate-y-1"
          >
            Create Account
          </button>
          
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-800 font-bold rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 shadow-sm transition-all duration-300 transform hover:-translate-y-1"
          >
            Sign In
          </button>
        </div>

        {/* Simple Feature List (Trust Building) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-gray-200">
          <div className="flex flex-col items-center">
            <div className="p-3 bg-white rounded-lg shadow-sm mb-3">🚀</div>
            <h3 className="font-semibold text-gray-800">Fast Performance</h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-3 bg-white rounded-lg shadow-sm mb-3">🛡️</div>
            <h3 className="font-semibold text-gray-800">Secure Data</h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-3 bg-white rounded-lg shadow-sm mb-3">📊</div>
            <h3 className="font-semibold text-gray-800">Role Management</h3>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="absolute bottom-6 text-gray-400 text-sm">
        © 2026 Sagnir Technologies. Built with ❤️ for Giridih.
      </footer>
    </div>
  );
};

export default GetStarted;