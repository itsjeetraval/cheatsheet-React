import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const AddContent = () => {

  const {id} = useParams()

  const [data,setData] = useState({
    note:id,
    subTitle:"",
    desc:""
  })

  const handleInput = (e) => {
      let name = e.target.name
      let value = e.target.value 

      setData({
        ...data,
        [name]:value
      })
  }

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
      e.preventDefault()

      try
        {
            const response = await fetch(`https://cheatsheet-o066.onrender.com/addcontent`,{
                method:"POST",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  'Content-Type':'application/json',
                },
                body:JSON.stringify(data),
            })

   

            if(response.ok)
            { 
                navigate(`/showcontent/${id}`)
            }
            else 
            {
              toast.warning("Something Went Wrong")
            }

        }
        catch(error)
        {
            console.log("AddContent ",error)
        }
      

  }

  return (
    <>
      <div className="w-full min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4 md:p-10">
      <div className="bg-zinc-900 p-8 rounded-xl border border-cyan-300 w-full max-w-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-cyan-400">Add Content</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              className="w-full py-3 px-4 bg-transparent border-2 border-cyan-400 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
              type="text"
              placeholder="Enter Title"
              value={data.subTitle}
              onChange={handleInput}
              name="subTitle"
              required
            />
          </div>
          <div>
            <textarea
              className="w-full whitespace-pre-wrap break-words py-3 px-4 bg-transparent border-2 border-cyan-400 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
              name="desc"
              rows="6"
              placeholder="Enter Description..."
              value={data.desc}
              onChange={handleInput}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-cyan-900 text-white font-bold rounded-md hover:bg-cyan-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
};
