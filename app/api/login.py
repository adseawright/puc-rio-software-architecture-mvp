from flask import Blueprint, request, jsonify
from app import db
from app.models import User
import bcrypt
import jwt
import datetime

login_bp = Blueprint('login', __name__)

@login_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing data'}), 400

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        token = jwt.encode({'user_id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, 'your_secret_key', algorithm='HS256')
        return jsonify({'token': token, 'user_id': user.id}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
