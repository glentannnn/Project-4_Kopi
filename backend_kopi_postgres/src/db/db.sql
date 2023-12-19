CREATE DATABASE kopi;

CREATE EXTENSION if not exists "uuid-ossp";

-- Create "users" table, set extension.
CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(200) NOT NULL,
    user_email VARCHAR(200) NOT NULL,
    user_password VARCHAR(200) NOT NULL,
    user_role VARCHAR(200) NOT NULL -- Add DEFAULT 'USER'
    FOREIGN KEY (user_role) REFERENCES roles(role)
);

-- Create NEW "users" table, changed the "user_id" to SERIAL. Also added DEFAULT for "user_role" here.
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(200) NOT NULL,
    user_email VARCHAR(200) NOT NULL,
    user_password VARCHAR(200) NOT NULL,
    user_role VARCHAR(200) NOT NULL DEFAULT 'USER',
    FOREIGN KEY (user_role) REFERENCES roles(role)
);

-- Create "roles" table.
CREATE TABLE roles (
    role VARCHAR(200) PRIMARY KEY DEFAULT 'user' -- Change 'user' to 'USER'
);

-- Create NEW "roles" table. 
CREATE TABLE roles (
    role VARCHAR(200) PRIMARY KEY DEFAULT 'USER' 
);

-- Insert values into "roles" table.
INSERT INTO roles (role) VALUES ('ADMIN');
INSERT INTO roles (role) VALUES ('USER');




-- Create "beans" table
CREATE TABLE beans (
    bean_id SERIAL PRIMARY KEY,
    bean_country VARCHAR(100) NOT NULL,
    -- FOREIGN KEY (beans_country) REFERENCES countries(code)
    bean_region VARCHAR(200) NOT NULL,
    bean_type VARCHAR(200) NOT NULL,
    FOREIGN KEY (bean_type) REFERENCES beansType(bean_type),
    bean_taste VARCHAR(200) NOT NULL,
    bean_roastdate DATE NOT NULL,
    bean_prevgrindsize DECIMAL NOT NULL CHECK(bean_prevgrindsize >= 0 and bean_prevgrindsize <= 10),
    bean_remarks VARCHAR(200) NOT NULL
);

-- Create NEW "beans" table.
CREATE TABLE beans (
    bean_id SERIAL PRIMARY KEY,
    bean_country VARCHAR(100) NOT NULL,
    bean_region VARCHAR(200) NOT NULL,
    bean_type VARCHAR(200) NOT NULL,
    FOREIGN KEY (bean_type) REFERENCES beansType(bean_type),
    bean_taste VARCHAR(200) NOT NULL,
    bean_roastdate DATE NOT NULL,
    bean_prevgrindsize DECIMAL NOT NULL CHECK(bean_prevgrindsize >= 0 and bean_prevgrindsize <= 10),
    bean_remarks VARCHAR(200) NOT NULL,
    user_id INT NOT NULL
);

-- Create "beansType" constraint table
CREATE TABLE beansType (
    bean_type VARCHAR(200) PRIMARY KEY
);

-- Insert default values into "beansType" constraint table
INSERT INTO beansType (bean_type) VALUES ('ESPRESSO');
INSERT INTO beansType (bean_type) VALUES ('FILTER');

-- CREATE TABLE countries (
--     code VARCHAR(2) PRIMARY KEY,
--     name VARCHAR(100) NOT NULL UNIQUE
-- )





-- Create "equipment" table
CREATE TABLE equipment (
    equipment_id SERIAL PRIMARY KEY,
    equipment_type VARCHAR(200) NOT NULL,
    FOREIGN KEY (equipment_type) REFERENCES equipmentType(equipment_type),
    equipment_model VARCHAR(200) NOT NULL,
    equipment_modification VARCHAR(200) 
);

-- Create NEW "equipment" table
CREATE TABLE equipment (
    equipment_id SERIAL PRIMARY KEY,
    equipment_type VARCHAR(200) NOT NULL,
    FOREIGN KEY (equipment_type) REFERENCES equipmentType(equipment_type),
    equipment_model VARCHAR(200) NOT NULL,
    equipment_modification VARCHAR(200),
    user_id INT NOT NULL
);

-- Create "equipmentType" constraint table
CREATE TABLE equipmentType (
    equipment_type VARCHAR(200) PRIMARY KEY
);

-- Insert default values into "equipmentType" constraint table. All capital and no space for PRI KEY
INSERT INTO equipmentType (equipment_type) VALUES ('GRINDER');
INSERT INTO equipmentType (equipment_type) VALUES ('ESPRESSOMACHINE');
INSERT INTO equipmentType (equipment_type) VALUES ('V60');

-- Create "users equipment" table


-- composite primary keys. USE this for creating the surrogate tables. Below is an example.
-- CREATE TABLE equipment (
--     equipment_id SERIAL ,
--     FOREIGN KEY (equipment_type) REFERENCES equipmentType(equipment_type),
--     equipment_type VARCHAR(200) NOT NULL,
--     FOREIGN KEY (equipment_type) REFERENCES equipmentType(equipment_type),
--     equipment_model VARCHAR(200) NOT NULL,
--     equipment_modification VARCHAR(200) 
-- ) PRIMARY KEY (col_1,col_2); 