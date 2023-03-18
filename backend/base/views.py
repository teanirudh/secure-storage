import json
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

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
class user_view(APIView):
    def get(self, request):
        pass


@permission_classes([IsAuthenticated])
class hub_view(APIView):
    def get(self, request):
        pass


@permission_classes([IsAuthenticated])
class evidence_view(APIView):
    def get(self, request):
        pass
