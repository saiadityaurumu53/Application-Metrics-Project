# authapi/views.py

from django.contrib.auth.models import User

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def register_user(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")

    if not username or not password or not email:
        return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, email=email)
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