
import { useContext,createContext,useState, useEffect,} from 'react';
import { AuthDataContext } from './AuthContext';
import axios from 'axios';


export const userDataContext=createContext();

function UserContext({children}) {
let {serverUrl}=useContext(AuthDataContext);
let [userData,setUserData]=useState(undefined);
const [loading, setLoading] = useState(true);
const getCurrentUser=async()=>{
    try {
      setLoading(true)
        let result=await axios.get(serverUrl+"/api/v1/user/currentuser",{withCredentials:true})
        setUserData(result.data)
    } catch (error) {
        setUserData(null);
        console.log("Error in getting current user:",error);   
    }
    finally{
      setLoading(false);
    }
}
useEffect(()=>{
    getCurrentUser();
},[])

    let value={userData,setUserData,getCurrentUser,loading}

    
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext
