from django.utils import timezone
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password

from .models import User, Hub, Evidence
from .serializers import (
    UserSerializer,
    HubSerializer,
    EvidenceSerializer,
    MyTokenObtainPairSerializer,
)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@permission_classes([IsAuthenticated])
class UserView(APIView):
    def get(self, request):
        try:
            users = User.objects.all().filter(is_admin=False)
            serializer = UserSerializer(users, many=True)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            new_user = User()
            new_user.username = request.data["username"]
            new_user.password = make_password(request.data["password"])
            new_user.email = request.data["email"]
            new_user.can_add = (
                request.data["can_add"] if "can_add" in request.data else False
            )
            new_user.can_view = (
                request.data["can_view"] if "can_view" in request.data else False
            )
            new_user.view_level = (
                request.data["view_level"] if "view_level" in request.data else "NONE"
            )
            new_user.is_admin = False
            new_user.save()
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"success": "User added"}, status=status.HTTP_200_OK)

    def patch(self, request):
        try:
            user = User.objects.get(username=request.data["username"])
            fields = request.data["fields"] if "fields" in request.data else []
            for field in fields:
                if field == "password":
                    user.__setattr__(field, make_password(request.data[field]))
                else:
                    user.__setattr__(field, request.data[field])
            user.save()
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"success": "User changed"}, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class HubView(APIView):
    def get(self, request):
        try:
            if not request.user.is_admin:
                return Response(
                    {"error": "Unauthorized"}, status=status.HTTP_400_BAD_REQUEST
                )
            hubs = Hub.objects.all()
            serializer = HubSerializer(hubs, many=True)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            hub = Hub()
            hub.name = request.data["name"]
            hub.description = request.data["description"]
            hub.save()
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"success": "Hub added"}, status=status.HTTP_200_OK)

    def patch(self, request):
        try:
            hub = Hub.objects.get(name=request.data["name"])
            fields = request.data["fields"] if "fields" in request.data else []
            for field in fields:
                hub.__setattr__(field, request.data[field])
            hub.save()
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"success": "Hub changed"}, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class EvidenceView(APIView):
    def get(self, request):
        try:
            view_level = request.user.view_level
            evidence = []
            if view_level == "NONE":
                return Response(
                    {"error": "Unauthorized"}, status=status.HTTP_400_BAD_REQUEST
                )
            elif view_level == "GBL":
                evidence = Evidence.objects.all()
            elif view_level == "HUB":
                evidence = Evidence.objects.filter(hub=request.user.hub)
            elif view_level == "USER":
                evidence = Evidence.objects.filter(user=request.user)
            serializer = EvidenceSerializer(evidence, many=True)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            evidence = Evidence()
            evidence.name = request.data["name"]
            evidence.description = request.data["description"]
            evidence.uploader = User.objects.get(id=request.user.id)
            evidence.hub = Hub.objects.get(id=request.user.hub_id)
            evidence.upload_time = timezone.now().strftime("%Y-%m-%d %H:%M:%S")
            evidence.file = request.data["file"] if "file" in request.data else None
            evidence.save()
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"success": "Evidence added"}, status=status.HTTP_200_OK)
