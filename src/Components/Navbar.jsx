import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

export const Navbar = ({ token }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header>
        <div className="bg-gradient-to-r from-black to-zinc-800 text-white flex items-center justify-between p-4">
          <div className="text-2xl font-bold text-cyan-400">
            <NavLink to="/">Cheatsheet</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-white block lg:hidden"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Navigation Links */}
          <nav
            className={`lg:flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0 lg:ml-auto ${
              isMobileMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-4 text-lg">
              {token ? (
                <>
                  <li className="hover:text-cyan-400">
                    <NavLink to="/userhome">Home</NavLink>
                  </li>
                  <li className="hover:text-cyan-400">
                    <NavLink to="/addnote">Add Notes</NavLink>
                  </li>
                  <li className="hover:text-cyan-400">
                    <NavLink to="/logout">Logout</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="hover:text-cyan-400">
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li className="hover:text-cyan-400">
                    <NavLink to="/about">About</NavLink>
                  </li>
                  <li className="hover:text-cyan-400">
                    <NavLink to="/signup">SignUp</NavLink>
                  </li>
                  <li className="hover:text-cyan-400">
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
