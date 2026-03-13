from flask import Blueprint, jsonify, request
from app import db
from app.models.community import CommunityPost

community_bp = Blueprint('community', __name__)

@community_bp.route('/', methods=['GET'])
def get_posts():
    posts = CommunityPost.query.order_by(CommunityPost.created_at.desc()).all()
    return jsonify([post.to_dict() for post in posts])

@community_bp.route('/', methods=['POST'])
def create_post():
    data = request.json
    if not data or not data.get('author') or not data.get('content'):
        return jsonify({'error': 'Missing author or content'}), 400
    
    new_post = CommunityPost(
        author=data['author'],
        content=data['content']
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify(new_post.to_dict()), 201
