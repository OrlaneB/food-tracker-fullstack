--
-- Drop Tables 
--

SET foreign_key_checks = 0;
DROP TABLE if exists profiles;
DROP TABLE if exists users;
DROP TABLE if exists meals;
DROP TABLE if exists ingredients;
DROP TABLE if exists nutrients_by_meal;
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
    `date` date not null
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
    number_amount INT not null
);

ALTER TABLE ingredients
ADD CONSTRAINT fk_meal
FOREIGN KEY (meal_id) REFERENCES meals(meal_id) ON DELETE CASCADE; 

--
--  CREATE NUTRIENTS TABLE 
--

CREATE TABLE nutrients_by_meal (
    nutrient_id INT not null AUTO_INCREMENT PRIMARY KEY,
    meal_id INT,
    `name` VARCHAR(50) not null,
    number_amount INT not null
);

ALTER TABLE nutrients_by_meal
ADD CONSTRAINT fk_meal
FOREIGN KEY (meal_id) REFERENCES meals(meal_id) ON DELETE CASCADE; 

--
-- Insert Data into profiles
--

INSERT INTO profiles (nutrient_1, nutrient_2, nutrient_3, medical_condition, date_of_birth, gender, weight, height) VALUES
('Energy (kcal)', 'Protein', 'Calcium, Ca', 'Osteoporosis', '1985-03-25', 'Female', 65, 160),
('Carbohydrate, by difference', 'Iron, Fe', 'Vitamin C, total ascorbic acid', 'Anemia', '1990-07-19', 'Male', 80, 175),
('Total lipid (fat)', 'Vitamin A, RAE', 'Zinc, Zn', 'Heart Disease', '1978-11-12', 'Male', 90, 180),
('Fiber, total dietary', 'Potassium, K', 'Magnesium, Mg', 'High Blood Pressure', '1995-05-14', 'Female', 55, 165);

--
-- Insert Data into users
--

INSERT INTO users (profile_id, username, email, password) VALUES
(1, 'user1', 'user1@example.com', 'password1'),
(2, 'user2', 'user2@example.com', 'password2'),
(3, 'user3', 'user3@example.com', 'password3'),
(4, 'user4', 'user4@example.com', 'password4');

--
-- Insert Data into meals
--

INSERT INTO meals (profile_id, date) VALUES
-- User 1
(1, '2024-08-01'), (1, '2024-08-01'), (1, '2024-08-01'),
(1, '2024-08-02'), (1, '2024-08-02'), (1, '2024-08-02'),
(1, '2024-08-03'), (1, '2024-08-03'), (1, '2024-08-03'),

-- User 2
(2, '2024-08-01'), (2, '2024-08-01'), (2, '2024-08-01'),
(2, '2024-08-02'), (2, '2024-08-02'), (2, '2024-08-02'),
(2, '2024-08-03'), (2, '2024-08-03'), (2, '2024-08-03'),

-- User 3
(3, '2024-08-01'), (3, '2024-08-01'), (3, '2024-08-01'),
(3, '2024-08-02'), (3, '2024-08-02'), (3, '2024-08-02'),
(3, '2024-08-03'), (3, '2024-08-03'), (3, '2024-08-03'),

-- User 4
(4, '2024-08-01'), (4, '2024-08-01'), (4, '2024-08-01'),
(4, '2024-08-02'), (4, '2024-08-02'), (4, '2024-08-02'),
(4, '2024-08-03'), (4, '2024-08-03'), (4, '2024-08-03'),

--
-- Insert Data into ingredients
--

INSERT INTO ingredients (meal_id, name, number_amount) VALUES
-- User 1 (Meals 1-9)
(1, 'Chicken Breast', 200), (1, 'Brown Rice', 100), (1, 'Broccoli', 50),
(2, 'Oatmeal', 150), (2, 'Banana', 120), (2, 'Almond Butter', 20),
(3, 'Salmon', 180), (3, 'Quinoa', 90), (3, 'Spinach', 60),
(4, 'Turkey Breast', 150), (4, 'Sweet Potato', 200), (4, 'Green Beans', 70),
(5, 'Greek Yogurt', 100), (5, 'Honey', 10), (5, 'Mixed Berries', 50),
(6, 'Eggs', 140), (6, 'Avocado', 100), (6, 'Whole Wheat Toast', 60),
(7, 'Lean Beef', 160), (7, 'Mashed Potatoes', 200), (7, 'Carrots', 80),
(8, 'Cottage Cheese', 120), (8, 'Pineapple', 80), (8, 'Walnuts', 30),
(9, 'Tuna', 180), (9, 'Whole Wheat Pasta', 100), (9, 'Tomato Sauce', 70),

