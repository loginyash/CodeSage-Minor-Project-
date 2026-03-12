from app import create_app, db
import firebase_admin
from firebase_admin import credentials, auth
import os

app = create_app()

def clear_credentials():
    print("WARNING: This script will delete ALL Firebase users and clear your local SQLite Database.")
    print("Initializing...")

    # 1. Clear Local DB
    with app.app_context():
        print("Dropping all local database tables...")
        db.drop_all()
        print("Recreating database tables...")
        db.create_all()
        print("Done. DB is fresh.\n")

    # 2. Clear Firebase Users
    # Check if already initialized to avoid errors
    if not firebase_admin._apps:
        cred_path = os.path.join(os.path.dirname(__file__), 'app', 'api', 'serviceAccountKey.json')
        if os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)
            print("Firebase Admin initialized using serviceAccountKey.json.")
        else:
            print(f"SERVICE ACCOUNT KEY IN {cred_path} NOT FOUND.")
            print("Please ensure credentials exist. Aborting Firebase wipe.")
            return

    try:
        # Get all users (maximum 1000 per request, handling pagination)
        print("Fetching Firebase users...")
        page = auth.list_users()
        while page:
            for user in page.users:
                print(f"Deleting user: {user.email} (UID: {user.uid})")
                auth.delete_user(user.uid)
            page = page.get_next_page()

        print("\nAll Firebase users have been successfully deleted.")
    except Exception as e:
        print(f"An error occurred while deleting Firebase users: {e}")

if __name__ == '__main__':
    clear_credentials()
