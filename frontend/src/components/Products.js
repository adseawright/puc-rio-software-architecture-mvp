import React, { useState, useEffect } from 'react';
import axios from '../axios';
import NavBar from './NavBar';

const Products = ({ storeId }) => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [unit, setUnit] = useState(''); // New field for unit of measure
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/products?store_id=${storeId}`);
            setProducts(response.data);
        } catch (error) {
            setMessage('Failed to fetch products');
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:5000/api/products', { store_id: storeId, name, description, price, unit });
            setMessage('Product added successfully');
            fetchProducts();
        } catch (error) {
            setMessage('Failed to add product: ' + error.response.data.message);
        }
    };

    return (
        <div>
            <NavBar />
            <h2>Products</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleAddProduct}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                    <label>Unit:</label>
                    <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} required />
                </div>
                <button type="submit">Add Product</button>
            </form>
            <ul>
                {products.length === 0 ? (
                    <p>No products found. Add your first product!</p>
                ) : (
                    products.map((product) => (
                        <li key={product.id}>
                            {product.name} - {product.description} - ${product.price} per {product.unit}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Products;
