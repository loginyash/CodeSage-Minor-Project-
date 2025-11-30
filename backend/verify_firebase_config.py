"""
Quick verification script to check if Firebase environment variables are set correctly.
Run this on Render to debug the configuration.
"""
import os

required_vars = [
    "FIREBASE_PROJECT_ID",
    "FIREBASE_PRIVATE_KEY_ID",
    "FIREBASE_PRIVATE_KEY",
    "FIREBASE_CLIENT_EMAIL",
    "FIREBASE_CLIENT_ID",
    "FIREBASE_CLIENT_CERT_URL"
]

print("=== Firebase Environment Variables Check ===\n")

all_present = True
for var in required_vars:
    value = os.getenv(var)
    if value:
        # Show first 20 chars to verify without exposing full credentials
        preview = value[:20] + "..." if len(value) > 20 else value
        print(f"✅ {var}: {preview}")
    else:
        print(f"❌ {var}: NOT SET")
        all_present = False

print("\n" + "="*50)
if all_present:
    print("✅ All environment variables are set!")
    print("If you're still getting errors, check Render logs for specific issues.")
else:
    print("❌ Missing environment variables!")
    print("Add the missing variables in Render Dashboard → Environment")