-- User 2 (Meals 10-18)
(10, 'Tofu', 150), (10, 'Brown Rice', 90), (10, 'Broccoli', 50),
(11, 'Pancakes', 200), (11, 'Maple Syrup', 50), (11, 'Bacon', 60),
(12, 'Grilled Chicken', 170), (12, 'Couscous', 100), (12, 'Asparagus', 80),
(13, 'Turkey Sandwich', 150), (13, 'Lettuce', 20), (13, 'Tomato', 30),
(14, 'Protein Shake', 200), (14, 'Peanut Butter', 30), (14, 'Apple', 100),
(15, 'Beef Stir Fry', 160), (15, 'Bell Peppers', 70), (15, 'Rice Noodles', 150),
(16, 'Eggs', 120), (16, 'Avocado', 90), (16, 'Sourdough Bread', 60),
(17, 'Salmon', 180), (17, 'Lentils', 100), (17, 'Brussels Sprouts', 70),
(18, 'Greek Yogurt', 100), (18, 'Granola', 50), (18, 'Blueberries', 40),

-- User 3 (Meals 19-27)
(19, 'Pork Chop', 180), (19, 'Mashed Potatoes', 150), (19, 'Green Beans', 60),
(20, 'Omelette', 120), (20, 'Cheddar Cheese', 40), (20, 'Mushrooms', 30),
(21, 'Beef Tacos', 160), (21, 'Taco Shells', 80), (21, 'Salsa', 50),
(22, 'Chicken Salad', 150), (22, 'Lettuce', 50), (22, 'Avocado', 60),
(23, 'Protein Bar', 200), (23, 'Almonds', 30), (23, 'Banana', 100),
(24, 'Shrimp', 140), (24, 'Quinoa', 100), (24, 'Zucchini', 50),
(25, 'Steak', 190), (25, 'Baked Potato', 200), (25, 'Broccoli', 60),
(26, 'Cottage Cheese', 120), (26, 'Mango', 80), (26, 'Chia Seeds', 20),
(27, 'Turkey Chili', 180), (27, 'Kidney Beans', 100), (27, 'Cornbread', 150),

-- User 4 (Meals 28-36)
(28, 'Vegetable Stir Fry', 150), (28, 'Brown Rice', 100), (28, 'Tofu', 90),
(29, 'Smoothie', 180), (29, 'Spinach', 50), (29, 'Protein Powder', 30),
(30, 'Chicken Wrap', 150), (30, 'Whole Wheat Tortilla', 100), (30, 'Bell Peppers', 50),
(31, 'Salmon', 170), (31, 'Wild Rice', 90), (31, 'Asparagus', 80),
(32, 'Oatmeal', 150), (32, 'Chia Seeds', 20), (32, 'Berries', 50),
(33, 'Quinoa Salad', 160), (33, 'Tomato', 50), (33, 'Cucumber', 40),
(34, 'Pasta', 180), (34, 'Marinara Sauce', 70), (34, 'Parmesan Cheese', 30),
(35, 'Grilled Chicken', 170), (35, 'Sweet Potato', 200), (35, 'Brussels Sprouts', 70),
(36, 'Greek Yogurt', 100), (36, 'Honey', 10), (36, 'Granola', 50);

--
-- Insert Data into nutrients_by_meal
--

INSERT INTO nutrients_by_meal (meal_id, name, number_amount) VALUES
-- User 1 (profile_id 1: Tracking Energy, Protein, Calcium)
(1, 'Energy (kcal)', 450), (1, 'Protein', 35), (1, 'Calcium, Ca', 120),
(2, 'Energy (kcal)', 520), (2, 'Protein', 40), (2, 'Calcium, Ca', 150),
(3, 'Energy (kcal)', 300), (3, 'Protein', 20), (3, 'Calcium, Ca', 100),
(4, 'Energy (kcal)', 480), (4, 'Protein', 30), (4, 'Calcium, Ca', 130),
(5, 'Energy (kcal)', 510), (5, 'Protein', 38), (5, 'Calcium, Ca', 140),
(6, 'Energy (kcal)', 350), (6, 'Protein', 25), (6, 'Calcium, Ca', 110),
(7, 'Energy (kcal)', 470), (7, 'Protein', 32), (7, 'Calcium, Ca', 135),
(8, 'Energy (kcal)', 500), (8, 'Protein', 37), (8, 'Calcium, Ca', 145),
(9, 'Energy (kcal)', 320), (9, 'Protein', 22), (9, 'Calcium, Ca', 115),

