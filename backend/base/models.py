from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


def gen_hub_pk():
    last_id = Hub.objects.all().order_by("id").last()
    last_id = int(last_id.id[4:]) + 1 if last_id else 1
    return "HUBX" + str(last_id).zfill(6)


class Hub(models.Model):
    id = models.CharField(primary_key=True, max_length=10, default=gen_hub_pk)
    name = models.CharField(max_length=64, unique=True)
    description = models.CharField(max_length=256)
    user_count = models.IntegerField(default=0)
    evidence_count = models.IntegerField(default=0)

    class Meta:
        db_table = "hub"


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


def gen_user_pk():
    last_id = User.objects.all().order_by("id").last()
    last_id = int(last_id.id[4:]) + 1 if last_id else 1
    return "USER" + str(last_id).zfill(6)


class User(AbstractBaseUser):
    id = models.CharField(primary_key=True, max_length=10, default=gen_user_pk)
    username = models.CharField(max_length=12, unique=True)
    password = models.CharField(max_length=256)
    email = models.EmailField(max_length=64, unique=True)
    hub = models.ForeignKey(Hub, on_delete=models.SET_NULL, null=True)
    can_add = models.BooleanField(default=False)
    can_view = models.BooleanField(default=False)
    view_level = models.CharField(
        max_length=4,
        default="NONE",
        choices=(("NONE", "NONE"), ("USER", "USER"), ("HUB", "HUB"), ("GBL", "GBL")),
    )
    is_admin = models.BooleanField(default=False)
    last_login = models.DateTimeField(auto_now=True)

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


def gen_evidence_pk():
    last_id = Evidence.objects.all().order_by("id").last()
    last_id = int(last_id.id[4:]) + 1 if last_id else 1
    return "EVID" + str(last_id).zfill(6)


class Evidence(models.Model):
    id = models.CharField(primary_key=True, max_length=10, default=gen_evidence_pk)
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256)
    uploader = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    hub = models.ForeignKey(Hub, on_delete=models.SET_NULL, null=True)
    upload_time = models.DateTimeField()
    hash = models.CharField(max_length=64, null=True)
    file_name = models.CharField(max_length=256, null=True)
    file_path = models.CharField(max_length=512, null=True)

    class Meta:
        db_table = "evidence"
        verbose_name_plural = "evidence"
