# Project 4: Kopi App
This App is part of a deliverable for General Assembly's Software Engineering Immersive (SEI) course, and it is my Capstone project. 

As a home barista, it is essential to track some parameters, such as grind sizes for beans, as it is dynamic and changes with time. With that in mind, I created this App, which serves as an electronic diary for baristas to track the beans they are currently using and have used before. 
The App also allows users to input their equipment as users may have multiple different equipment they use. 

## Requirements for Project
- Full-stack App
- At least 10 CRUD functions
- Login and Registration
- Admin and User roles
  
## Technologies Used
PERN Stack: 
- PostgreSQL
- Express
- React
- Node

Other Technologies:
- JavaScript
- HTML
- CSS
- Bootstrap
- Figma
  
## Planning for the App
### Database Design
<img src="/Frontend_Kopi/public/Database_Design.jpg" alt="Database Design" height="300">

### Initial Design via Figma
<a href="https://www.figma.com/file/NGWQXGicBRo8j0bwJX1dWy/Kopi-App?type=design&node-id=0%3A1&mode=design&t=fAdcpgVrIo1VbOvR-1">Figma</a>

## How to Use
### Env Variables Needed
On Frontend_Kopi:
- VITE_SERVER

On backend_kopi_postgres:
- PORT
- ACCESS_SECRET
- REFRESH_SECRET
- PSUSER
- PGPASSWORD

### SQL Create Statements
CREATE DATABASE kopi;

#### Create "users" Table:
CREATE TABLE roles (
    role VARCHAR(200) PRIMARY KEY DEFAULT 'USER' 
);

INSERT INTO roles (role) VALUES ('ADMIN');
INSERT INTO roles (role) VALUES ('USER');

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(200) NOT NULL,
    user_email VARCHAR(200) NOT NULL,
    user_password VARCHAR(200) NOT NULL,
    user_role VARCHAR(200) NOT NULL DEFAULT 'USER',
    FOREIGN KEY (user_role) REFERENCES roles(role)
);

#### Create "beans" Table:
CREATE TABLE beansType (
    bean_type VARCHAR(200) PRIMARY KEY
);

INSERT INTO beansType (bean_type) VALUES ('ESPRESSO');
INSERT INTO beansType (bean_type) VALUES ('FILTER');

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

#### Create "equipment" Table:
CREATE TABLE equipmentType (
    equipment_type VARCHAR(200) PRIMARY KEY
);

INSERT INTO equipmentType (equipment_type) VALUES ('GRINDER');
INSERT INTO equipmentType (equipment_type) VALUES ('ESPRESSOMACHINE');
INSERT INTO equipmentType (equipment_type) VALUES ('V60');
INSERT INTO equipmentType (equipment_type) VALUES ('TIMER');
INSERT INTO equipmentType (equipment_type) VALUES ('TAMPER');
INSERT INTO equipmentType (equipment_type) VALUES ('LEVELLER');
INSERT INTO equipmentType (equipment_type) VALUES ('WDTTOOL');
INSERT INTO equipmentType (equipment_type) VALUES ('FRENCHPRESS');

CREATE TABLE equipment (
    equipment_id SERIAL PRIMARY KEY,
    equipment_type VARCHAR(200) NOT NULL,
    FOREIGN KEY (equipment_type) REFERENCES equipmentType(equipment_type),
    equipment_model VARCHAR(200) NOT NULL,
    equipment_modification VARCHAR(200),
    user_id INT NOT NULL
);

## App Enhancement Roadmap
Further development are planned for the App and are listed below: 
- Include a section to mark beans as "done" when users have finished using a certain bean. This should also update the DB accordingly.
- Include proper alerts when users have input certain field incorrectly. This is to improve the user's overall experience.
- Turn this App into a social media App for users to interact with each other, and discuss certain beans and equipment they are currently using. They may also use this App to create communities for discussion on making coffee in general. 


## Screenshots
<img src="/Screenshots/screenshot-1.png" alt="Login" height="300">
<img src="/Screenshots/screenshot-2.png" alt="Registration" height="300">
<img src="/Screenshots/screenshot-3.png" alt="Equipment Page" height="300">
<img src="/Screenshots/screenshot-4.png" alt="Adding Equipment" height="300">
<img src="/Screenshots/screenshot-5.png" alt="Updating Equipment" height="300">
<img src="/Screenshots/screenshot-6.png" alt="Beans Page" height="300">
<img src="/Screenshots/screenshot-7.png" alt="Users Page" height="300">
The below screenshot shows the page when a user with a "User" role enters the App. The Users page page is only shown if user has an "Admin" role. 
<img src="/Screenshots/screenshot-8.png" alt="Users Page Only Available for Admins" height="300">

