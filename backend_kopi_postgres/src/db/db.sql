CREATE DATABASE kopi;

CREATE EXTENSION if not exists "uuid-ossp";

-- Create users Table, set extension
CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(200) NOT NULL,
    user_email VARCHAR(200) NOT NULL,
    user_password VARCHAR(200) NOT NULL,
    user_role VARCHAR(200) NOT NULL
);

-- Create beans Table
CREATE TABLE beans (
    beans_id 
    beans_country
    beans_region
    beans_type
    beans_taste
beans_roastdate
beans
)