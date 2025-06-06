from pymongo import MongoClient
import os

# Connect to MongoDB (local or use environment variable)
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URI)

# Choose database and collection
db = client["project_alpha"]  # You can rename this
profile_collection = db["user_profiles"]

# Fetch profile
def get_user_profile(user_id):
    return profile_collection.find_one({"user_id": user_id})

# Create or update profile
def create_or_update_user_profile(user_id, data: dict):
    profile_collection.update_one(
        {"user_id": user_id},
        {"$set": data},
        upsert=True
    )
