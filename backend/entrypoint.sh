#!/bin/sh

if [ "$1" = cron ]; then
    python manage.py crontab add
    python manage.py crontab show
else
    python manage.py migrate --fake
    python manage.py makemigrations
    python manage.py migrate
fi

exec "$@"
