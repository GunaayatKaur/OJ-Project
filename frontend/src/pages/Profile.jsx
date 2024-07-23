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

    if (error) return <p>{error}</p>;

    return (
        <div className='flex flex-col place-items-center'>
            <h1 className='text-5xl font-bold m-2 mb-10'>Profile</h1>
            <p className='text-xl'><strong className='text-2xl font-semibold'>Username:</strong> {profile.userName}</p>
            <p className='text-xl'><strong className='text-2xl font-semibold'>Email:</strong> {profile.email}</p>
            <div className='mt-10 border-gray-700 border-2 rounded-md w-1/3 p-4'>
                <Link to='/problems' className='text-2xl font-semibold'>Problem</Link>
                <p>See the list of all the problems</p>
            </div>
            
        </div>
    );
};

export default Profile;
