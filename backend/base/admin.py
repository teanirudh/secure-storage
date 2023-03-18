from django.contrib import admin
from .models import UserData, HubData, EvidenceData

admin.site.register(UserData)
admin.site.register(HubData)
admin.site.register(EvidenceData)
