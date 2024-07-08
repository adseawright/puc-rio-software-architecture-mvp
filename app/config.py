import os

class Config:
    # Database configuration
    SQLALCHEMY_DATABASE_URI = 'sqlite:///jr_market.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Secret key for session management
    SECRET_KEY = os.getenv('SECRET_KEY', '4c3b1626e1f1b4e5e3c7b1f59d9b8c1e7a2f3b4e5c1d7e6a4d2f7c8b5e6a4d3c')
