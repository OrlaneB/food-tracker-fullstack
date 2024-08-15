var express = require('express');
var router = express.Router();
const db = require('../model/helper');
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn")

/* GET meals*/
// router.get("/:date",userShouldBeLoggedIn, async(req, res)=>{
router.get("/:profile_id", async(req, res)=>{

  const { date, profile_id } = req.params;
  console.log("profile_id", profile_id);

  if (!profile_id) {
    return res.status(400).send({ error: "Profile ID is required!" });
  }
  try {
    const results = await db(`SELECT * 
                              FROM meals 
                              LEFT JOIN ingredients
                              LEFT JOIN nutrients_by_meal
                              ON meals.meal_id = 1
                              WHERE meals.profile_id = ${profile_id},
                              AND date = "${date.slice(0,10)}"`);

    if (results.length === 0) {
      return res.status(404).send({ error: "Meal not found!" });
    } else {
      // Initialize result object
      let resObj = results.data[0]

      // Add success message
      res.status(200).send({message:'Success', resObj});
    }
  } catch (e) {
    console.log("something happened");
    res.status(500).send({ error: e.message });
  }

})

// POST - add meals - rteurn meal Id to the frontend

module.exports = router;
