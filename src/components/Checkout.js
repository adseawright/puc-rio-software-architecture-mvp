import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();

    // useCallback hook to memoize the handlePaymentSuccess function
    const handlePaymentSuccess = useCallback((details, data) => {
        alert('Transaction completed by ' + details.payer.name.given_name);
        localStorage.removeItem('cart'); // Clear the cart from localStorage
        navigate('/storefront'); // Navigate back to storefront
    }, [navigate]);

    // useEffect to handle loading the PayPal buttons and navigating if the cart is empty
    useEffect(() => {
        // Fetch cart items from localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // If the cart is empty, navigate back to the storefront
        if (cart.length === 0) {
            navigate('/storefront');
            return;
        }

        // Calculate the total amount for the purchase
        const totalAmount = cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);

        // Function to load PayPal buttons
        const loadPaypalButtons = () => {
            if (window.paypal) {
                // Render PayPal buttons
                window.paypal.Buttons({
                    createOrder: (data, actions) => {
                        // Create an order with the total amount
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: totalAmount, // Correctly formatted total amount
                                    currency_code: 'USD'
                                }
                            }]
                        });
                    },
                    onApprove: (data, actions) => {
                        // Capture the order on approval
                        return actions.order.capture().then((details) => {
                            handlePaymentSuccess(details, data);
                        });
                    }
                }).render('#paypal-button-container');
            } else {
                // Retry loading PayPal buttons if PayPal script is not loaded yet
                setTimeout(loadPaypalButtons, 100);
            }
        };

        loadPaypalButtons();
    }, [navigate, handlePaymentSuccess]);

    return (
        <div>
            <h2>Checkout</h2>
            <div id="paypal-button-container"></div> {/* Container for PayPal buttons */}
        </div>
    );
};

export default Checkout;
