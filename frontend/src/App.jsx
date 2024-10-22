import React, { useState } from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import axios from 'axios'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import './App.css';
import Profile from './pages/Profile'
import Problem from './pages/problems/Problem'
import AddP from './components/addProbs/AddProb'
import Edit from './components/update/Edit'
import Solve from './pages/compiler/Solve'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

function App() {
  // const location = useLocation();
  // const showNavbar = !location.pathname.startsWith('/solve');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/problems" element={<Problem/>} />
      <Route path="/add" element={<AddP/>} />
      <Route path='/edit/:id' element={<Edit/>}/>
      <Route path='/solve/:id' element={<Solve/>}/>
    </Routes>
    </>
  )
}

export default App