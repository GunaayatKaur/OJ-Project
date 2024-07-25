import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const LoginUser = async(e) =>{
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/login', 
        {email, password},
        { withCredentials: true });

        console.log('Login successful', response.data);
        localStorage.setItem('token', response.data.token); 
        navigate('/profile');
        window.location.reload();
    } catch (error) {
      //console.log(error.response.data)
      console.error('Error logging in:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-none">
      <div className="m-3 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="border-spacing-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Login</h1>
        <form onSubmit={LoginUser} className="space-y-4 md:space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" value={email} placeholder='Email' className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                   onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" value={password} placeholder='Password' className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   onChange={(e) => setPassword(e.target.value)} />
          </div>  

          <button type='submit' className="w-full text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center">
            Login
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};