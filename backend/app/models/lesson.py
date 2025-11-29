from app import db
from datetime import datetime
from app import db
from datetime import datetime

class Lesson(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    level = db.Column(db.String(20)) # beginner, intermediate, advanced
    content = db.Column(db.Text, nullable=False) # Markdown content or link
    video_url = db.Column(db.String(255), nullable=True)
    is_video = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'level': self.level,
            'content': self.content,
            'videoUrl': self.video_url,
            'isVideo': self.is_video,
            'createdAt': self.created_at.isoformat()
        }
