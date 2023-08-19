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
              type="button"
              className="text-white hover:text-blue-400 focus:outline-none focus:text-blue-400"
              onClick={toggleMobileMenu}
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isMobileMenuOpen && (
              <ul className="absolute right-0 mt-2 bg-blue-900 w-full">
                <li>
                  <a
                    href="/contact"
                    className="block text-white py-2 px-4 hover:bg-blue-800 transition duration-300"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    className="block text-white py-2 px-4 hover:bg-blue-800 transition duration-300"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="block text-white py-2 px-4 hover:bg-blue-800 transition duration-300"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="block text-white py-2 px-4 hover:bg-blue-800 transition duration-300"
                  >
                    Home
                  </a>
                </li>
              </ul>
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
            className="text-white hover:text-blue-400 transition duration-300"
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
