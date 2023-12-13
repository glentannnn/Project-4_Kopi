CREATE DATABASE kopi;

CREATE EXTENSION if not exists "uuid-ossp";

-- Create "users" table, set extension.
CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(200) NOT NULL,
    user_email VARCHAR(200) NOT NULL,
    user_password VARCHAR(200) NOT NULL,
    user_role VARCHAR(200) NOT NULL,
    FOREIGN KEY (user_role) REFERENCES roles(role)
);

-- Create "roles" table.
CREATE TABLE roles (
    role VARCHAR(200) PRIMARY KEY DEFAULT 'user' 
);

-- Insert values into "roles" table.
INSERT INTO roles (role) VALUES ('admin');
INSERT INTO roles (role) VALUES ('user');

-- Create "beans" table
CREATE TABLE beans (
    beans_id SERIAL PRIMARY KEY,
    beans_country VARCHAR(100) NOT NULL,
    -- FOREIGN KEY (beans_country) REFERENCES countries(code)
    beans_region VARCHAR(200) NOT NULL,
    beans_type VARCHAR(200) NOT NULL,
    FOREIGN KEY (beans_type) REFERENCES beansType(beans_type),
    beans_taste VARCHAR(200) NOT NULL,
    beans_roastdate DATE NOT NULL,
    beans_prevgrindsize DECIMAL NOT NULL,
    beans_remarks VARCHAR(200) NOT NULL
);

CREATE TABLE beansType (
    beans_type VARCHAR(200) PRIMARY KEY
);


INSERT INTO beansType (beans_type) VALUES ('espresso');
INSERT INTO beansType (beans_type) VALUES ('filter');

-- CREATE TABLE countries (
--     code VARCHAR(2) PRIMARY KEY,
--     name VARCHAR(100) NOT NULL UNIQUE
-- )

CREATE TABLE equipment (
    equipment_id SERIAL PRIMARY KEY,
    equipment_type VARCHAR(200) NOT NULL,
    FOREIGN KEY (equipment_type) REFERENCES equipmentType(equipment_type),
    equipment_model VARCHAR(200) NOT NULL,
    equipment_modification VARCHAR(200) NOT NULL
);

CREATE TABLE equipmentType (
    equipment_type VARCHAR(200) PRIMARY KEY
);

INSERT INTO equipmentType (equipment_type) VALUES ('grinder');
INSERT INTO equipmentType (equipment_type) VALUES ('espresso machine');
INSERT INTO equipmentType (equipment_type) VALUES ('v60');