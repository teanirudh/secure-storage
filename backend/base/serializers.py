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


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class HubSerializer(ModelSerializer):
    class Meta:
        model = Hub
        fields = "__all__"


class EvidenceSerializer(ModelSerializer):
    class Meta:
        model = Evidence
        fields = "__all__"
