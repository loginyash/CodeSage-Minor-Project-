from app import db
from datetime import datetime

class CodeExecution(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    language = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), nullable=False) # 'success', 'error', 'timeout'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<CodeExecution {self.language} - {self.status}>'
