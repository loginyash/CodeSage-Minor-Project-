import google.generativeai as genai
from flask import current_app

class AIService:
    def get_response(self, prompt, context=""):
        api_key = current_app.config.get('GEMINI_API_KEY')
        if not api_key:
            return "AI Service is not configured (Missing API Key)."
        
        try:
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('gemini-pro')
            
            system_instruction = "You are Code Sage, an expert AI coding tutor. Explain concepts clearly, provide examples, and be encouraging."
            full_prompt = f"{system_instruction}\n\nContext: {context}\n\nUser: {prompt}\n\nCode Sage:"
            
            response = model.generate_content(full_prompt)
            return response.text
        except Exception as e:
            return f"Error generating response: {str(e)}"

ai_service = AIService()
