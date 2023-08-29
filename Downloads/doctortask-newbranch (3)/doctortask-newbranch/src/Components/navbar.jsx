import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../Slices/authSlice';
import { setIsMobileScreen,toggleMobileMenu } from '../Slices/navbarSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {isMobileMenuOpen,isMobileScreen,} = useSelector((state) => state.navbar);

  useEffect(() => {
    const checkScreenWidth = () => {
      dispatch(setIsMobileScreen(window.innerWidth <= 640));
    };

    checkScreenWidth();

    window.addEventListener('resize', checkScreenWidth);

    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const toggleMobileMenudis = () =>{
    dispatch(toggleMobileMenu());
  }
  return (
    <nav className="bg-blue-900 py-4" dir="rtl">
    <div className="container mx-auto flex items-center justify-between flex-wrap">
      {!isMobileScreen && (
        <div>
          { user ?  (
          <>
            <li><button onClick={handleLogout} className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-6 border border-blue-500 hover:border-transparent rounded">Logout</button></li>
          </>
        ) : (
          <>
        <a
          href="/login"
          className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-3 border border-blue-500 hover:border-transparent rounded"
          style={{marginLeft:"10px"}}
        >
             تسجيل الدخول
        </a>
        <a
          href="/register"
          className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-3 border border-blue-500 hover:border-transparent rounded"
          style={{marginLeft:"10px"}}

        >
             التسجيل
        </a>
        </>
        )}
      </div>
      )}
      
      <ul className="flex hidden sm:flex sm:space-x-6 sm:mt-4 justify-center">
  <li>
    <a
      href="/"
      className="text-white hover:text-blue-400 transition duration-300 px-2"
    >
      الرئيسية
    </a>
  </li>
  <li>
    <a
      href="/about"
      className="text-white hover:text-blue-400 transition duration-300 px-2"
    >
      من نحن
    </a>
  </li>
  <li>
    <a
      href="/services"
      className="text-white hover:text-blue-400 transition duration-300"
    >
      الخدمات
    </a>
  </li>
  <li>
    <a
      href="/contact"
      className="text-white hover:text-blue-400 transition duration-300"
    >
      اتصل بنا
    </a>
  </li>
</ul>

      {isMobileScreen && (
        <div className="block sm:hidden relative">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={toggleMobileMenudis}
          >
            <svg className="w-6 h-6 ml-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="sr-only">فتح القائمة</span>
          </button>
          {isMobileMenuOpen && (
            <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute right-0 mt-2">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">الرئيسية</a>
                </li>
                {user  ? (
                  <>
                  <li>
                  <button onClick={handleLogout} className="block  px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">تسجيل الخروج</button>
                </li>
                  </>
                ):(
                  <>
                   <li>
                  <a href="/login" className="block  px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">تسجيل الدخول</a>
                </li>
                <li>
                  <a href="/register" className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">التسجيل</a>
                </li>
                  </>
                )}
               
              </ul>
            </div>
          )}
        </div>
      )}
      <a href="/" className="text-white text-2xl font-semibold">
        المشرق <span className="text-blue-400">للتأمين</span>
      </a>
    </div>
  </nav>
  
  
  );
};

export default Navbar;
 