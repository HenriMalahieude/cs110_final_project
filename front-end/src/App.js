import './App.css';
import React from "react";
import NavBar from './NavBar/NavBar.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

//Import pages here
//import Home from './pages/home';

function App() {
  return (<>
    <Router>
      <NavBar />
      <Routes>
        {/* <Route exact path="/" element={<Home />} />*/}
        {/* <Route path="/about" element={<About />} /> etc etc*/}
      </Routes>
    </Router>
  </>);
}

export default App;
