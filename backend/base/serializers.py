from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.serializers import ModelSerializer
from .models import User, Hub, Evidence


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        token["is_admin"] = user.is_admin
        token["view_level"] = user.view_level
        token["hub_id"] = user.hub_id
        return token


class HubSerializer(ModelSerializer):
    class Meta:
        model = Hub
        fields = ["id", "name", "description", "user_count", "evidence_count"]


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "hub_id",
            "can_add",
            "can_view",
            "view_level",
            "last_login",
        ]


class EvidenceSerializer(ModelSerializer):
    class Meta:
        model = Evidence
        fields = [
            "id",
            "name",
            "description",
            "uploader_id",
            "hub_id",
            "upload_time",
            "file_name",
        ]
