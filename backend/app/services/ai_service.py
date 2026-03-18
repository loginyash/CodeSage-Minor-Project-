import google.generativeai as genai
from flask import current_app

SYSTEM_INSTRUCTION = (
    "You are Code Sage, an expert AI coding tutor built into the CodeSage learning platform. "
    "You help students learn programming by explaining concepts clearly, providing short code examples, "
    "and giving encouraging feedback. Keep responses concise and beginner-friendly. "
    "Use markdown formatting for code blocks."
)

class AIService:
    def get_response(self, prompt: str, context: str = "") -> str:
        api_key = current_app.config.get('GEMINI_API_KEY')

        if not api_key:
            return (
                "⚠️ AI Service is not configured. "
                "Please add a valid GEMINI_API_KEY to the backend .env file."
            )

        try:
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel(
                model_name='gemini-2.5-flash',
                system_instruction=SYSTEM_INSTRUCTION
            )

            user_prompt = f"{context}\n\n{prompt}".strip() if context else prompt
            response = model.generate_content(user_prompt)
            return response.text

        except Exception as e:
            error_msg = str(e)
            if "API_KEY_INVALID" in error_msg or "INVALID_ARGUMENT" in error_msg:
                return "⚠️ The Gemini API key is invalid. Please update GEMINI_API_KEY in backend/.env and restart the server."
            if "quota" in error_msg.lower() or "RESOURCE_EXHAUSTED" in error_msg:
                return "⚠️ API quota exceeded. Please wait a moment and try again."
            return f"⚠️ Error: {error_msg}"


ai_service = AIService()
