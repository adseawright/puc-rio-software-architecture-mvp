from flask import Blueprint, request, jsonify
from app import db
from app.models import Store

store_bp = Blueprint('store', __name__)

@store_bp.route('/stores', methods=['GET'])
def get_stores():
    owner_id = request.args.get('owner_id')
    if not owner_id:
        return jsonify({'error': 'Owner ID is required'}), 400

    stores = Store.query.filter_by(owner_id=owner_id).all()
    return jsonify([store.to_dict() for store in stores])

@store_bp.route('/stores', methods=['POST'])
def create_store():
    data = request.json
    new_store = Store(
        name=data['name'],
        description=data['description'],
        owner_id=data['owner_id']
    )
    db.session.add(new_store)
    db.session.commit()

    return jsonify({'message': 'Store created successfully'}), 201

@store_bp.route('/stores/<int:store_id>', methods=['PUT'])
def update_store(store_id):
    data = request.json
    store = Store.query.get(store_id)
    if not store:
        return jsonify({'error': 'Store not found'}), 404

    store.name = data.get('name', store.name)
    store.description = data.get('description', store.description)
    db.session.commit()

    return jsonify({'message': 'Store updated successfully'})

@store_bp.route('/stores/<int:store_id>', methods=['DELETE'])
def delete_store(store_id):
    store = Store.query.get(store_id)
    if not store:
        return jsonify({'error': 'Store not found'}), 404

    db.session.delete(store)
    db.session.commit()

    return jsonify({'message': 'Store deleted successfully'})
