# Employee Management System Client

Welcome to the EMS Client project written in Typescript using ReactJS framework.

## App Structure and features
 
**Overview**
This is a React application built using Ant Design for UI components. It interacts with the EMS service APIs (http://localhost:3000/api#/) to provide a seamless shopping experience.<br />

## Installation

Before starting development, create a feature branch from the develop branch following this pattern
feature/{feature-name}/{description-of-change} .e.g. feature/ems/admin
Clone the repository and install project dependencies by running the below commands.

- Clone repository

```sh
git clone https://github.com/AalaaGhanam/ems
```

- Install node dependencies

```sh
npm i
```

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

**Features**
1. **Authentication:**<br />
-  Login page with username/password <br />
- Logout functionality <br />
- Token management <br />
- Route protection for authenticated users<br />
2. **Admin Dashboard:**<br />
- Responsive design using a modern CSS framework<br />
- Navigation menu<br />
- Dashboard overview with:<br />
■ T otal employee count<br />
■ Department distribution<br />
■ Recent hires<br />
3. **Employee Management:**<br />
- Employee list with:<br />
■ Sorting capabilities<br />
■ Search functionality<br />
■ Pagination<br />
- CRUD operations:<br />
■ Add new employee form<br />
■ Edit employee details<br />
■ Delete employee with confirmation<br />
- Data validation<br />
- Loading states and error handling<br />
4. **Department Managementt:**<br />
- Department list with:<br />
■ Sorting capabilities<br />
■ Search functionality<br />
■ Pagination<br />
- CRUD operations:<br />
■ Add new Department form<br />
■ Edit Department details<br />
- Data validation<br />
- Loading states and error handling<br />
