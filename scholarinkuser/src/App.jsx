import { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Js/Login.jsx';
import SignUp from './Js/SignUp.jsx';
import SignUpNext from './Js/nextSignUp.jsx';
import LastPage from './Js/LastPage.jsx';
import Home from './Js/Home.jsx';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/nextSignUp" element={<SignUpNext />} />
        <Route path="/LastPage" element={<LastPage />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;