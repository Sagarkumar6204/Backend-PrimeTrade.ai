
import { createContext, useState } from 'react'

export const AuthDataContext=createContext()//Ek data container banaIske andar future me hoga:serverUrluser token login() logout() 


function AuthContext({children}) {
  let[loading,setLoading]=useState(false);

    let serverUrl="http://localhost:3000";//Backend ka base URL Fayda Har component me same URL
   let value={
        serverUrl,
        loading,setLoading
    }
  return (//ye parent hai app ka or app children hai parent ka 
    <div>
      <AuthDataContext.Provider value={value}>
    {children}
      </AuthDataContext.Provider>
    </div>
  )
}

export default AuthContext
