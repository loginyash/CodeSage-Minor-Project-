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
    # Try to use service account JSON file (for local development)
    cred_path = os.path.join(os.path.dirname(__file__), 'serviceAccountKey.json')
    
    if os.path.exists(cred_path):
        # Local development: use JSON file
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        print("Firebase initialized with serviceAccountKey.json")
    else:
        # Production (Render): use environment variables
        try:
            import json
            firebase_config = {
                "type": "service_account",
                "project_id": os.getenv("FIREBASE_PROJECT_ID"),
                "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
                "private_key": os.getenv("FIREBASE_PRIVATE_KEY", "").replace('\\n', '\n'),
                "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
                "client_id": os.getenv("FIREBASE_CLIENT_ID"),
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_CERT_URL")
            }
            
            # Check if all required env vars are present
            if all([firebase_config["project_id"], firebase_config["private_key"], 
                    firebase_config["client_email"]]):
                cred = credentials.Certificate(firebase_config)
                firebase_admin.initialize_app(cred)
                print("Firebase initialized with environment variables")
            else:
                print("ERROR: Firebase credentials not found. Set environment variables or add serviceAccountKey.json")
        except Exception as e:
            print(f"ERROR initializing Firebase: {e}")


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

@auth_bp.route('/firebase-status', methods=['GET'])
def firebase_status():
    """Debug endpoint to check Firebase configuration status"""
    try:
        is_initialized = bool(firebase_admin._apps)
        app_name = firebase_admin.get_app().name if is_initialized else "None"
        
        # Check env vars presence (masked)
        env_vars = {
            "FIREBASE_PROJECT_ID": bool(os.getenv("FIREBASE_PROJECT_ID")),
            "FIREBASE_PRIVATE_KEY": bool(os.getenv("FIREBASE_PRIVATE_KEY")),
            "FIREBASE_CLIENT_EMAIL": bool(os.getenv("FIREBASE_CLIENT_EMAIL")),
        }
        
        return jsonify({
            "status": "online",
            "firebase_initialized": is_initialized,
            "app_name": app_name,
            "env_vars_present": env_vars,
            "message": "Firebase is initialized" if is_initialized else "Firebase is NOT initialized"
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": str(e),
            "message": "Failed to check Firebase status"
        }), 500

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
