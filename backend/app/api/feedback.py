from flask import Blueprint, jsonify, request
from app.models.feedback import Feedback
from app import db

feedback_bp = Blueprint('feedback', __name__)

@feedback_bp.route('/', methods=['GET'])
def get_feedback():
    feedback_entries = Feedback.query.order_by(Feedback.created_at.desc()).limit(10).all()
    return jsonify([f.to_dict() for f in feedback_entries])

@feedback_bp.route('/', methods=['POST'])
def create_feedback():
    data = request.get_json()
    
    if not data or not data.get('message'):
        return jsonify({'error': 'Message is required'}), 400
        
    feedback = Feedback(
        name=data.get('name', 'Anonymous'),
        email=data.get('email', 'anonymous@example.com'),
        message=data.get('message')
    )
    
    db.session.add(feedback)
    db.session.commit()
    
    return jsonify(feedback.to_dict()), 201
