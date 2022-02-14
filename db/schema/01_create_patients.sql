-- schema/01_create_users.sql
DROP TABLE IF EXISTS patients CASCADE;
-- CREATE USERS
CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  healthcard VARCHAR(255) NOT NULL,
  dob VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  pwd VARCHAR(255)
);