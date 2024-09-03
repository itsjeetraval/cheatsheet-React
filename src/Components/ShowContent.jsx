

import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

export const ShowContent = () => {

  const {id} = useParams()

  const [data,setData] = useState([])

  const ShowContent = async () => {

      try 
      {
          const response = await fetch(`https://cheatsheet-o066.onrender.com/showContent/${id}`,{
            method:"GET",
            headers:{
              Authorization:`Bearer ${localStorage.getItem("token")}`,
            },
          })

          if(response.ok){
              const contents = await response.json()
              setData(contents.content)
          } else {
            console.log("show content don't work");
          }
      }
      catch(error)
      {
        console.log("showcontent ",error)
      }

  }

  useEffect(() => {
    ShowContent()
  },[])

  const myclick = async (id) => {

    let ans = confirm("Are you sure you want to delete this item?")

    if(ans)
    {
      try 
      {
          const response = await fetch(`https://cheatsheet-o066.onrender.com/deleteContent/${id}`,{
            method:"DELETE",
            headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          })
  
          if(response.ok)
          {
             ShowContent()
          }
  
      }
      catch(error)
      {
        console.log("delete content",error)
      }
  
    }
    

  }

  // <p className="text-lg font-normal mt-2">● {item.desc}</p>
//   dangerouslySetInnerHTML: This React attribute allows you to render HTML content directly. It can be useful for rendering formatted content like code snippets.
// replace(/\n/g, '<br/>'): This JavaScript code replaces all newline characters (\n) with <br/> tags, which ensure that the line breaks in the original input are preserved when rendering.


  return (
    <>
    <div className="w-full min-h-screen bg-zinc-950 text-white p-4 md:p-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Show Content</h1>
        <NavLink to={`/addcontent/${id}`}>
          <img
            src="/plus.png"
            width={45}
            height={45}
            alt="Add Content"
            className="cursor-pointer"
          />
        </NavLink>
      </div>

      <div className="space-y-6">
        {data.length > 0
          ? data.map((item, idx) => (
              <div
                key={idx}
                className="bg-zinc-900 border-2 border-white rounded-lg p-4 space-y-4 relative"
              >
                <h1 className="text-2xl font-semibold">{item.subTitle}</h1>
                <hr className="border-cyan-500" />

                <div
                  className="text-lg font-normal mt-2 whitespace-pre-wrap break-words"
                  dangerouslySetInnerHTML={{ __html: item.desc.replace(/\n/g, '<br/>') }}
                />
                <img
                  src="/delete.svg"
                  width={25}
                  height={25}
                  alt="Delete"
                  className="absolute top-4 right-4 bg-cyan-400 rounded-md cursor-pointer"
                  onClick={() => myclick(item._id)}
                />
              </div>
            ))
          : <p className="text-center text-gray-400">No content available</p>}
      </div>
    </div>
    </>
  );
};




