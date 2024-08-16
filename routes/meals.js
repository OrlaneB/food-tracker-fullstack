var express = require('express');
var router = express.Router();
const db = require('../model/helper');
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn")

/* GET meals*/
router.get("/:profile_id", async(req, res)=>{
  const { date, profile_id} = req.body;

  if (!profile_id) {
    return res.status(400).send({ error: "Profile ID is required!" });
  }

  try {
    // Join ingredients, meals, and nutrients_by_meal tables 
    const results = await db(`SELECT * 
                              FROM ingredients 
                              RIGHT JOIN meals ON meals.meal_id = ingredients.meal_id 
                              RIGHT JOIN nutrients_by_meal ON meals.meal_id = nutrients_by_meal.meal_id
                              WHERE meals.profile_id = ${profile_id}
                              AND meals.date = "${date.slice(0,10)}"
                            `);

    if (results.length === 0) {
      return res.status(404).send({ error: "Meal not found!" });
    } else {
      const data = results.data;
      // Return data and add success message
      res.status(200).send({message:'Success', data});
    }
  } catch (e) {
    console.log("something happened");
    res.status(500).send({ error: e.message });
  }

})

/* POST one meal */
router.post('/:profile_id', async(req, res) => {
  const { profile_id } = req.params;
  const { date} = req.body;
  console.log(typeof profile_id); //string
  console.log(date); //string
    
  try {

  // Add profile_id and date to meals
  await db(`INSERT INTO meals (profile_id, date)
            VALUES (${profile_id}, "${date.slice(0,10)}");`
        );
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
    console.log(meal_id);
    console.log(name);
    console.log(number_amount);
  try {
console.log("in try block");
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

/* GET one meal */

module.exports = router;
