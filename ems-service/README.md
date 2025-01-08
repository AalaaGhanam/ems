# Employee Management System Service

Welcome to the Employee Management System APIs written in NodeJS using NestJS framework.
This is a service orchestration layer responsible for connecting frontend applications to EMS backend business systems.

## Development
### Development Prerequisites

To start development on this project install the following applications:

1. VS Code (https://code.visualstudio.com/download)
2. Docker (https://docs.docker.com/engine/install/) It's better to run everything using docker as a capsulated application instead.
3. NodeJS (https://nodejs.org/en/download/)
4. NestJS cli on your computer `npm install -g @nestjs/cli`
4. PostgreSQL (https://www.postgresql.org/download/)

### Installation

Before starting development, create a feature branch from the develop branch following this pattern
feature/{feature-name}/{description-of-change} .e.g. feature/ems/admin-profile
Clone the repository and install project dependencies by running the below commands.

- Clone repository

```sh
git clone https://github.com/AalaaGhanam/ems
```

- Install node dependencies

```sh
npm i
```
Once all dependencies are installed start you can run the service using docker compose,
To set up environment variables copy and paste then rename the .dev.env files to .env.

> [!IMPORTANT]
> To initiate and sync the database with initial data database, I added migration script to run throw docker compose.


- Run Service
- Run Throw Docker
```sh
# Run
docker-compose up --build

# Stop
docker-compose down
docker volume rm ems-service_postgres-data
```

### Service Structure and Endpoints
 
EMS service consists of multiple controllers, 
You can try to login with admin credentials using 
```sh
{
  "username": "admin123",
  "password": "admin123"
}
```
Check swagger for detailed breakdown of the API endpoints:

http://localhost:3000/api#/