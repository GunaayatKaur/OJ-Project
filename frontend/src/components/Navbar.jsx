import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('http://localhost:8000/profile', {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
      console.error('Error checking login status:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:8000/logout', {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsLoggedIn(false); // Update isLoggedIn state
        localStorage.removeItem('token');
        navigate('/login'); // Remove token from localStorage
      } else {
        console.log('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className='flex flex-row px-6 py-6 justify-between bg-gradient-to-b from-gray-400 to-gray-700 text-white rounded-b-md'>
      <Link to='/' className='font-bold font-sans text-2xl'>
        Home
      </Link>
      {isLoggedIn ? (
        <div className='w-1/5 flex flex-row justify-between font-sans'>
          <Link to='/profile' className='text-xl font-bold'>
            Profile
          </Link>
          <button onClick={handleLogout} className='bg-none text-xl font-bold'>
            Signout
          </button>
        </div>
      ) : (
        <div className='w-1/5 flex flex-row justify-between font-sans'>
          <Link to='/register' className='text-xl font-bold'>
            Register
          </Link>
          <Link to='/login' className='text-xl font-bold'>
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
