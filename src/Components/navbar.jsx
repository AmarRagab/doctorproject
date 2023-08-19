import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobileScreen(window.innerWidth <= 640);
    };

    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-900 py-4">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <a href="/" className="text-white text-2xl font-semibold">
          Doctor<span className="text-blue-400">Search</span>
        </a>
        {isMobileScreen && (
  <div className="block sm:hidden relative">
    <button
      id="dropdownDefaultButton"
      data-dropdown-toggle="dropdown"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="button"
      onClick={toggleMobileMenu}
    >
      <svg className="w-6 h-6 mr-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <span className="sr-only">Open Menu</span>
    </button>
    {isMobileMenuOpen && (
      <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute right-0 mt-2">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li>
            <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Home</a>
          </li>
          <li>
            <a href="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Login</a>
          </li>
          <li>
            <a href="/register" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Register</a>
          </li>
         
        </ul>
      </div>
    )}
  </div>
)}


        <ul className="hidden sm:flex sm:space-x-6 sm:mt-4">
          <li>
            <a
              href="/"
              className="text-white hover:text-blue-400 transition duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="text-white hover:text-blue-400 transition duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/services"
              className="text-white hover:text-blue-400 transition duration-300"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="text-white hover:text-blue-400 transition duration-300"
            >
              Contact
            </a>
          </li>
        </ul>
        <div className="hidden sm:flex space-x-4">
          <a
            href="/login"
            className="bg-blue-400 text-white hover:bg-blue-500 px-4 py-2 rounded-full transition duration-300"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-blue-400 text-white hover:bg-blue-500 px-4 py-2 rounded-full transition duration-300"
          >
            Register
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
