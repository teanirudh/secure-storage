from django.http import HttpResponse
from rest_framework import status
from .models import MaintenanceLog
from django.contrib.auth.models import AnonymousUser


class RequestMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        under_maintenance = MaintenanceLog.objects.filter(is_active=True).exists()
        if under_maintenance:
            response = HttpResponse(
                {"error": "Service Unavailable"},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        else:
            response = self.get_response(request)

        if isinstance(request.user, AnonymousUser):
            return response

        if request.path == "/hubs/" or request.path == "/users/":
            if not request.user.is_admin:
                response = HttpResponse(
                    {"error": "Unauthorized"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

        return response
