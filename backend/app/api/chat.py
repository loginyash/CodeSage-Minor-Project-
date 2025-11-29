from flask import Blueprint, request, jsonify
from app.services.ai_service import ai_service

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/message', methods=['POST'])
def send_message():
    data = request.get_json()
    message = data.get('message')
    context = data.get('context', '')

    if not message:
        return jsonify({"error": "Message is required"}), 400

    response = ai_service.get_response(message, context)
    return jsonify({"response": response})
