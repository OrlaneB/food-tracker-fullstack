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
-- Create Table users
--
CREATE TABLE users(
    user_id INT not null AUTO_INCREMENT PRIMARY KEY,
    profile_id INT,
    username VARCHAR(50) not null,
    email VARCHAR(50) not null,
    `password` VARCHAR(255) not null
);

--
-- Create Table profiles
--
CREATE TABLE profiles(
    profile_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    nutrient_1 VARCHAR(50),
    nutrient_2 VARCHAR(50),
    nutrient_3 VARCHAR(50),
    medical_condition VARCHAR(50),
    date_of_birth date,
    gender VARCHAR(20),
    `weight` INT,
    height INT
    );

ALTER TABLE profiles
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;

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
ADD CONSTRAINT fk_meal_i
FOREIGN KEY (meal_id) REFERENCES meals(meal_id) ON DELETE CASCADE;
--
--  CREATE NUTRIENTS TABLE 
--
CREATE TABLE nutrients_by_meal (
    nutrient_id INT not null AUTO_INCREMENT PRIMARY KEY,
    meal_id INT,
    `nutrient_name` VARCHAR(50) not null,
    nutrient_number_amount INT not null
);
ALTER TABLE nutrients_by_meal
ADD CONSTRAINT fk_meal_n
FOREIGN KEY (meal_id) REFERENCES meals(meal_id) ON DELETE CASCADE;

--
-- Insert Data into users
--
INSERT INTO users (profile_id, username, email, password) VALUES
(1, 'user1', 'user1@example.com', '$2b$10$RYB/mnDI2elkvRV0oPDmMetmzMFXz8t/W6I6XiQA8kVWaCne.hHkC'),
(2, 'user2', 'user2@example.com', '$2b$10$RYB/mnDI2elkvRV0oPDmMetmzMFXz8t/W6I6XiQA8kVWaCne.hHkC'),
(3, 'user3', 'user3@example.com', '$2b$10$RYB/mnDI2elkvRV0oPDmMetmzMFXz8t/W6I6XiQA8kVWaCne.hHkC'),
(4, 'user4', 'user4@example.com', '$2b$10$RYB/mnDI2elkvRV0oPDmMetmzMFXz8t/W6I6XiQA8kVWaCne.hHkC');

--
-- Insert Data into profiles
--
INSERT INTO profiles (user_id, nutrient_1, nutrient_2, nutrient_3, medical_condition, date_of_birth, gender, weight, height) VALUES
(1,'Energy (kcal)', 'Protein', 'Calcium, Ca', 'Osteoporosis', '1985-03-25', 'Female', 65, 160),
(2,'Carbohydrate, by difference', 'Iron, Fe', 'Vitamin C, total ascorbic acid', 'Anemia', '1990-07-19', 'Male', 80, 175),
(3,'Total lipid (fat)', 'Vitamin A, RAE', 'Zinc, Zn', 'Heart Disease', '1978-11-12', 'Male', 90, 180),
(4,'Fiber, total dietary', 'Potassium, K', 'Magnesium, Mg', 'High Blood Pressure', '1995-05-14', 'Female', 55, 165);

--
-- Insert Data into meals
--
INSERT INTO meals (profile_id, date) VALUES
(1, '2024-08-01'), (1, '2024-08-01'), (1, '2024-08-01'),
(1, '2024-08-02'), (1, '2024-08-02'), (1, '2024-08-02'),
(1, '2024-08-03'), (1, '2024-08-03'), (1, '2024-08-03'),
(2, '2024-08-01'), (2, '2024-08-01'), (2, '2024-08-01'),
(2, '2024-08-02'), (2, '2024-08-02'), (2, '2024-08-02'),
(2, '2024-08-03'), (2, '2024-08-03'), (2, '2024-08-03'),
(3, '2024-08-01'), (3, '2024-08-01'), (3, '2024-08-01'),
(3, '2024-08-02'), (3, '2024-08-02'), (3, '2024-08-02'),
(3, '2024-08-03'), (3, '2024-08-03'), (3, '2024-08-03'),
(4, '2024-08-01'), (4, '2024-08-01'), (4, '2024-08-01'),
(4, '2024-08-02'), (4, '2024-08-02'), (4, '2024-08-02'),
(4, '2024-08-03'), (4, '2024-08-03'), (4, '2024-08-03');

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
INSERT INTO nutrients_by_meal (meal_id, nutrient_name, nutrient_number_amount) VALUES
-- Meal 1
(1, 'Energy (kcal)', 450), (1, 'Protein', 35), (1, 'Carbohydrate, by difference', 60), (1, 'Total lipid (fat)', 20), 
(1, 'Fiber, total dietary', 10), (1, 'Sugars, total including NLEA', 15), (1, 'Calcium, Ca', 120), (1, 'Iron, Fe', 8), 
(1, 'Potassium, K', 900), (1, 'Sodium, Na', 400), (1, 'Vitamin A, RAE', 600), (1, 'Vitamin C, total ascorbic acid', 20), 
(1, 'Vitamin D (D2 + D3)', 2), (1, 'Vitamin E (alpha-tocopherol)', 5), (1, 'Vitamin K (phylloquinone)', 40), 
(1, 'Magnesium, Mg', 50), (1, 'Zinc, Zn', 7), (1, 'Cholesterol', 80), (1, 'Folate, DFE', 50), (1, 'Omega-3 Fatty Acids (EPA, DHA)', 0.5),

