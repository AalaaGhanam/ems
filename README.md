# Employee Management System

Welcome to the Employee Management System APIs written in NodeJS using NestJS and ReactJS framework.
# EMS Backend

The detaild steps to run the backend service in the readme (https://github.com/AalaaGhanam/ems/blob/main/ems-service/README.md).

You can run the service using docker compose,
To set up environment variables copy and paste then rename the .dev.env files to .env.

> [!IMPORTANT]
> To initiate the initial data database, I added migration script to run throw docker compose if you run by docker compose the migrations files will run automatically.


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

# EMS Frontend

The detaild steps to run the backend service in the readme (https://github.com/AalaaGhanam/ems/blob/main/ems-frontend/README.md).

- Run Service

```sh
npm run start
```

- Run Throw Docker
```sh
# Run
docker-compose up --build

# Stop
docker-compose down
```

Access Throw: http://localhost:3001

Client Screenshots

![Admin Dashboard](<blob/Screenshot 2025-01-09 at 4.12.14 AM.png>)

![Department Management](<blob/Screenshot 2025-01-09 at 4.11.57 AM.png>)

![Employee Management](<blob/Screenshot 2025-01-09 at 4.11.49 AM.png>)

![Login](<blob/Screenshot 2025-01-09 at 4.12.23 AM.png>)