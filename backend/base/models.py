from django.db import models


class Admin(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=12, unique=True)
    password = models.CharField(max_length=24)
    email = models.EmailField(max_length=50, unique=True)
    last_login_time = models.TimeField()

    class Meta:
        db_table = "admin"


class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=12, unique=True)
    password = models.CharField(max_length=24)
    email = models.EmailField(max_length=50, unique=True)
    hub_tag = models.CharField(max_length=50)
    can_add = models.BooleanField(default=False)
    can_view = models.BooleanField(default=False)
    view_level = models.CharField(
        max_length=4,
        default="NONE",
        choices=(("NONE", "NONE"), ("SELF", "SELF"), ("HUB", "HUB"), ("GBL", "GBL")),
    )
    last_login_time = models.TimeField()

    class Meta:
        db_table = "user"


class Hub(models.Model):
    id = models.AutoField(primary_key=True)
    tag = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200)

    class Meta:
        db_table = "hub"


class Evidence(models.Model):
    id = models.AutoField(primary_key=True)
    tag = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    uploader_tag = models.CharField(max_length=50)
    hub_tag = models.CharField(max_length=50)
    upload_time = models.TimeField()
    file = models.FileField(upload_to="evidence/")

    class Meta:
        db_table = "evidence"
