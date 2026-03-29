
import { createContext, useState } from 'react'

export const AuthDataContext=createContext()


function AuthContext({children}) {
  let[loading,setLoading]=useState(false);

    let serverUrl="https://backend-primetrade-ai.onrender.com";
   let value={
        serverUrl,
        loading,setLoading
    }
  return (
    <div>
      <AuthDataContext.Provider value={value}>
    {children}
      </AuthDataContext.Provider>
    </div>
  )
}

export default AuthContext
