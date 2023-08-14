import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import HeaderContainer from './Components/HeaderContainer';
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
                            <HeaderContainer></HeaderContainer>
                <NavigationBar />
                <Home />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div>
                            <HeaderContainer></HeaderContainer>
                <NavigationBar />
                <Register />
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div>
                            <HeaderContainer></HeaderContainer>
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
