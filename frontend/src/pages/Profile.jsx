// frontend/src/pages/Profile.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('http://localhost:8000/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setProfile(res.data);
                setLoading(false);
            } catch (err) {
                setError(err.response.data.message);
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Profile</h1>
            <p><strong>Username:</strong> {profile.userName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
        </div>
    );
};

export default Profile;
