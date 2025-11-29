from flask import Blueprint, jsonify
from app.models.lesson import Lesson
from app import db

lessons_bp = Blueprint('lessons', __name__)

@lessons_bp.route('/', methods=['GET'])
def get_lessons():
    lessons = Lesson.query.all()
    
    # Seed data if empty (for demo purposes)
    if not lessons:
        seed_lessons = [
            Lesson(
                title="Python Basics", 
                description="Introduction to Python syntax and variables.", 
                level="beginner", 
                content="# Python Basics...",
                video_url="rfscVS0vtbw",
                is_video=True
            ),
            Lesson(
                title="Data Structures", 
                description="Lists, Dictionaries, and Sets.", 
                level="intermediate", 
                content="# Data Structures...",
                video_url="pkYVOmU3MgA",
                is_video=True
            ),
            Lesson(
                title="Flask Web Dev", 
                description="Building web apps with Flask.", 
                level="advanced", 
                content="# Flask...",
                video_url="Z1RJmh_OqeA",
                is_video=True
            )
        ]
        db.session.add_all(seed_lessons)
        db.session.commit()
        lessons = Lesson.query.all()

    return jsonify([l.to_dict() for l in lessons])

@lessons_bp.route('/<int:id>', methods=['GET'])
def get_lesson(id):
    lesson = Lesson.query.get_or_404(id)
    return jsonify(lesson.to_dict())
