import os
import tempfile
from flask import Blueprint, request, jsonify
from app import db
from app.models.analytics import CodeExecution

execute_bp = Blueprint('execute', __name__)

@execute_bp.route('/run', methods=['POST'])
def run_code():
    data = request.get_json()
    if not data or 'language' not in data or 'files' not in data:
        return jsonify({'error': 'Invalid request payload'}), 400

    language = data['language'].lower()
    files = data['files']
    
    if not files or not files[0].get('content'):
         return jsonify({'error': 'No code provided'}), 400
         
    code = files[0]['content']

    try:
        # Create a temporary directory to run code safely
        with tempfile.TemporaryDirectory() as temp_dir:
            file_path = ""
            command = []

            if language == "python":
                file_path = os.path.join(temp_dir, "script.py")
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(code)
                command = ["python", file_path]
                
            elif language == "javascript":
                file_path = os.path.join(temp_dir, "script.js")
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(code)
                command = ["node", file_path]
                
            else:
                 return jsonify({'error': f"Language '{language}' execution is not supported locally yet."}), 400

            # Execute the code with a timeout
            process = subprocess.run(
                command,
                cwd=temp_dir,
                capture_output=True,
                text=True,
                timeout=10 # 10 seconds execution timeout to prevent infinite loops
            )

            output = process.stdout
            if process.stderr:
                output += f"\nErrors:\n{process.stderr}"

            # Log to Database
            execution = CodeExecution(
                language=language,
                status='success' if process.returncode == 0 else 'error'
            )
            db.session.add(execution)
            db.session.commit()

            return jsonify({
                'run': {
                    'output': output,
                    'code': process.returncode,
                    'stderr': process.stderr
                }
            })

    except subprocess.TimeoutExpired:
        execution = CodeExecution(
            language=language,
            status='timeout'
        )
        db.session.add(execution)
        db.session.commit()
        
        return jsonify({
            'run': {
                'output': 'Execution timed out (10s limit)',
                'code': 124,
                'stderr': 'Timeout'
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
