DROP TABLE IF EXISTS locations CASCADE;
-- CREATE locations
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  addres VARCHAR(255) NOT NULL,
  phone_number integer NOT NULL
);