-- Meal 2
(2, 'Energy (kcal)', 520), (2, 'Protein', 40), (2, 'Carbohydrate, by difference', 70), (2, 'Total lipid (fat)', 25), 
(2, 'Fiber, total dietary', 12), (2, 'Sugars, total including NLEA', 18), (2, 'Calcium, Ca', 150), (2, 'Iron, Fe', 9), 
(2, 'Potassium, K', 950), (2, 'Sodium, Na', 420), (2, 'Vitamin A, RAE', 650), (2, 'Vitamin C, total ascorbic acid', 25), 
(2, 'Vitamin D (D2 + D3)', 3), (2, 'Vitamin E (alpha-tocopherol)', 6), (2, 'Vitamin K (phylloquinone)', 45), 
(2, 'Magnesium, Mg', 55), (2, 'Zinc, Zn', 8), (2, 'Cholesterol', 90), (2, 'Folate, DFE', 60), (2, 'Omega-3 Fatty Acids (EPA, DHA)', 0.6),

-- Meal 3
(3, 'Energy (kcal)', 300), (3, 'Protein', 20), (3, 'Carbohydrate, by difference', 50), (3, 'Total lipid (fat)', 15), 
(3, 'Fiber, total dietary', 8), (3, 'Sugars, total including NLEA', 10), (3, 'Calcium, Ca', 100), (3, 'Iron, Fe', 7), 
(3, 'Potassium, K', 870), (3, 'Sodium, Na', 350), (3, 'Vitamin A, RAE', 500), (3, 'Vitamin C, total ascorbic acid', 18), 
(3, 'Vitamin D (D2 + D3)', 1.5), (3, 'Vitamin E (alpha-tocopherol)', 4), (3, 'Vitamin K (phylloquinone)', 30), 
(3, 'Magnesium, Mg', 45), (3, 'Zinc, Zn', 6), (3, 'Cholesterol', 75), (3, 'Folate, DFE', 55), (3, 'Omega-3 Fatty Acids (EPA, DHA)', 0.4),

-- Meal 4
(4, 'Energy (kcal)', 480), (4, 'Protein', 30), (4, 'Calcium, Ca', 130),
(4, 'Carbohydrate, by difference', 60), (4, 'Iron, Fe', 7), (4, 'Vitamin C, total ascorbic acid', 40),
(4, 'Total lipid (fat)', 22), (4, 'Vitamin A, RAE', 540), (4, 'Zinc, Zn', 8),
(4, 'Fiber, total dietary', 12), (4, 'Potassium, K', 900), (4, 'Magnesium, Mg', 110),
(4, 'Vitamin D (D2 + D3)', 2), (4, 'Vitamin B-12', 1.2), (4, 'Vitamin K (phylloquinone)', 75),
(4, 'Sodium, Na', 550), (4, 'Vitamin B-6', 0.5), (4, 'Folate, total', 130),
(4, 'Cholesterol', 65), (4, 'Sugars, total', 20),

-- Meal 5
(5, 'Energy (kcal)', 510), (5, 'Protein', 38), (5, 'Calcium, Ca', 140),
(5, 'Carbohydrate, by difference', 75), (5, 'Iron, Fe', 6), (5, 'Vitamin C, total ascorbic acid', 30),
(5, 'Total lipid (fat)', 24), (5, 'Vitamin A, RAE', 620), (5, 'Zinc, Zn', 9),
(5, 'Fiber, total dietary', 11), (5, 'Potassium, K', 960), (5, 'Magnesium, Mg', 120),
(5, 'Vitamin D (D2 + D3)', 2.5), (5, 'Vitamin B-12', 1.4), (5, 'Vitamin K (phylloquinone)', 80),
(5, 'Sodium, Na', 620), (5, 'Vitamin B-6', 0.6), (5, 'Folate, total', 140),
(5, 'Cholesterol', 70), (5, 'Sugars, total', 18),

