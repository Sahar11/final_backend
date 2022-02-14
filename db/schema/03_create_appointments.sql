-- schema/02_create_appointments.sql
DROP TABLE IF EXISTS appointments CASCADE;

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  patient_id integer REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  location_id integer REFERENCES locations(id) ON DELETE CASCADE NOT NULL,
  appointment_date DATE,
  appointment_time TIME
);