from flask import Blueprint, request, jsonify
from app import db
from app.models import Sale

sale_bp = Blueprint('sale_bp', __name__)

@sale_bp.route('/sales', methods=['POST'])
def create_sale():
    data = request.get_json()
    
    if not data or 'product_id' not in data or 'quantity' not in data or 'total_price' not in data:
        return jsonify({'message': 'Invalid input'}), 400

    new_sale = Sale(
        product_id=data['product_id'],
        quantity=data['quantity'],
        total_price=data['total_price']
    )
    
    db.session.add(new_sale)
    db.session.commit()
    
    return jsonify({'message': 'Sale created successfully!'}), 201

@sale_bp.route('/sales', methods=['GET'])
def get_sales():
    sales = Sale.query.all()
    result = [{'id': sale.id, 'product_id': sale.product_id, 'quantity': sale.quantity, 'total_price': sale.total_price, 'sale_date': sale.sale_date} for sale in sales]
    
    return jsonify(result), 200

@sale_bp.route('/sales/<int:id>', methods=['DELETE'])
def delete_sale(id):
    sale = Sale.query.get(id)
    
    if not sale:
        return jsonify({'message': 'Sale not found'}), 404
    
    db.session.delete(sale)
    db.session.commit()
    
    return jsonify({'message': 'Sale deleted successfully!'}), 200
