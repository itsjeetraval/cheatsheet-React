import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Protected = (props) => {

    const {Component} = props 

    const navigate = useNavigate()

    useEffect(() => {
        let isloggedin = localStorage.getItem('token')
        if(!isloggedin)
        {
            navigate('/login')
        }
    })

    return (
        <>  
           <Component />
        </>
    )
}
