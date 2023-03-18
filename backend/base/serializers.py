from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.serializers import ModelSerializer
from .models import EvidenceData


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        token["is_superuser"] = user.is_superuser
        token["view_level"] = user.view_level
        return token


class EvidenceDataSerializer(ModelSerializer):
    class Meta:
        model = EvidenceData
        fields = "__all__"