-- Meal 6
(6, 'Energy (kcal)', 350), (6, 'Protein', 25), (6, 'Calcium, Ca', 110),
(6, 'Carbohydrate, by difference', 50), (6, 'Iron, Fe', 5), (6, 'Vitamin C, total ascorbic acid', 28),
(6, 'Total lipid (fat)', 18), (6, 'Vitamin A, RAE', 480), (6, 'Zinc, Zn', 7),
(6, 'Fiber, total dietary', 9), (6, 'Potassium, K', 850), (6, 'Magnesium, Mg', 105),
(6, 'Vitamin D (D2 + D3)', 1.8), (6, 'Vitamin B-12', 1.0), (6, 'Vitamin K (phylloquinone)', 60),
(6, 'Sodium, Na', 450), (6, 'Vitamin B-6', 0.4), (6, 'Folate, total', 120),
(6, 'Cholesterol', 55), (6, 'Sugars, total', 15),

-- Meal 7
(7, 'Energy (kcal)', 470), (7, 'Protein', 32), (7, 'Calcium, Ca', 135),
(7, 'Carbohydrate, by difference', 65), (7, 'Iron, Fe', 6), (7, 'Vitamin C, total ascorbic acid', 35),
(7, 'Total lipid (fat)', 21), (7, 'Vitamin A, RAE', 550), (7, 'Zinc, Zn', 8),
(7, 'Fiber, total dietary', 10), (7, 'Potassium, K', 890), (7, 'Magnesium, Mg', 115),
(7, 'Vitamin D (D2 + D3)', 2), (7, 'Vitamin B-12', 1.3), (7, 'Vitamin K (phylloquinone)', 70),
(7, 'Sodium, Na', 510), (7, 'Vitamin B-6', 0.5), (7, 'Folate, total', 135),
(7, 'Cholesterol', 60), (7, 'Sugars, total', 19),

-- Meal 8
(8, 'Energy (kcal)', 500), (8, 'Protein', 37), (8, 'Calcium, Ca', 145),
(8, 'Carbohydrate, by difference', 70), (8, 'Iron, Fe', 7), (8, 'Vitamin C, total ascorbic acid', 38),
(8, 'Total lipid (fat)', 23), (8, 'Vitamin A, RAE', 600), (8, 'Zinc, Zn', 9),
(8, 'Fiber, total dietary', 11), (8, 'Potassium, K', 920), (8, 'Magnesium, Mg', 120),
(8, 'Vitamin D (D2 + D3)', 2.2), (8, 'Vitamin B-12', 1.5), (8, 'Vitamin K (phylloquinone)', 85),
(8, 'Sodium, Na', 540), (8, 'Vitamin B-6', 0.6), (8, 'Folate, total', 140),
(8, 'Cholesterol', 65), (8, 'Sugars, total', 17),

-- Meal 9
(9, 'Energy (kcal)', 320), (9, 'Protein', 22), (9, 'Calcium, Ca', 115),
(9, 'Carbohydrate, by difference', 45), (9, 'Iron, Fe', 4), (9, 'Vitamin C, total ascorbic acid', 25),
(9, 'Total lipid (fat)', 14), (9, 'Vitamin A, RAE', 420), (9, 'Zinc, Zn', 6),
(9, 'Fiber, total dietary', 8), (9, 'Potassium, K', 770), (9, 'Magnesium, Mg', 95),
(9, 'Vitamin D (D2 + D3)', 1.6), (9, 'Vitamin B-12', 0.9), (9, 'Vitamin K (phylloquinone)', 55),
(9, 'Sodium, Na', 400), (9, 'Vitamin B-6', 0.3), (9, 'Folate, total', 100),
(9, 'Cholesterol', 45), (9, 'Sugars, total', 12),

