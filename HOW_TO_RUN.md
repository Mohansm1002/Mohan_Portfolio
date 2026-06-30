# How to Run This Portfolio Project

## 1. Requirements

Install these first:

- Java 17 or newer
- Maven
- Node.js and npm
- Neon PostgreSQL database

## 2. Set Up the Database

The backend is configured to use a Neon PostgreSQL database.

Database name:

```text
neondb
```

Connection settings are in:

```text
backend/src/main/resources/application.properties
```

Current database settings:

```properties
spring.datasource.url=jdbc:postgresql://ep-misty-bread-att5tuu9.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require
spring.datasource.username=neondb_owner
```

Spring Boot creates and updates the tables automatically through JPA when the backend starts.

## 3. Run the Backend

Open a terminal in the project root, then run:

```powershell
cd backend
mvn spring-boot:run
```

The backend runs here:

```text
http://localhost:8080
```

The backend automatically creates the tables and seeds default data.

Default admin login:

```text
Username: admin
Password: admin123
```

## 4. Run the Frontend

Open a second terminal in the project root, then run:

```powershell
cd frontend
npm install
npm run dev
```

On Windows PowerShell, if `npm` is blocked by execution policy, use:

```powershell
npm.cmd install
npm.cmd run dev
```

The frontend runs here:

```text
http://localhost:5173
```

Admin dashboard:

```text
http://localhost:5173/admin/login
```

## 5. Build for Production

From the `frontend` folder:

```powershell
npm.cmd run build
```

The production files will be created in:

```text
frontend/dist
```

## 6. Common Fixes

If the backend cannot connect to Neon, check the Neon URL, username, password, and internet connection in `backend/src/main/resources/application.properties`.

If the frontend cannot load backend data, confirm the backend is running at `http://localhost:8080`.

If Vite starts on a different port, use the URL shown in the terminal.
