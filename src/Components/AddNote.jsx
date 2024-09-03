// import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export const AddNote = () => {
  // const { user } = useAuth();

  // const uid = user._id

  const [image,setImage] = useState(null)
  const [title,setTitle] = useState("")

  const handleInput = (e) => {

      let file = e.target.files[0]
      setImage(file)
  }

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
        e.preventDefault()
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);


        try 
        {
            const response = await fetch(`https://cheatsheet-o066.onrender.com/addnote`,{
                method:"POST",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: formData, 
            })

            if(response.ok)
            {
                navigate("/userhome")
            }
            else 
            {
              toast.error("Something went wrong!!")
            }

        } catch (error) {
            console.log("add Notes: ",error)
        }

  }


  return (
    <> 
    <div className="w-full min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4 md:p-10">
      <div className="bg-zinc-900 p-8 rounded-xl border border-cyan-300 w-full max-w-md shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-center text-cyan-400">Add Notes</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              className="w-full py-3 px-4 bg-transparent border-2 border-cyan-400 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
              type="file"
              accept="image/*"
              onChange={handleInput}
              required
            />
          </div>
          <div>
            <input
              className="w-full py-3 px-4 bg-transparent border-2 border-cyan-400 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
              name="title"
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
  );
};
