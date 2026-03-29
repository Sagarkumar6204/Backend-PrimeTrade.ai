import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { userData,loading } = useContext(userDataContext);

  if (loading|| userData===undefined) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
         <span className="ml-3">Verifying Session...</span>
      </div>
    );
  }
  // 1. Agar data abhi fetch ho raha hai (Loading state)
  if (userData === undefined) {
    return <div className="h-screen bg-[#0f172a] text-white flex items-center justify-center font-bold">Loading Security Protocol...</div>;
  }

 
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  
  if (adminOnly && userData.role !== 'admin') {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;