CREATE TABLE IF NOT EXISTS USERS(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) not null, 
    email varchar(255) not null, 
    password varchar(255) not null, 
    slot_timings varchar(255),
    city varchar(100) not null,
    booked_date varchar(255),
    centre_name varchar(255),
    booked_city varchar(255)

);


CREATE TABLE IF NOT EXISTS CENTRES(
    id INT PRIMARY KEY AUTO_INCREMENT,
    centre_name varchar(255) not null,
    city varchar(255) not null,
    slots int not null 
);