from django.contrib import admin

from .models import Evidence, Hub, User

admin.site.register(User)
admin.site.register(Hub)
admin.site.register(Evidence)
