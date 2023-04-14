FROM python:3

ENV PYTHONUNBUFFERED 1

WORKDIR /app/backend

COPY requirements.txt ./

RUN pip install -r requirements.txt

EXPOSE 8000

RUN apt-get update && apt-get install cron -y

COPY entrypoint.sh ./

RUN chmod +x entrypoint.sh

ENTRYPOINT ["/app/backend/entrypoint.sh"]
