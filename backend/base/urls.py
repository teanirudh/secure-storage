from . import views
from django.urls import path
from django.contrib import admin
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("", views.admin_login.as_view()),
    path("admin/", admin.site.urls),
    path("evidence/", views.evidence_data.as_view()),
    path("token/", views.MyTokenObtainPairView.as_view(), name="token_obtain"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
