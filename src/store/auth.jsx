import { Children, createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token,setToken] = useState(localStorage.getItem("token"))

    const [user,setUser] = useState("")

    const storeTokenInLS = (servertoken) => {
        setToken(servertoken)
        return localStorage.setItem('token',servertoken);
    }

    let isLoggedIn = !!token

    //Logout 
    const LogoutUser = () => {
        setUser("")
        setToken("")
        return localStorage.removeItem('token')
    }

    // JWT Authentication 

    const userAuthentication = async () => {
        try 
        {
            const response = await fetch("https://cheatsheet-o066.onrender.com/user",{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            })
            
            if(response.ok)
            {
                const data = await response.json()
                setUser(data.userData)
            }
    
        }
        catch(error)
        {
            console.log(error)
        }
    }

    useEffect(() => {
        userAuthentication()
    },[token])


    return <AuthContext.Provider value={{ isLoggedIn,storeTokenInLS,LogoutUser,user }}>
        {children}
    </AuthContext.Provider>
}


export const useAuth = () => {
    
    const authContextValue = useContext(AuthContext)

    // if(!authContextValue)
    // {
           // throw new Error("auth")
    // }


    return authContextValue

}


