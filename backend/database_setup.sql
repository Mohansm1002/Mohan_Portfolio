-- Neon PostgreSQL database setup
-- The Neon database is already provisioned as "neondb".
-- Spring Boot creates and updates the tables automatically through JPA.
-- Connect with the Neon connection details in:
-- backend/src/main/resources/application.properties

SELECT current_database();

-- First admin account seeded by backend/src/main/resources/application.properties:
-- username: admin
-- password: admin123
