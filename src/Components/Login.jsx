import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

export const Login = ({setToken}) => 
{

    const [user,setUser] = useState({
        email : "",
        password:""
    })

    const handleInput = (e) => {
        let name = e.target.name
        let value = e.target.value 

        setUser({
            ...user,
            [name]:value
        })
    }

    const navigate = useNavigate() 

    const handleSubmit = async (e) => {

        e.preventDefault()

        try
        {
            const response = await fetch(`https://cheatsheet-o066.onrender.com/login`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(user),
            })

            if(response.ok)
            {
                const data = await response.json()
                localStorage.setItem('token',data.token)
                setToken(localStorage.getItem('token'))
                toast.success("Login Successfully")
                navigate("/userhome")
            }
            else 
            {
                toast.error("Invalid email or password")
            }

        }
        catch(error)
        {
            console.log("Login ",error)
        }

    }

    return (
        <>  
            <div className="w-full min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
                <div className="bg-zinc-900 p-8 rounded-xl border border-cyan-300 w-full max-w-md shadow-lg">
                    <h1 className="text-4xl font-bold mb-8 text-center">Login Here</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                        className="w-full py-3 px-4 bg-transparent border-2 border-cyan-400 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
                        type="email"
                        value={user.email}
                        onChange={handleInput}
                        placeholder="Enter Email"
                        name="email"
                        required
                        />
                    </div>
                    <div>
                        <input
                        className="w-full py-3 px-4 bg-transparent border-2 border-cyan-400 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
                        type="password"
                        value={user.password}
                        onChange={handleInput}
                        placeholder="Enter Password"
                        name="password"
                        minLength="8"
                        maxLength="16"
                        required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-cyan-800 text-white font-bold rounded-md hover:bg-cyan-700 transition duration-300"
                    >
                        Submit
                    </button>
                    </form>
                </div>
                </div>

        
        </>
    )
}


