var express = require('express');
var router = express.Router();
const db = require('../model/helper');
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn")

/* GET meals - returns ingredients and nutrients for all meals on a given date*/
router.get("/:profile_id", async(req, res)=>{
  const { date, profile_id} = req.body;

  if (!profile_id) {
    return res.status(400).send({ error: "Profile ID is required!" });
  }

  try {
    // Join ingredients, meals, and nutrients_by_meal tables 
    const resultsIngredients = await db(`SELECT *
                              FROM meals 
                              LEFT JOIN ingredients ON ingredients.meal_id = meals.meal_id 
                              WHERE meals.profile_id = ${profile_id}
                              AND meals.date = "${date.slice(0,10)}"
                            `);
    const resultsNutrients = await db(`SELECT *
                              FROM meals 
                              LEFT JOIN nutrients_by_meal nutrients ON nutrients.meal_id = meals.meal_id 
                              WHERE meals.profile_id = ${profile_id}
                              AND meals.date = "${date.slice(0,10)}"
                            `);

    if (resultsIngredients.length === 0 || resultsNutrients.length === 0 ) {
      return res.status(404).send({ error: "Meal not found!" });
    } else {
      const dataIngredients = resultsIngredients.data;
      const dataNutrients = resultsNutrients.data;
      // Return data and add success message
      res.status(200).send({message:'Success', dataIngredients, dataNutrients});
    }
  } catch (e) {
    console.log("something happened");
    res.status(500).send({ error: e.message });
  }

})

/* POST one meal */
router.post('/:profile_id', async(req, res) => {
  const { profile_id } = req.params;
  const { date, ingredientsList} = req.body;
  console.log(typeof profile_id); //string
  console.log(date); //string
    
  try {

  // Add profile_id and date to meals
  await db(`INSERT INTO meals (profile_id, date)
            VALUES (${profile_id}, "${date.slice(0,10)}");`
        );
  
  // -----> Add ingredients -- receive an array of objects that have ingredient information
  // You need to write a loop to add ingredient objects from array to the ingredients table with it's corresponding meal

  // Send the meal_id for this meal to frontend 
  const getMealId = `SELECT max(meal_id) 
                     FROM meals
                     WHERE profile_id=${profile_id}`

  // Send a success message to the frontend
  res.status(201).send("Meal added!");
  } catch (err) {
  res.status(500).send({ error: err.message });
  }
})

/* POST ingredients to one meal */
router.post('/ingredients/:meal_id', async(req, res) => {
  const { meal_id} = req.params;
  
  const { name, number_amount} = req.body;
    
  try {

  // Add ingredients to meal
  await db(` INSERT INTO ingredients (meal_id, name, number_amount)
            VALUES (${meal_id},"${name}",${number_amount})`
        );
  // Send a success message to the frontend
  res.status(201).send("Ingredients added!");
  } catch (err) {
  res.status(500).send({ error: err.message });
  }
})

/* GET nutrients*/

module.exports = router;
