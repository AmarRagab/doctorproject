import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../Slices/authSlice';
import { setIsMobileScreen,toggleMobileMenu } from '../Slices/screenSlice';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch=useDispatch();
  const { user } = useSelector((state) => state.auth);
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

  const handleLogout = () => {
    dispatch(clearUser());
  };

 
  return (
    <nav className="bg-blue-900 py-4" dir="rtl">
    <div className="container mx-auto flex items-center justify-between flex-wrap">
      {!isMobileScreen && (
        <div>
          { user ?  (
          <ul>
            <li><button onClick={handleLogout} className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-6 border border-blue-500 hover:border-transparent rounded">تسجيل الخروج</button></li>
          </ul>
        ) : (
          <>
        <a
  href="/login"
  className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-3 border border-blue-500 hover:border-transparent rounded"
  style={{ marginLeft: "10px" }}
  dir="rtl" 
>
  تسجيل الدخول
</a>
<a
  href="/register"
  className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-3 border border-blue-500 hover:border-transparent rounded"
  style={{ marginLeft: "10px" }}
  dir="rtl" 
>
  التسجيل
</a>

        </>
        )}
      </div>
      )}
      
      <ul className="flex hidden sm:flex sm:space-x-6 sm:mt-4 justify-center">
  <li>
    <Link
      to="/"
      className="text-white hover:text-blue-400 transition duration-300 px-2"
    >
      الرئيسية
    </Link>
  </li>
  <li>
    <Link
      to="/about"
      className="text-white hover:text-blue-400 transition duration-300 px-2"
    >
      من نحن
    </Link>
  </li>
  <li>
    <Link
      to="/services"
      className="text-white hover:text-blue-400 transition duration-300"
    >
      الخدمات
    </Link>
  </li>
  <li>
    <Link
      to="/contact"
      className="text-white hover:text-blue-400 transition duration-300"
    >
      اتصل بنا
    </Link>
  </li>
</ul>

      {isMobileScreen && (
        <div className="block sm:hidden relative">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-4"
            type="button"
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6 ml-2. center" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
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
      <a href="/" className="text-white text-2xl font-semibold center"

      style={{margin: isMobileScreen? "auto":"",width: isMobileScreen?"50%":""}}>
        المشرق <span className="text-blue-400">للتأمين</span>
      </a>
    </div>
  </nav>
  
  
  );
};

export default Navbar;
 