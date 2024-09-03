import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../store/auth"

export const Logout = ({setToken}) => {


    const {LogoutUser} = useAuth()

    useEffect( () => {

        // LogoutUser()

        localStorage.removeItem('token')
        setToken(localStorage.getItem('token'))

    },[LogoutUser])


  return <Navigate to="/login" />
}


