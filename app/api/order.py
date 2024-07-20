from flask import Blueprint, request, jsonify
import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

order_bp = Blueprint('order_bp', __name__)

@order_bp.route('/api/create-order', methods=['POST'])
def create_order():
    """
    Create an order with PayPal.
    This endpoint receives order details, gets an access token from PayPal, and then creates an order.
    """
    order_details = request.json  # Get the order details from the request
    access_token = get_paypal_access_token()  # Get PayPal access token

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"  # Authorization token
    }

    # Send request to PayPal to create an order
    response = requests.post(
        'https://api.sandbox.paypal.com/v2/checkout/orders',
        headers=headers,
        json={
            "intent": order_details['intent'],
            "purchase_units": order_details['purchase_units']
        }
    )

    # Check if the order creation was successful
    if response.status_code == 201:
        return jsonify({"orderID": response.json()['id']})  # Return the order ID
    else:
        return jsonify({"error": response.json()}), response.status_code  # Return the error message

def get_paypal_access_token():
    """
    Get PayPal access token.
    This function sends a request to PayPal to get an access token using client credentials.
    """
    client_id = os.getenv("PAYPAL_CLIENT_ID")  # Get client ID from environment variables
    client_secret = os.getenv("PAYPAL_CLIENT_SECRET")  # Get client secret from environment variables
    
    # Send request to PayPal to get an access token
    auth_response = requests.post(
        'https://api.sandbox.paypal.com/v1/oauth2/token',
        headers={"Accept": "application/json", "Accept-Language": "en_US"},
        data={"grant_type": "client_credentials"},
        auth=(client_id, client_secret)
    )
    
    # Return the access token from the response
    return auth_response.json()['access_token']
