import React from 'react'
import {Routes, Route} from 'react-router-dom'
import axios from 'axios'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import './App.css';
import Profile from './pages/Profile'

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
    </>
  )
}

export default App