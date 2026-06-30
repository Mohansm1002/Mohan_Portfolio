# How to Run This Portfolio Project

## 1. Requirements

Install these first:

- Java 17 or newer
- Maven
- Node.js and npm
- MySQL Server

## 2. Set Up the Database

1. Start MySQL Server.
2. Open MySQL Workbench, phpMyAdmin, or a MySQL terminal.
3. Run this file:

```sql
backend/database_setup.sql
```

The project uses this database name:

```text
portfolio_mo
```

If your MySQL username or password is different, update this file:

```text
backend/src/main/resources/application.properties
```

Default database settings:

```properties
spring.datasource.username=root
spring.datasource.password=password
```

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

If the backend cannot connect to MySQL, check the username and password in `backend/src/main/resources/application.properties`.

If the frontend cannot load backend data, confirm the backend is running at `http://localhost:8080`.

If Vite starts on a different port, use the URL shown in the terminal.
