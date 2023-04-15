import os
import string
import secrets
from django.utils import timezone
from django.conf import settings
from decouple import AutoConfig
from .models import Evidence, MaintenanceLog
from .utils import encrypt_and_save, decrypt_and_retrieve


config = AutoConfig(settings.BASE_DIR / "base" / ".env")


def generate_new_password():
    password = "".join(
        secrets.choice(string.ascii_letters + string.digits) for _ in range(16)
    )
    return password


def generate_new_salt():
    salt = "".join(
        secrets.choice(string.ascii_letters + string.digits) for _ in range(8)
    )
    return salt


def reset_keys(password, salt):
    env = f'SDJ_PWD="{password}"\nSDJ_SALT="{salt}"\nSDJ_DIR="/media/"'
    with open(os.path.join(settings.BASE_DIR, "base/.env"), "w") as f:
        f.write(env)
    f.close()


def run_tasks():
    old_pwd = config("SDJ_PWD")
    old_salt = config("SDJ_SALT")

    log = MaintenanceLog()
    log.save()

    new_pwd = generate_new_password()
    new_salt = generate_new_salt()

    reset_keys(new_pwd, new_salt)
    evidence_qs = Evidence.objects.all()

    for evidence in evidence_qs:
        old_file_path = evidence.file_path
        data = decrypt_and_retrieve(old_file_path, old_pwd, old_salt)
        new_file_path = encrypt_and_save(data, new_pwd, new_salt)
        evidence.file_path = new_file_path
        evidence.save()
        os.remove(old_file_path)

    log.is_active = False
    log.old_pwd = old_pwd
    log.old_salt = old_salt
    log.end_time = timezone.now()
    log.save()
