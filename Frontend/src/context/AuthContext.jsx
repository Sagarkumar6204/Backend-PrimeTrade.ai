
import { createContext, useState } from 'react'

export const AuthDataContext=createContext()


function AuthContext({children}) {
  let[loading,setLoading]=useState(false);

    let serverUrl="http://localhost:3000";
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
