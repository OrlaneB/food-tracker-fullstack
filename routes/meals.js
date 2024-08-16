var express = require('express');
var router = express.Router();
const db = require('../model/helper');
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn")

/* GET meals*/
router.get("/:profile_id:date", async(req, res)=>{

  const { date, profile_id} = req.params;
  // console.log(req.params);
  // console.log("profile_id", profile_id);
  // console.log("date of meal", date.slice(0,10));

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

// POST - add meals - rteurn meal Id to the frontend

module.exports = router;
