import logging
import os
import secrets
import string

from decouple import AutoConfig
from django.conf import settings
from django.db import transaction
from django.utils import timezone

from .models import Evidence, MaintenanceLog
from .utils import decrypt_and_retrieve, encrypt_and_save

logger = logging.getLogger(__name__)


def generate_new_password():
    logger.info(f"BEGIN: New password generation")
    password = "".join(
        secrets.choice(string.ascii_letters + string.digits) for _ in range(16)
    )
    logger.info(f"END: New password generation")
    return password


def generate_new_salt():
    logger.info(f"BEGIN: New salt generation")
    salt = "".join(
        secrets.choice(string.ascii_letters + string.digits) for _ in range(8)
    )
    logger.info(f"END: New salt generation")
    return salt


@transaction.atomic
def reset_keys(password, salt):
    logger.info(f"BEGIN: Resetting keys")
    env = f'SDJ_PWD="{password}"\nSDJ_SALT="{salt}"\nSDJ_DIR="/media/"'
    with open(os.path.join(settings.BASE_DIR, "base/.env"), "w") as f:
        f.write(env)
    f.close()
    logger.info(f"END: Resetting keys")


@transaction.atomic
def resolve_evidence(evidence, old_pwd, old_salt, new_pwd, new_salt):
    logger.info(f"\nBEGIN: Resolving evidence {evidence.id}")
    old_file_path = evidence.file_path

    data = decrypt_and_retrieve(old_file_path, old_pwd, old_salt)
    new_file_path = encrypt_and_save(data, new_pwd, new_salt)

    evidence.file_path = new_file_path
    evidence.save()

    os.remove(old_file_path)
    logger.info(f"END: Resolving evidence {evidence.id}")


@transaction.atomic
def maintenance():
    try:
        logger.info(f"\nBEGIN: Maintenance at {timezone.now()}\n")
        config = AutoConfig(settings.BASE_DIR / "base" / ".env")

        old_pwd = config("SDJ_PWD")
        old_salt = config("SDJ_SALT")

        log = MaintenanceLog()
        log.save()

        new_pwd = generate_new_password()
        new_salt = generate_new_salt()
        reset_keys(new_pwd, new_salt)

        evidence_qs = Evidence.objects.all()
        for evidence in evidence_qs:
            resolve_evidence(evidence, old_pwd, old_salt, new_pwd, new_salt)

        log.is_active = False
        log.old_pwd = old_pwd
        log.old_salt = old_salt
        log.end_time = timezone.now()
        log.save()

        logger.info(f"\nEND: Maintenance at {timezone.now()}\n")
    except Exception as e:
        logger.error(f"ERROR: {e}")
