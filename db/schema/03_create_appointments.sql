-- schema/02_create_appointments.sql
DROP TABLE IF EXISTS appointments CASCADE;

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  phoneNumber VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  location_id integer REFERENCES locations(id) ON DELETE CASCADE NOT NULL,
  appointment_date DATE,
  appointment_time TIME
);