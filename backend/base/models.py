from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserManager(BaseUserManager):

    use_in_migration = True

    def create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError("Username is Required")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("can_add", True)
        extra_fields.setdefault("can_view", True)
        extra_fields.setdefault("view_level", "GBL")

        return self.create_user(username, password, **extra_fields)


class UserData(AbstractUser):

    username = models.CharField(max_length=12, unique=True)
    password = models.CharField(max_length=256)
    email = models.EmailField(max_length=50, unique=True)
    hub_tag = models.CharField(max_length=12)
    can_add = models.BooleanField(default=False)
    can_view = models.BooleanField(default=False)
    view_level = models.CharField(
        max_length=4,
        default="NONE",
        choices=(("NONE", "NONE"), ("SELF", "SELF"), ("HUB", "HUB"), ("GBL", "GBL")),
    )
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["password", "email"]

    def __str__(self):
        return self.username

    class Meta:
        db_table = "user_data"


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
