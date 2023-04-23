import base64
import hashlib
import logging
import os
import secrets
import stat
import string

from cryptography.fernet import Fernet
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from decouple import AutoConfig
from django.conf import settings
from django.db import transaction

logger = logging.getLogger(__name__)


def generate_hash(file):
    logger.info(f"BEGIN: Hash generation")
    sha256 = hashlib.sha256()
    file.seek(0)
    while True:
        buf = file.read(104857600)
        if not buf:
            break
        sha256.update(buf)
    sha256 = sha256.hexdigest()
    file.seek(0)
    logger.info(f"END: Hash generation")
    return sha256


def generate_key(password=None, salt=None):
    logger.info(f"BEGIN: Key generation")
    config = AutoConfig(settings.BASE_DIR / "base" / ".env")

    password = (
        config("SDJ_PWD").encode("utf-8")
        if password is None
        else password.encode("utf-8")
    )
    salt = config("SDJ_SALT").encode("utf-8") if salt is None else salt.encode("utf-8")

    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
        backend=default_backend(),
    )
    key = base64.urlsafe_b64encode(kdf.derive(password))

    logger.info(f"END: Key generation")
    return key


def generate_file_name(file_dir):
    logger.info(f"BEGIN: File name generation")
    exists = True
    while exists:
        file_name = "".join(
            secrets.choice(string.ascii_letters + string.digits) for _ in range(64)
        )
        path = "{}{}".format(file_dir, file_name).replace("\\", "/")
        exists = os.path.isfile(path)

    logger.info(f"END: File name generation")
    return file_name


@transaction.atomic
def encrypt(data, password=None, salt=None):
    logger.info(f"BEGIN: Encryption")
    key = generate_key(password, salt)
    fernet = Fernet(key)
    encrypted = fernet.encrypt(data)

    logger.info(f"END: Encryption")
    return encrypted


@transaction.atomic
def decrypt(data, password=None, salt=None):
    logger.info(f"BEGIN: Decryption")
    key = generate_key(password, salt)
    fernet = Fernet(key)
    decrypted = fernet.decrypt(data)

    logger.info(f"END: Decryption")
    return decrypted


@transaction.atomic
def save_file(data, file_dir, file_name, file_ext=""):
    logger.info(f"BEGIN: Saving file")
    file_path = "{}{}{}".format(file_dir, file_name, file_ext).replace("\\", "/")
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    with open(file_path, "wb") as file:
        file.write(data)
    os.chmod(file_path, stat.S_IREAD | stat.S_IRGRP | stat.S_IROTH)

    logger.info(f"END: Saving file")
    return file_path


@transaction.atomic
def encrypt_and_save(data, password=None, salt=None):
    config = AutoConfig(settings.BASE_DIR / "base" / ".env")
    encrypted = encrypt(data, password, salt)

    file_dir = str(settings.BASE_DIR) + str(config("SDJ_DIR"))
    file_name = generate_file_name(file_dir)
    file_path = save_file(data=encrypted, file_dir=file_dir, file_name=file_name)

    return file_path


@transaction.atomic
def decrypt_and_retrieve(file_path, password=None, salt=None):
    with open(file_path, "rb") as file:
        data = file.read()
    decrypted = decrypt(data, password, salt)

    return decrypted
