
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./Components/Home"
import { About } from "./Components/About"
import { Signup } from "./Components/Signup"
import { Login } from "./Components/Login"
import { Logout } from "./Components/Logout"
import { Navbar } from "./Components/Navbar"
import { AddNote } from "./Components/addNote"
import { Userhome } from "./Components/Userhome"
import { ShowContent } from "./Components/ShowContent"
import { AddContent } from "./Components/AddContent"
import { Footer } from "./Components/Footer"
import { useState } from "react"
import { Protected } from "./Components/Protected"

const App = () => {

  const [token,setToken] = useState(localStorage.getItem('token'))

  return (
    <>  
      <BrowserRouter>
        <Navbar token={token} />
      
        <Routes>

            <Route path="/"  element={<Home/>} />
            <Route path="/about"  element={<About/>} />
            <Route path="/signUp"  element={< Signup />} />
            <Route path="/login"   element={<Login  setToken={setToken} />} />
            <Route path="/logout"  element={<Logout setToken={setToken} />} />
            <Route path="/addNote"  element={<Protected Component={AddNote} />} />
            <Route path="/userhome"  element={<Protected Component={Userhome} />} />
            <Route path="/showcontent/:id"  element={<Protected Component={ShowContent} />} />
            <Route path="/addcontent/:id"  element={<Protected Component={AddContent} />} />

        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App

