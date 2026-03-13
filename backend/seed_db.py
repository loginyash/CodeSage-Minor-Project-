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
    
    from app.models.community import CommunityPost
    
    posts = [
        CommunityPost(
            author="Alex Chen",
            content="Just finished the Python Basics course! The section on list comprehensions was a game changer for me. Anyone have good project ideas to practice?",
            likes=12
        ),
        CommunityPost(
            author="Sarah Jenkins",
            content="I've been struggling with Redux for a week, but the CodeSage community finally helped me understand it. Thank you to everyone who answered my questions in the Discord!",
            likes=45
        ),
        CommunityPost(
            author="Marcus Rodriguez",
            content="Pro tip: always use environment variables for your API keys! Just learned this the hard way after getting a $500 AWS bill on a weekend project. 😅",
            likes=156
        )
    ]
    
    db.session.add_all(posts)
    db.session.commit()
    print("Seeded Community Posts.")

    # Seed Feedback
    from app.models.feedback import Feedback
    
    feedbacks = [
        Feedback(
            name="Elena R.",
            email="elena@example.com",
            message="CodeSage completely changed how I approach problem solving. The interactive terminal is incredible!"
        ),
        Feedback(
            name="David Kim",
            email="david@example.com",
            message="Finally, a learning platform that feels modern and actually teaches you to build things instead of just watching videos."
        ),
        Feedback(
            name="Anita S.",
            email="anita@example.com",
            message="The community here is the most supportive I've found. Got unstuck on my React project in 10 minutes."
        )
    ]
    
    db.session.add_all(feedbacks)
    db.session.commit()
    print("Seeded Feedback.")

    # Verify
    all_lessons = Lesson.query.all()
    for l in all_lessons:
        print(f"ID: {l.id} | Title: {l.title} | Video: {l.video_url}")