-- User 2 (profile_id 2: Tracking Carbohydrate, Iron, Vitamin C)
(10, 'Carbohydrate, by difference', 60), (10, 'Iron, Fe', 7), (10, 'Vitamin C, total ascorbic acid', 65),
(11, 'Carbohydrate, by difference', 75), (11, 'Iron, Fe', 9), (11, 'Vitamin C, total ascorbic acid', 80),
(12, 'Carbohydrate, by difference', 50), (12, 'Iron, Fe', 6), (12, 'Vitamin C, total ascorbic acid', 60),
(13, 'Carbohydrate, by difference', 70), (13, 'Iron, Fe', 8), (13, 'Vitamin C, total ascorbic acid', 75),
(14, 'Carbohydrate, by difference', 80), (14, 'Iron, Fe', 10), (14, 'Vitamin C, total ascorbic acid', 85),
(15, 'Carbohydrate, by difference', 55), (15, 'Iron, Fe', 7), (15, 'Vitamin C, total ascorbic acid', 70),
(16, 'Carbohydrate, by difference', 65), (16, 'Iron, Fe', 8), (16, 'Vitamin C, total ascorbic acid', 72),
(17, 'Carbohydrate, by difference', 78), (17, 'Iron, Fe', 9), (17, 'Vitamin C, total ascorbic acid', 82),
(18, 'Carbohydrate, by difference', 58), (18, 'Iron, Fe', 6), (18, 'Vitamin C, total ascorbic acid', 68),

-- User 3 (profile_id 3: Tracking Total lipid, Vitamin A, Zinc)
(19, 'Total lipid (fat)', 25), (19, 'Vitamin A, RAE', 600), (19, 'Zinc, Zn', 8),
(20, 'Total lipid (fat)', 28), (20, 'Vitamin A, RAE', 650), (20, 'Zinc, Zn', 9),
(21, 'Total lipid (fat)', 20), (21, 'Vitamin A, RAE', 500), (21, 'Zinc, Zn', 7),
(22, 'Total lipid (fat)', 27), (22, 'Vitamin A, RAE', 620), (22, 'Zinc, Zn', 8.5),
(23, 'Total lipid (fat)', 30), (23, 'Vitamin A, RAE', 700), (23, 'Zinc, Zn', 10),
(24, 'Total lipid (fat)', 22), (24, 'Vitamin A, RAE', 540), (24, 'Zinc, Zn', 7.5),
(25, 'Total lipid (fat)', 26), (25, 'Vitamin A, RAE', 610), (25, 'Zinc, Zn', 8.2),
(26, 'Total lipid (fat)', 29), (26, 'Vitamin A, RAE', 680), (26, 'Zinc, Zn', 9.3),
(27, 'Total lipid (fat)', 21), (27, 'Vitamin A, RAE', 530), (27, 'Zinc, Zn', 7.1),

-- User 4 (profile_id 4: Tracking Fiber, Potassium, Magnesium)
(28, 'Fiber, total dietary', 10), (28, 'Potassium, K', 900), (28, 'Magnesium, Mg', 110),
(29, 'Fiber, total dietary', 12), (29, 'Potassium, K', 950), (29, 'Magnesium, Mg', 120),
(30, 'Fiber, total dietary', 8), (30, 'Potassium, K', 850), (30, 'Magnesium, Mg', 100),
(31, 'Fiber, total dietary', 11), (31, 'Potassium, K', 920), (31, 'Magnesium, Mg', 115),
(32, 'Fiber, total dietary', 13), (32, 'Potassium, K', 980), (32, 'Magnesium, Mg', 125),
(33, 'Fiber, total dietary', 9), (33, 'Potassium, K', 870), (33, 'Magnesium, Mg', 105),
(34, 'Fiber, total dietary', 11), (34, 'Potassium, K', 940), (34, 'Magnesium, Mg', 118),
(35, 'Fiber, total dietary', 14), (35, 'Potassium, K', 1000), (35, 'Magnesium, Mg', 130),
(36, 'Fiber, total dietary', 10), (36, 'Potassium, K', 890), (36, 'Magnesium, Mg', 108);



