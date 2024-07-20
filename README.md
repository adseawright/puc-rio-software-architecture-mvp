# App for Kids to Sell Products Online

## Brief Description
This front-end application allows users to create and manage their profiles and stores, and add products to their stores. It also includes a storefront where users can view and add products to their cart and check out through PayPal.

## Installation Instructions

1. Download the Docker images from [Google Drive](https://drive.google.com/drive/folders/1BsSmDIBcSMG6hxnN9cuVQA3H3luvr_HX).

2. Load the Backend Image:
    ```sh
    docker load -i jrpreneur-backend.tar
    ```

3. Load the Frontend Image:
    ```sh
    docker load -i jrpreneur-frontend.tar
    ```
## Stopping Docker Containers
    ```sh
    docker-compose down
    ```
## Usage Instructions

### Running the Application
1. Ensure the backend server is running.
2. Ensure the frontend server is running.
3. Open the browser and navigate to `http://localhost:3000`.

### API Endpoints
- `/login`: Login API
- `/register`: Register API
- `/profile`: Profile API
- `/api/stores`: Store API
- `/api/products`: Product API
- `/api/create-order`: Order API
- `/search/products`: Search Products API
- `/search/stores`: Search Stores API

## External Component: PayPal API
- Used the PayPal API to handle payment processing in our application. This API allows users to make secure payments through their PayPal accounts, enhancing the safety and reliability of transactions.

### How PayPal API is Used

#### API Endpoint:
        The PayPal API endpoint is used to create payment orders and capture payments.

#### Integration:
        The frontend interacts with the PayPal API to initiate payments and handle responses.
        The backend validates payment confirmations received from the PayPal API.

#### Environment Variables:
        Edit the `.env` file in the root directory with the necessary environment variables for PayPal integration.
        ```sh
        SECRET_KEY='your_secret_key'
        PAYPAL_CLIENT_ID="your_paypal_client_id"
        PAYPAL_CLIENT_SECRET="your_paypal_client_secret"
        ```
        
#### API CALL File

    The backend file that implements the API connection is 'app/api/order.py' 

## Architecture Diagram
![Architecture Diagram](/kidstore_architecture.PNG)