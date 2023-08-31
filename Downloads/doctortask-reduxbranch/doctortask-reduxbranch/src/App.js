import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import NavigationBar from './Components/navbar';
import { useEffect } from 'react';
import { setIsMobileScreenAsync } from './Slices/screenSlice';
import { useDispatch } from 'react-redux';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = async () => {
      const isMobile = window.innerWidth <= 768;
      await dispatch(setIsMobileScreenAsync(isMobile));
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);
  
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
          <Route
            path="/"
            element={
              <div className="App">
                <NavigationBar />
                <Home />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div>
                <NavigationBar />
                <Register />
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div>
                <NavigationBar />
                <Login />
              </div>
            }
          />
      </Routes>
     
    </BrowserRouter>
    </div>
   
  );
}

export default App;
