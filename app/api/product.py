from flask import Blueprint, request, jsonify
from app.models import Product
from app import db

product_bp = Blueprint('product_bp', __name__)

@product_bp.route('/api/products', methods=['POST'])
def add_product():
    data = request.get_json()
    new_product = Product(
        store_id=data['store_id'],
        name=data['name'],
        description=data['description'],
        price=data['price']
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product added successfully!'}), 201

@product_bp.route('/api/products', methods=['GET'])
def get_products():
    store_id = request.args.get('store_id')
    products = Product.query.filter_by(store_id=store_id).all()
    return jsonify([{
        'id': product.id,
        'name': product.name,
        'description': product.description,
        'price': product.price
    } for product in products]), 200

@product_bp.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({'message': 'Product not found'}), 404
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully!'}), 200
