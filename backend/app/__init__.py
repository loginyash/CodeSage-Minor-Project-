import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app.core.config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)

    # Register Blueprints
    from app.api.auth import auth_bp
    from app.api.chat import chat_bp
    from app.api.analytics import analytics_bp
    from app.api.community import community_bp
    from app.api.lessons import lessons_bp
    from app.api.feedback import feedback_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(chat_bp, url_prefix='/api/chat')
    app.register_blueprint(analytics_bp, url_prefix='/api/analytics')
    app.register_blueprint(community_bp, url_prefix='/api/community')
    app.register_blueprint(lessons_bp, url_prefix='/api/lessons')
    app.register_blueprint(feedback_bp, url_prefix='/api/feedback')

    @app.route('/health')
    def health_check():
        return {'status': 'healthy', 'backend': 'flask'}

    return app