-- Meal 10
(10, 'Energy (kcal)', 400), (10, 'Protein', 15), (10, 'Calcium, Ca', 130),
(10, 'Carbohydrate, by difference', 60), (10, 'Iron, Fe', 7), (10, 'Vitamin C, total ascorbic acid', 65),
(10, 'Total lipid (fat)', 18), (10, 'Vitamin A, RAE', 500), (10, 'Zinc, Zn', 8),
(10, 'Fiber, total dietary', 12), (10, 'Potassium, K', 850), (10, 'Magnesium, Mg', 100),
(10, 'Vitamin D (D2 + D3)', 2), (10, 'Vitamin B-12', 1.2), (10, 'Vitamin K (phylloquinone)', 70),
(10, 'Sodium, Na', 550), (10, 'Vitamin B-6', 0.5), (10, 'Folate, total', 130),
(10, 'Cholesterol', 65), (10, 'Sugars, total', 20),

-- Meal 11
(11, 'Energy (kcal)', 420), (11, 'Protein', 18), (11, 'Calcium, Ca', 140),
(11, 'Carbohydrate, by difference', 75), (11, 'Iron, Fe', 9), (11, 'Vitamin C, total ascorbic acid', 80),
(11, 'Total lipid (fat)', 20), (11, 'Vitamin A, RAE', 600), (11, 'Zinc, Zn', 9.5),
(11, 'Fiber, total dietary', 13), (11, 'Potassium, K', 950), (11, 'Magnesium, Mg', 120),
(11, 'Vitamin D (D2 + D3)', 2.5), (11, 'Vitamin B-12', 1.5), (11, 'Vitamin K (phylloquinone)', 80),
(11, 'Sodium, Na', 600), (11, 'Vitamin B-6', 0.6), (11, 'Folate, total', 150),
(11, 'Cholesterol', 70), (11, 'Sugars, total', 25),

-- Meal 12
(12, 'Energy (kcal)', 360), (12, 'Protein', 20), (12, 'Calcium, Ca', 125),
(12, 'Carbohydrate, by difference', 55), (12, 'Iron, Fe', 6), (12, 'Vitamin C, total ascorbic acid', 40),
(12, 'Total lipid (fat)', 16), (12, 'Vitamin A, RAE', 450), (12, 'Zinc, Zn', 7.5),
(12, 'Fiber, total dietary', 9), (12, 'Potassium, K', 820), (12, 'Magnesium, Mg', 105),
(12, 'Vitamin D (D2 + D3)', 1.8), (12, 'Vitamin B-12', 1.1), (12, 'Vitamin K (phylloquinone)', 65),
(12, 'Sodium, Na', 470), (12, 'Vitamin B-6', 0.4), (12, 'Folate, total', 120),
(12, 'Cholesterol', 55), (12, 'Sugars, total', 17),

-- Meal 13
(13, 'Energy (kcal)', 390), (13, 'Protein', 28), (13, 'Calcium, Ca', 140),
(13, 'Carbohydrate, by difference', 50), (13, 'Iron, Fe', 7), (13, 'Vitamin C, total ascorbic acid', 45),
(13, 'Total lipid (fat)', 19), (13, 'Vitamin A, RAE', 510), (13, 'Zinc, Zn', 8),
(13, 'Fiber, total dietary', 10), (13, 'Potassium, K', 880), (13, 'Magnesium, Mg', 110),
(13, 'Vitamin D (D2 + D3)', 2), (13, 'Vitamin B-12', 1.3), (13, 'Vitamin K (phylloquinone)', 75),
(13, 'Sodium, Na', 520), (13, 'Vitamin B-6', 0.5), (13, 'Folate, total', 130),
(13, 'Cholesterol', 60), (13, 'Sugars, total', 18),

-- Meal 14
(14, 'Energy (kcal)', 430), (14, 'Protein', 35), (14, 'Calcium, Ca', 150),
(14, 'Carbohydrate, by difference', 65), (14, 'Iron, Fe', 8), (14, 'Vitamin C, total ascorbic acid', 50),
(14, 'Total lipid (fat)', 21), (14, 'Vitamin A, RAE', 580), (14, 'Zinc, Zn', 9),
(14, 'Fiber, total dietary', 12), (14, 'Potassium, K', 910), (14, 'Magnesium, Mg', 115),
(14, 'Vitamin D (D2 + D3)', 2.2), (14, 'Vitamin B-12', 1.4), (14, 'Vitamin K (phylloquinone)', 80),
(14, 'Sodium, Na', 550), (14, 'Vitamin B-6', 0.6), (14, 'Folate, total', 135),
(14, 'Cholesterol', 65), (14, 'Sugars, total', 20),

