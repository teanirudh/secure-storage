# Secure Storage Model

## Prerequisites

* [Docker Desktop](https://www.docker.com/products/docker-desktop)
* [MySQL Server](https://dev.mysql.com/downloads/mysql)
* [DBeaver Community](https://dbeaver.io/download)
* [SSH Connection](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

## Clone the repository

```shell
git clone git@github.com:teanirudh/secure-storage.git
```

## Define environment variables

```shell
cd secure-storage/backend
cat > .env

SECRET_KEY="django-insecure-q^vd8fyr4&_#af+r=z!*9j7k50n46cw#w(jd%+wh6*#rl(p1_+"
DB_NAME="securedb"
DB_USER="root"
DB_PASSWORD="2580"
DB_HOST="host.docker.internal"
DB_PORT=3306
```

## Run the application

```shell
docker-compose up --build --remove-orphans
```
