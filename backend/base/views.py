import json
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import EvidenceData
from .serializers import EvidenceDataSerializer, MyTokenObtainPairSerializer


class admin_login(APIView):
    def post(self, request):
        pass


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@permission_classes([IsAuthenticated])
class evidence_data(APIView):
    def get(self, request):
        user = request.user
        evidence = EvidenceData.objects.all()
        serializer = EvidenceDataSerializer(evidence, many=True)
        return Response(serializer.data)
