from flask import Blueprint, jsonify

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/data', methods=['GET'])
def get_analytics_data():
    # Mock data for now, replacing the static frontend data
    data = [
        { "name": "Mon", "value": 4000, "users": 2400 },
        { "name": "Tue", "value": 3000, "users": 1398 },
        { "name": "Wed", "value": 2000, "users": 9800 },
        { "name": "Thu", "value": 2780, "users": 3908 },
        { "name": "Fri", "value": 1890, "users": 4800 },
        { "name": "Sat", "value": 2390, "users": 3800 },
        { "name": "Sun", "value": 3490, "users": 4300 },
    ]
    return jsonify(data)

@analytics_bp.route('/activity', methods=['GET'])
def get_activity_data():
    activity_data = [
        { "name": "00:00", "value": 20 },
        { "name": "04:00", "value": 10 },
        { "name": "08:00", "value": 50 },
        { "name": "12:00", "value": 80 },
        { "name": "16:00", "value": 90 },
        { "name": "20:00", "value": 60 },
        { "name": "23:59", "value": 30 },
    ]
    return jsonify(activity_data)
