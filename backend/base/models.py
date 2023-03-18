from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):

    use_in_migration = True

    def create_user(self, username, password, **extra_fields):
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password, **extra_fields):
        extra_fields.setdefault("is_admin", True)
        extra_fields.setdefault("can_add", True)
        extra_fields.setdefault("can_view", True)
        extra_fields.setdefault("view_level", "GBL")

        return self.create_user(username, password, **extra_fields)


class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=12, unique=True)
    password = models.CharField(max_length=256)
    email = models.EmailField(max_length=48, unique=True)
    can_add = models.BooleanField(default=False)
    can_view = models.BooleanField(default=False)
    view_level = models.CharField(
        max_length=4,
        default="NONE",
        choices=(("NONE", "NONE"), ("SELF", "SELF"), ("HUB", "HUB"), ("GBL", "GBL")),
    )
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["password", "email"]

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin

    def is_staff(self):
        return self.is_admin

    class Meta:
        db_table = "user"


def gen_hub_tag():
    last_id = Hub.objects.all().order_by("id").last()
    last_id = 1 if last_id is None else last_id.id + 1
    return "HUB" + str(last_id).zfill(3)


class Hub(models.Model):
    id = models.AutoField(primary_key=True)
    tag = models.CharField(max_length=6, default=gen_hub_tag, editable=False)
    name = models.CharField(max_length=12)
    description = models.CharField(max_length=50)

    class Meta:
        db_table = "hub"


def gen_evidence_tag():
    last_id = Evidence.objects.all().order_by("id").last()
    last_id = 1 if last_id is None else last_id.id + 1
    return "EVID" + str(last_id).zfill(4)


class Evidence(models.Model):
    id = models.AutoField(primary_key=True)
    tag = models.CharField(max_length=8, default=gen_evidence_tag, editable=False)
    name = models.CharField(max_length=24)
    description = models.CharField(max_length=100)
    uploader = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    hub = models.ForeignKey(Hub, on_delete=models.SET_NULL, null=True)
    upload_time = models.TimeField()
    file = models.FileField(upload_to="evidence/")

    class Meta:
        db_table = "evidence"
