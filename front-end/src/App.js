import './App.css';
import React, { useState } from "react";
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

// Import the new components
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import AdminActions from './pages/admin/AdminActions';

function App() {
  const [token, setToken] = useState('');

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/board" element={<QuestionBoard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/question/:questionId" element={<QuestionDisplay />} />
          <Route path="/newQuestion" element={<QuestionCreation />} />
          
          {/* Register, Login, and Admin Actions */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/admin" element={<AdminActions token={token} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
