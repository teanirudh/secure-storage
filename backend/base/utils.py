import base64
import hashlib
import os
import stat
import string
import secrets
from django.conf import settings
from cryptography.fernet import Fernet
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC


def generate_hash(file):
    sha256 = hashlib.sha256()
    file.seek(0)
    while True:
        buf = file.read(104857600)
        if not buf:
            break
        sha256.update(buf)
    sha256 = sha256.hexdigest()
    file.seek(0)
    return sha256


def generate_key(password=None, salt=None):
    password = (
        settings.SDJ_PASSWORD.encode("utf-8")
        if password is None
        else password.encode("utf-8")
    )
    salt = settings.SDJ_SALT.encode("utf-8") if salt is None else salt.encode("utf-8")

    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
        backend=default_backend(),
    )
    key = base64.urlsafe_b64encode(kdf.derive(password))

    return key


def encrypt(data):
    key = generate_key()
    fernet = Fernet(key)
    encrypted = fernet.encrypt(data)

    return encrypted


def decrypt(data):
    key = generate_key()
    fernet = Fernet(key)
    decrypted = fernet.decrypt(data)

    return decrypted


def save_file(data, file_dir, file_name, file_ext=""):
    file_path = "{}{}{}".format(file_dir, file_name, file_ext).replace("\\", "/")
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    with open(file_path, "wb") as file:
        file.write(data)
    os.chmod(file_path, stat.S_IREAD | stat.S_IRGRP | stat.S_IROTH)

    return file_path


def encrypt_and_save(file):
    data = file.read()
    encrypted = encrypt(data)

    file_dir = settings.SDJ_DIR
    file_name = "".join(
        secrets.choice(string.ascii_letters + string.digits) for i in range(64)
    )
    file_ext = os.path.splitext(file.name)[1]

    file_path = save_file(
        data=encrypted, file_dir=file_dir, file_name=file_name, file_ext=file_ext
    )
    return file_path


def decrypt_and_retrieve(file_path):
    with open(file_path, "rb") as file:
        data = file.read()
    decrypted = decrypt(data)

    return decrypted
