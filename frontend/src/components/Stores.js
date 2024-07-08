import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Stores = () => {
    const [stores, setStores] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const userId = localStorage.getItem('user_id');
                const response = await axios.get(`http://127.0.0.1:5000/api/stores?owner_id=${userId}`);
                setStores(response.data);
            } catch (error) {
                setMessage('Failed to fetch stores');
            }
        };

        fetchStores();
    }, []);

    const handleAddStore = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('user_id');
            const response = await axios.post('http://127.0.0.1:5000/api/stores', { name, description, owner_id: userId });
            setMessage(response.data.message);
            setName('');
            setDescription('');
            fetchStores(); // Refresh the stores list
        } catch (error) {
            setMessage('Failed to add store: ' + error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Stores</h2>
            <form onSubmit={handleAddStore}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <button type="submit">Add Store</button>
            </form>
            <p>{message}</p>
            <h3>Store List</h3>
            <ul>
                {stores.map((store) => (
                    <li key={store.id}>{store.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Stores;
