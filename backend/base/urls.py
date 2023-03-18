from . import views
from django.urls import path
from django.contrib import admin
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("token/", views.MyTokenObtainPairView.as_view(), name="token_obtain"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("user/", views.UserView.as_view(), name="user"),
    path("hub/", views.HubView.as_view(), name="hub"),
    path("evidence/", views.EvidenceView.as_view(), name="evidence"),
]
