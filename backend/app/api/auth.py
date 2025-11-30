from flask import Blueprint, request, jsonify
from app.models.user import User
from app import db
import firebase_admin
from firebase_admin import credentials, auth
import os

auth_bp = Blueprint('auth', __name__)

# Initialize Firebase Admin SDK
# Check if already initialized to avoid errors on reloads
if not firebase_admin._apps:
    cred_path = os.path.join(os.path.dirname(__file__), 'serviceAccountKey.json')
    if os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
    else:
        print(f"Warning: serviceAccountKey.json not found at {cred_path}")

@auth_bp.route('/signup-firebase', methods=['POST'])
def signup_firebase():
    data = request.get_json()
    auth_header = request.headers.get('Authorization')
    
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'error': 'Missing or invalid Authorization header'}), 401

    token = auth_header.split('Bearer ')[1]
    
    try:
        # Verify Firebase Token
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token['uid']
        email = decoded_token.get('email')
        
        # Ensure the email matches the one in the body (security check)
        if email != data.get('email'):
             return jsonify({'error': 'Token email does not match provided email'}), 400
        
        if User.query.filter_by(email=data.get('email')).first():
            return jsonify({'error': 'Email already registered in our system'}), 400
            
        user = User(
            username=data.get('name'),
            email=data.get('email'),
            password_hash="firebase_managed", # Password managed by Firebase
            roll_number=data.get('roll_number'),
            branch=data.get('branch'),
            semester=data.get('semester'),
            is_verified=True # Verified by Firebase
        )
        
        db.session.add(user)
        db.session.commit()
        
        return jsonify({'message': 'User registered successfully', 'user': {
            'id': user.id,
            'name': user.username,
            'email': user.email
        }}), 201
        
    except auth.InvalidIdTokenError as e:
        print(f"Invalid Token Error: {e}")
        return jsonify({'error': 'Invalid authentication token'}), 401
    except auth.ExpiredIdTokenError as e:
        print(f"Expired Token Error: {e}")
        return jsonify({'error': 'Authentication token has expired'}), 401
    except ValueError as e:
        print(f"Token Value Error: {e}")
        return jsonify({'error': 'Invalid token format'}), 401
    except Exception as e:
        print(f"Signup Error: {e}")
        db.session.rollback()
        return jsonify({'error': f'Registration failed: {str(e)}'}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    # ... (Keep existing login for now, or switch to Firebase login on frontend + verify token here)
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    
    # If using Firebase on frontend, login should also send a token to verify
    # For now, we keep the legacy login for testing if needed, but ideally this should also be token-based
    if not user: 
        return jsonify({'error': 'Invalid credentials'}), 401
        
    return jsonify({'message': 'Login successful', 'user': {
        'id': user.id,
        'name': user.username,
        'email': user.email,
        'role': user.role
    }}), 200
