import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import NavigationBar from './Components/navbar';
function App() {
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
