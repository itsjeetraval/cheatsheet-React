import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <div className="relative bg-gradient-to-r from-black to-zinc-700">

        <div className="absolute inset-0 bg-black opacity-50"></div>
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4">
          <div className="container mx-auto max-w-3xl px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Welcome to Cheatsheet
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-8">
              The ultimate tool to manage your notes and ideas. Streamline your productivity and never miss an important detail again.
            </p>
            <NavLink to="/signUp">
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300">
                Get Started
              </button>
            </NavLink>
          </div>
        </section>
      </div>

  );
};
