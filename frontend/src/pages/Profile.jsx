import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('No token found. Please log in.');
                return;
            }

            try {
                const res = await axios.get('http://localhost:8000/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfile(res.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'An error occurred');
            } 
        };

        fetchProfile();
    }, []);

    if (error) return <p className='text-red-600 m-5 font-semibold'>{error}</p>;

    return (
        <div className='flex flex-col place-items-center'>
            <h1 className='text-5xl font-bold m-2 mb-10'>Profile</h1>
            <p className='text-xl'><strong className='text-2xl font-semibold'>Username:</strong> {profile.userName}</p>
            <p className='text-xl'><strong className='text-2xl font-semibold'>Email:</strong> {profile.email}</p>
            <Link to='/problems' className='w-1/3'>
                <div className='mt-10 border-gray-700 border-2 rounded-md p-4'>
                    <p className='text-2xl font-semibold text-blue-400'>Problem</p>
                    <p>See the list of all the problems</p>
                </div>
            </Link>
            
            
        </div>
    );
};

export default Profile;