-- Meal 15
(15, 'Energy (kcal)', 470), (15, 'Protein', 30), (15, 'Calcium, Ca', 145),
(15, 'Carbohydrate, by difference', 60), (15, 'Iron, Fe', 7), (15, 'Vitamin C, total ascorbic acid', 42),
(15, 'Total lipid (fat)', 22), (15, 'Vitamin A, RAE', 550), (15, 'Zinc, Zn', 8),
(15, 'Fiber, total dietary', 11), (15, 'Potassium, K', 930), (15, 'Magnesium, Mg', 120),
(15, 'Vitamin D (D2 + D3)', 2.4), (15, 'Vitamin B-12', 1.5), (15, 'Vitamin K (phylloquinone)', 85),
(15, 'Sodium, Na', 570), (15, 'Vitamin B-6', 0.5), (15, 'Folate, total', 140),
(15, 'Cholesterol', 68), (15, 'Sugars, total', 21),

-- Meal 16
(16, 'Energy (kcal)', 360), (16, 'Protein', 24), (16, 'Calcium, Ca', 135),
(16, 'Carbohydrate, by difference', 55), (16, 'Iron, Fe', 6), (16, 'Vitamin C, total ascorbic acid', 38),
(16, 'Total lipid (fat)', 17), (16, 'Vitamin A, RAE', 520), (16, 'Zinc, Zn', 7.5),
(16, 'Fiber, total dietary', 10), (16, 'Potassium, K', 870), (16, 'Magnesium, Mg', 105),
(16, 'Vitamin D (D2 + D3)', 2), (16, 'Vitamin B-12', 1.2), (16, 'Vitamin K (phylloquinone)', 70),
(16, 'Sodium, Na', 480), (16, 'Vitamin B-6', 0.4), (16, 'Folate, total', 120),
(16, 'Cholesterol', 55), (16, 'Sugars, total', 16),

-- Meal 17
(17, 'Energy (kcal)', 510), (17, 'Protein', 38), (17, 'Calcium, Ca', 140),
(17, 'Carbohydrate, by difference', 75), (17, 'Iron, Fe', 9), (17, 'Vitamin C, total ascorbic acid', 65),
(17, 'Total lipid (fat)', 24), (17, 'Vitamin A, RAE', 610), (17, 'Zinc, Zn', 9.5),
(17, 'Fiber, total dietary', 13), (17, 'Potassium, K', 950), (17, 'Magnesium, Mg', 120),
(17, 'Vitamin D (D2 + D3)', 2.5), (17, 'Vitamin B-12', 1.5), (17, 'Vitamin K (phylloquinone)', 80),
(17, 'Sodium, Na', 600), (17, 'Vitamin B-6', 0.6), (17, 'Folate, total', 150),
(17, 'Cholesterol', 70), (17, 'Sugars, total', 25),

-- Meal 18
(18, 'Energy (kcal)', 320), (18, 'Protein', 22), (18, 'Calcium, Ca', 120),
(18, 'Carbohydrate, by difference', 45), (18, 'Iron, Fe', 5), (18, 'Vitamin C, total ascorbic acid', 28),
(18, 'Total lipid (fat)', 14), (18, 'Vitamin A, RAE', 430), (18, 'Zinc, Zn', 7),
(18, 'Fiber, total dietary', 8), (18, 'Potassium, K', 770), (18, 'Magnesium, Mg', 100),
(18, 'Vitamin D (D2 + D3)', 1.8), (18, 'Vitamin B-12', 1.1), (18, 'Vitamin K (phylloquinone)', 60),
(18, 'Sodium, Na', 430), (18, 'Vitamin B-6', 0.4), (18, 'Folate, total', 110),
(18, 'Cholesterol', 50), (18, 'Sugars, total', 13),

-- Meal 19
(19, 'Energy (kcal)', 480), (19, 'Protein', 32), (19, 'Calcium, Ca', 150),
(19, 'Carbohydrate, by difference', 70), (19, 'Iron, Fe', 8), (19, 'Vitamin C, total ascorbic acid', 52),
(19, 'Total lipid (fat)', 22), (19, 'Vitamin A, RAE', 590), (19, 'Zinc, Zn', 9),
(19, 'Fiber, total dietary', 12), (19, 'Potassium, K', 920), (19, 'Magnesium, Mg', 120),
(19, 'Vitamin D (D2 + D3)', 2.4), (19, 'Vitamin B-12', 1.4), (19, 'Vitamin K (phylloquinone)', 85),
(19, 'Sodium, Na', 580), (19, 'Vitamin B-6', 0.5), (19, 'Folate, total', 140),
(19, 'Cholesterol', 65), (19, 'Sugars, total', 21);



