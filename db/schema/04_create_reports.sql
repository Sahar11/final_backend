DROP TABLE IF EXISTS reports CASCADE;

CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  patient_id integer REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  patient_name VARCHAR(255) NOT NULL,
  patient_healthcard VARCHAR(255) NOT NULL,
  report VARCHAR(255) NOT NULL,
  test_type VARCHAR(255) NOT NULL,
  date DATE
);