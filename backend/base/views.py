import logging

import magic
from django.contrib.auth.hashers import make_password
from django.db import transaction
from django.db.models import F
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Evidence, Hub, User
from .serializers import (EvidenceSerializer, HubSerializer,
                          MyTokenObtainPairSerializer, UserSerializer)
from .utils import decrypt_and_retrieve, encrypt_and_save, generate_hash

logger = logging.getLogger(__name__)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@permission_classes([IsAuthenticated])
class HubView(APIView):
    def get(self, request):
        try:
            hubs = Hub.objects.all()
            serializer = HubSerializer(hubs, many=True)
        except Exception as e:
            logger.error(f"ERROR: {e}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            logger.info(f"SUCCESS: Hub list sent")
            return Response(serializer.data, status=status.HTTP_200_OK)

    @transaction.atomic
    def post(self, request):
        try:
            logger.info(f"BEGIN: Add hub")
            hub = Hub()
            hub.name = request.data["name"]
            hub.description = request.data["description"]
            hub.save()
            logger.info(f"END: Add hub")
        except Exception as e:
            logger.error(f"ERROR: {e}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            logger.info(f"SUCCESS: Hub added")
            return Response({"success": "Hub added"}, status=status.HTTP_200_OK)

    @transaction.atomic
    def patch(self, request):
        try:
            logger.info(f"BEGIN: Update hub")
            hub = Hub.objects.get(name=request.data["name"])
            fields = request.data["fields"] if "fields" in request.data else []
            for field in fields:
                hub.__setattr__(field, request.data[field])
            hub.save()
            logger.info(f"END: Update hub")
        except Exception as e:
            logger.error(f"ERROR: {e}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            logger.info(f"SUCCESS: Hub updated")
            return Response({"success": "Hub updated"}, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class UserView(APIView):
    def get(self, request):
        try:
            users = User.objects.all().filter(is_admin=False)
            serializer = UserSerializer(users, many=True)
        except Exception as e:
            logger.error(f"ERROR: {e}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            logger.info(f"SUCCESS: User list sent")
            return Response(serializer.data, status=status.HTTP_200_OK)

    @transaction.atomic
    def post(self, request):
        try:
            logger.info(f"BEGIN: Add user")
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
            new_user.hub = Hub.objects.get(id=request.data["hub_id"])
            new_user.is_admin = False
            new_user.save()
            Hub.objects.filter(id=request.data["hub_id"]).update(
                user_count=F("user_count") + 1
            )
            logger.info(f"END: Add user")
        except Exception as e:
            logger.error(f"ERROR: {e}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            logger.info(f"SUCCESS: User added")
            return Response({"success": "User added"}, status=status.HTTP_200_OK)

    @transaction.atomic
    def patch(self, request):
        try:
            logger.info(f"BEGIN: Update user")
            user = User.objects.get(username=request.data["username"])
            fields = request.data["fields"] if "fields" in request.data else []
            for field in fields:
                if field == "password":
                    user.__setattr__(field, make_password(request.data[field]))
                else:
                    user.__setattr__(field, request.data[field])
            user.save()
            logger.info(f"END: Update user")
        except Exception as e:
            logger.error(f"ERROR: {e}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            logger.info(f"SUCCESS: User updated")
            return Response({"success": "User updated"}, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class EvidenceView(APIView):
    def get(self, request):
        try:
            if request.user.is_admin:
                evidence = Evidence.objects.all()
                serializer = EvidenceSerializer(evidence, many=True)
                logger.info(f"SUCCESS: Evidence list sent")
                return Response(serializer.data, status=status.HTTP_200_OK)

            view_level = request.user.view_level
            evidence = []
            if view_level == "NONE":
                evidence = []
            elif view_level == "GBL":
                evidence = Evidence.objects.all()
            elif view_level == "HUB":
                evidence = Evidence.objects.filter(hub=request.user.hub)
            elif view_level == "USER":
                evidence = Evidence.objects.filter(user=request.user)
            serializer = EvidenceSerializer(evidence, many=True)

            evidence_data = {}
            evidence_data["evidence_list"] = serializer.data
            evidence_data["global_count"] = Evidence.objects.all().count()
            evidence_data["hub_count"] = Evidence.objects.filter(
                hub=request.user.hub
            ).count()
            evidence_data["user_count"] = Evidence.objects.filter(
                uploader=request.user
            ).count()
        except Exception as e:
            logger.error(f"ERROR: {e}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            logger.info(f"SUCCESS: Evidence data sent")
            return Response(evidence_data, status=status.HTTP_200_OK)

    @transaction.atomic
    def post(self, request):
        try:
            if not request.user.can_add:
                return Response(
                    {"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED
                )
            logger.info(f"BEGIN: Add evidence")
            evidence = Evidence()
            evidence.name = request.POST.get("name")
            evidence.description = request.POST.get("description")
            evidence.uploader = User.objects.get(id=request.user.id)
            evidence.hub = Hub.objects.get(id=request.user.hub_id)
            evidence.upload_time = timezone.now()
            evidence.hash = request.POST.get("hash")

            file = request.FILES.get("file")
            if evidence.hash != generate_hash(file):
                raise Exception("Hash does not match")

            evidence.file_name = file.name
            data = file.read()
            file_path = encrypt_and_save(data=data)
            evidence.file_path = file_path
            evidence.save()
            Hub.objects.filter(id=request.user.hub_id).update(
                evidence_count=F("evidence_count") + 1
            )
            logger.info(f"END: Add evidence")
        except Exception as e:
            logger.error(f"ERROR: {e}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            logger.info(f"SUCCESS: Evidence added")
            return Response({"success": "Evidence added"}, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class EvidenceDownloadView(APIView):
    def post(self, request):
        try:
            view_level = request.user.view_level
            if view_level == "NONE":
                return Response(
                    {"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED
                )
            logger.info(f"BEGIN: Evidence download")
            id = request.data["id"]
            evidence = Evidence.objects.get(id=id)
            file_name = evidence.file_name
            file_path = evidence.file_path
            data = decrypt_and_retrieve(file_path=file_path)
            logger.info(f"END: Evidence download")
        except Exception as e:
            logger.error(f"ERROR: {e}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            logger.info(f"SUCCESS: Evidence downloaded")
            return Response(
                data,
                content_type=magic.Magic(mime=True).from_buffer(data),
                headers={"Content-Disposition": f"attachment; filename={file_name}"},
                status=status.HTTP_200_OK,
            )
