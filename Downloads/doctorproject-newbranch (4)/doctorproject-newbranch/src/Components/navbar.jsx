import React from "react";
import { Link } from "react-router-dom";
const Navbar = () =>{

    return(
        
<nav className="bg-blue-500 sticky top-0 z-5 py-2">
  <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4">
    <a href="https://flowbite.com/" className="flex items-center">
      <img
        src="https://www.mashreqins.com/assets/images/logo_ar.svg"
        alt="المشرق للتأمين"
        id="logo_img"
        className="h-28 w-28"
      />
    </a>

    <div className="flex md:order-2 space-x-2">
      <Link
        to="/register"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
      >
        Register
      </Link>
      <Link
        to="/login"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
      >
        Login
      </Link>
      <button
        data-collapse-toggle="navbar-cta"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-controls="navbar-cta"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
    </div>

    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
      <ul className="flex font-medium p-4 space-y-2 md:p-0 md:space-y-0 md:flex-row md:space-x-4">
        <li>
          <a
            href="/"
            className="block py-2 pl-3 pr-4 text-white rounded bg-blue-700 md:bg-transparent md:text-blue-500"
            aria-current="page"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/about"
            className="block py-2 pl-3 pr-4 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-500"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="/services"
            className="block py-2 pl-3 pr-4 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-500"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="/contact"
            className="block py-2 pl-3 pr-4 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-500"
          >
            Contact
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>






    );
}

export default Navbar;