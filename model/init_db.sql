--
-- Drop Tables and create new ones
--

SET foreign_key_checks = 0;
DROP TABLE if exists profiles;
DROP TABLE if exists users;
DROP TABLE if exists meals;
DROP TABLE if exists ingredients;
SET foreign_key_checks = 1;

--
-- Create Table profiles
--
CREATE TABLE profiles(
    profile_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    nutrient_1 VARCHAR(50) not null, 
    nutrient_2 VARCHAR(50) not null, 
    nutrient_3 VARCHAR(50) not null, 
    medical_condition VARCHAR(50) not null,
    date_of_birth date not null, 
    gender VARCHAR(20) not null,
    `weight` INT not null,
    height INT not null
    );


--
-- Create Table users
--

CREATE TABLE users(
    user_id INT not null AUTO_INCREMENT PRIMARY KEY,
    profile_id INT,
    username VARCHAR(50) not null,
    email VARCHAR(50) not null,
    `password` VARCHAR(50) not null
);

ALTER TABLE users
ADD CONSTRAINT fk_profile
FOREIGN KEY (profile_id) REFERENCES profiles(profile_id);

--
-- Create Table meals
--

CREATE TABLE meals (
    meal_id INT not null AUTO_INCREMENT PRIMARY KEY,
    profile_id INT,
    `day` date not null
);

ALTER TABLE meals
ADD CONSTRAINT fk_profile_meal
FOREIGN KEY (profile_id) REFERENCES profiles(profile_id);


--
-- Create Table ingredients
--

CREATE TABLE ingredients (
    ingredient_id INT not null AUTO_INCREMENT PRIMARY KEY,
    meal_id INT,
    `name` VARCHAR(50) not null,
    number_amount INT not null,
    nutrient_1 INT,
    nutrient_2 INT,
    nutrient_3 INT
);

ALTER TABLE ingredients
ADD CONSTRAINT fk_meal
FOREIGN KEY (meal_id) REFERENCES meals(meal_id) ON DELETE CASCADE; 
 -- See if we need decimals and if so, how to get that (string ?)
--  CREATE NUTRIENTS TABLE 