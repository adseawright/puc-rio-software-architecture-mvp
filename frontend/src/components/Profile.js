import React, { useState, useEffect } from 'react';
import axios from '../axios';
import '../styles/Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        setError('User ID not found');
        return;
      }

      try {
        const response = await axios.get(`/profile?user_id=${userId}`);
        setProfile(response.data);
      } catch (err) {
        setError('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="profile-info">
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      )}
      <button>Edit Profile</button>
      <button>Delete Profile</button>
    </div>
  );
};

export default Profile;
