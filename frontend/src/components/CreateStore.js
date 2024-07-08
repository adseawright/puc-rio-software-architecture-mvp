import React, { useState } from 'react';
import axios from '../axios';  // Ensure the path is correct
import { useNavigate } from 'react-router-dom';

const CreateStore = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateStore = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('/store', {
        user_id: 1,  // Replace with dynamic user ID as needed
        name,
        description,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setMessage('Store created successfully!');
      navigate('/profile');
    } catch (error) {
      setError('Failed to create store');
      console.error('Store creation failed', error);
    }
  };

  return (
    <form onSubmit={handleCreateStore}>
      <h2>Create Store</h2>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
      <div>
        <label htmlFor="storeName">Store Name:</label>
        <input 
          id="storeName" 
          name="name" 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label htmlFor="storeDescription">Store Description:</label>
        <input 
          id="storeDescription" 
          name="description" 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Create Store</button>
    </form>
  );
};

export default CreateStore;
