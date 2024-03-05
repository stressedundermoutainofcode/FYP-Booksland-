import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from "./components/homepage";
import Navbar from "./components/navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/footer";
// import Navbar from "./components/Navbar";

import { AuthContextProvider } from "./context/AuthContext";// import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <Router>
          <Routes>
            {/* Route to different pages are here */}
            <Route
              path="Homepage"
              element={
                <>
                  <Navbar />
                  <Homepage />
                  <Footer />
                  <Login/>
                </>
              }
            />
            <Route
              exact
              path="/"
              element={
                <>
                  <Navbar />
                  <Homepage />
                  <Footer />
                </>
              }
            />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
         

            {/* <Route path="/" component={<DefaultComponent/>}/> */}
          </Routes>
        </Router>
      </AuthContextProvider>
  
    </div>
  );
};

export default App;