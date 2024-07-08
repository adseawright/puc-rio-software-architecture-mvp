from flask import Blueprint, request, jsonify
from app import db
from app.models import User
import bcrypt
import jwt
import datetime

register_bp = Blueprint('register', __name__)

@register_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    if not email or not username or not password:
        return jsonify({'message': 'Missing data'}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    new_user = User(email=email, username=username, password=hashed_password)
    
    db.session.add(new_user)
    db.session.commit()

    token = jwt.encode({'user_id': new_user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, 'your_secret_key', algorithm='HS256')
    return jsonify({'token': token, 'user_id': new_user.id}), 201
