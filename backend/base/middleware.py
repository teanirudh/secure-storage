import os
from django.http import HttpResponse
from rest_framework import status


class RequestMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if os.getenv("MAINTENANCE_MODE") == "on":
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
