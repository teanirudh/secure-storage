import datetime
import os
from django.conf import settings


def run_tasks():
    with open(os.path.join(settings.BASE_DIR, "debug.log"), "a") as f:
        f.write("Running tasks at: " + str(datetime.datetime.now()) + "\n")
    f.close()
