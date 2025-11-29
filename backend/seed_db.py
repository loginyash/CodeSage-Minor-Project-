from app import create_app, db
from app.models.lesson import Lesson
from sqlalchemy import text

app = create_app()

with app.app_context():
    # Drop and recreate tables to ensure clean slate
    db.drop_all()
    db.create_all()
    
    print("Tables recreated.")

    # Explicitly seed with IDs
    lessons = [
        Lesson(
            id=1,
            title="Python Basics", 
            description="Introduction to Python syntax and variables. Learn the fundamentals of one of the most popular programming languages.", 
            level="beginner", 
            content="# Python Basics\n\nPython is a high-level, interpreted programming language...",
            video_url="rfscVS0vtbw", # FreeCodeCamp Python
            is_video=True
        ),
        Lesson(
            id=2,
            title="Data Structures", 
            description="Master Lists, Dictionaries, and Sets. Understand how to organize and store data efficiently.", 
            level="intermediate", 
            content="# Data Structures\n\nData structures are fundamental constructs...",
            video_url="pkYVOmU3MgA", # FreeCodeCamp Data Structures
            is_video=True
        ),
        Lesson(
            id=3,
            title="Flask Web Dev", 
            description="Building web apps with Flask. Create dynamic web applications using Python.", 
            level="advanced", 
            content="# Flask Web Development\n\nFlask is a micro web framework...",
            video_url="Z1RJmh_OqeA", # FreeCodeCamp Flask
            is_video=True
        )
    ]
    
    db.session.add_all(lessons)
    db.session.commit()
    print("Seeding complete with fixed IDs (1, 2, 3).")
    
    # Verify
    all_lessons = Lesson.query.all()
    for l in all_lessons:
        print(f"ID: {l.id} | Title: {l.title} | Video: {l.video_url}")
