import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sales() {
    const [sales, setSales] = useState([]);
    const [newSale, setNewSale] = useState({ product_id: '', quantity: 1 });

    useEffect(() => {
        axios.get('/sales')
            .then(response => setSales(response.data))
            .catch(error => console.error('Error fetching sales:', error));
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewSale(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/sales', newSale)
            .then(response => {
                setSales(prevSales => [...prevSales, response.data]);
                setNewSale({ product_id: '', quantity: 1 });
            })
            .catch(error => console.error('Error creating sale:', error));
    };

    return (
        <div>
            <h2>Sales</h2>
            <ul>
                {sales.map(sale => (
                    <li key={sale.id}>
                        Product ID: {sale.product_id}, Quantity: {sale.quantity}, Total Price: {sale.total_price}
                    </li>
                ))}
            </ul>

            <h3>Create New Sale</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Product ID:
                    <input
                        type="number"
                        name="product_id"
                        value={newSale.product_id}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Quantity:
                    <input
                        type="number"
                        name="quantity"
                        value={newSale.quantity}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </label>
                <button type="submit">Create Sale</button>
            </form>
        </div>
    );
}

export default Sales;
