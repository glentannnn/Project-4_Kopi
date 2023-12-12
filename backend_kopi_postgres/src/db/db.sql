CREATE DATABASE kopi;

-- set extension
CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(200) NOT NULL,
    user_email VARCHAR(200) NOT NULL,
    user_password VARCHAR(200) NOT NULL
);

-- insert users to test
INSERT INTO users (
    user_name, user_email, user_password
) VALUES ('Glen', 'glen.tanyonghao@gmail.com', 'chicken');