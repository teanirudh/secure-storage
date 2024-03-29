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
cd secure-storage

# Database credentials
cat > backend/backend/.env
SECRET_KEY="django-insecure-q^vd8fyr4&_#af+r=z!*9j7k50n46cw#w(jd%+wh6*#rl(p1_+"
DB_NAME="securedb"
DB_USER="root"
DB_PASSWORD="2580"
DB_HOST="host.docker.internal"
DB_PORT=3306

# Encryption credentials
cat > backend/base/.env
SDJ_PWD="RF63LdDpXuLibiSQ"
SDJ_SALT="vRt3vlL2"
SDJ_DIR="/media/"
```

## Setup the database

```shell
mysql --user "root" --password="2580" < backend/dump.sql 
```

## Start the application

```shell
# Build the images 
docker-compose build

# Run the containers
docker-compose up
```

## Access the application

* URL: [http://localhost:3000](http://localhost:3000)
* Username: admin
* Password: 2580

## Change the password

```shell
docker-compose exec backend python manage.py changepassword admin
```
