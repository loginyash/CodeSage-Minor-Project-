from flask import Blueprint, jsonify

community_bp = Blueprint('community', __name__)

@community_bp.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Community endpoint"})
