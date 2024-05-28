import './App.css';
import React from "react";
import NavBar from './NavBar/NavBar.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Home } from "./pages/home/home.js";
import { QuestionBoard } from './pages/board/board.js';
import { QuestionDisplay } from './pages/question/displayOld.js';
import { QuestionCreation } from './pages/question/createNew.js';
import { Profile } from './pages/profile/profile.js';

//Import pages here
//import Home from './pages/home';

function App() {
  return (<>
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/board" element={<QuestionBoard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/question" element={<QuestionDisplay />} />
        <Route path="/newQuestion" element={<QuestionCreation />} />
      </Routes>
    </Router>
  </>);
}

export default App;
