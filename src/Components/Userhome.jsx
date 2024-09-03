import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { NavLink } from "react-router-dom";

export const Userhome = () => {
  const BASEURL = "https://cheatsheet-o066.onrender.com/uploads/";

  const [unote, setUnote] = useState([]);

  const dataShow = async () => {
    try {
      const response = await fetch("https://cheatsheet-o066.onrender.com/showNotes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const notes = await response.json();
        // console.log(notes.notes);
        setUnote(notes.notes);
      } else {
        console.log("show notes don't work");
      }
    } catch (error) {
      console.log("NoteShow : ", error);
    }
  };

  useEffect(() => {
    dataShow();
  }, []);

  const deleteNote = async (id) => {
    let ans = confirm("Are you sure you want to delete this item?");

    if (ans) {
      try {
        const response = await fetch(`https://cheatsheet-o066.onrender.com/deleteNote/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          dataShow();
        }
      } catch (error) {
        console.log("delete content", error);
      }
    }
  };

  //https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80

  return (
    <>
      <div className="w-full min-h-screen bg-zinc-950 text-white p-4 md:p-10">
        <h1 className="font-bold text-3xl text-cyan-400 mb-6">Your Notes</h1>

        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {unote.length > 0 ? (
              unote.map((data) => (
                <div
                  key={data._id}
                  className="relative flex flex-col bg-white text-gray-700 shadow-lg rounded-xl overflow-hidden"
                >
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={`${BASEURL}/${data.image}`}
                      alt="card-image"
                    />
                  </div>

                  <div className="p-4">
                    <h5 className="text-xl font-semibold mb-2 text-blue-gray-900">
                      {data.title}
                    </h5>
                  </div>

                  <div className="p-4 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 bg-gray-100">
                    <NavLink to={`/showcontent/${data._id}`}>
                      <button
                        className="font-bold text-center uppercase text-xs py-2 px-4 rounded-lg bg-gray-900 text-white shadow-md hover:bg-gray-800 focus:outline-none transition duration-300"
                        type="button"
                      >
                        Read More
                      </button>
                    </NavLink>

                    <div className="flex items-center justify-end w-full sm:w-auto">
                      <img
                        src="/delete.svg"
                        width={24}
                        height={24}
                        alt="Delete"
                        className="cursor-pointer"
                        onClick={() => deleteNote(data._id)}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-gray-400">
                No notes available
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
