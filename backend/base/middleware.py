from django.http import HttpResponse
from rest_framework import status
from .models import MaintenanceLog


class RequestMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        under_maintenance = MaintenanceLog.objects.filter(is_active=True).exists()
        if under_maintenance:
            response = HttpResponse(
                {
                    "data": {
                        "error": "System under maintenance. Please try again later."
                    }
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        else:
            response = self.get_response(request)

        return response
