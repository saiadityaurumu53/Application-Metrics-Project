# authapi/views.py

from django.contrib.auth.models import User

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .mongo.profile import get_user_profile, create_or_update_user_profile

@api_view(['POST'])
def register_user(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")
    full_name = request.data.get("full_name", "")  
    phone = request.data.get("phone", "")

    if not username or not password or not email:
        return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, email=email)

    create_or_update_user_profile(str(user.id), {
        "full_name": full_name,
        "phone": phone,
        "theme": "light",
        "avatar_url": "",
        "bio": "",
        "skills": [],
    })

    return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def protected_view(request):
    user = request.user
    return Response({
        "message": f"🔐 Welcome {user.username}, you have accessed a protected endpoint.",
        "authenticated": True,
        "user": {
            "username": user.username,
            "email": user.email,
            "is_staff": user.is_staff,
        }
    })



@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user_id = str(request.user.id)

    if request.method == "GET":
        profile = get_user_profile(user_id)
        if not profile:
            return Response({"profile": {}, "user": request.user.username})
        if "_id" in profile:
            del profile["_id"]
        return Response({"profile": profile, "user": request.user.username})

    if request.method == "POST":
        data = request.data
        create_or_update_user_profile(user_id, data)
        return Response({"status": "Profile updated successfully"})