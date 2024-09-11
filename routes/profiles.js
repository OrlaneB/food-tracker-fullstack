var express = require('express');
var router = express.Router();
const db = require('../model/helper');
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn")
const userMustExist = require("../guards/userMustExist")

/* GET profile information*/
// router.get("/:user_id", userShouldBeLoggedIn, async(req, res)=>{
router.get("/:user_id", async(req, res)=>{

  const { user_id } = req.params;
  console.log("user_id", user_id);

  if (!user_id) {
    return res.status(400).send({ error: "User ID is required!" });
  }
  try {
    const results = await db(`SELECT * 
                              FROM profiles 
                              LEFT JOIN users
                              ON profiles.profile_id = ${user_id}
                              WHERE users.user_id = ${user_id}`);

    if (results.length === 0) {
      return res.status(404).send({ error: "Profile not found!" });
    } else {
      // Initialize result object
      let resObj = results.data[0]

      // Add success message
      res.status(200).send({message:'Welcome', resObj});
    }
  } catch (e) {
    console.log("something happened");
    res.status(500).send({ error: e.message });
  }

})

/* POST profile information*/
router.post("/:user_id", async (req, res) => {
  const {user_id} = req.params
  try {
    // Add the user's profile informaiton
    await db(`INSERT INTO profiles (user_id) 
              VALUES (${user_id})`
            );
      // Send a success message to the frontend
       res.status(201).send("Profile created!");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/* PUT profile information*/
// router.put("/profiles/profile_id", userMustExist, async (req, res) => {
router.put("/:profile_id", async (req, res) => {
  const {profile_id} = req.params
  const { nutrient_1_name,
          nutrient_2_name,
          nutrient_3_name,
          nutrient_1_amount,
          nutrient_2_amount,
          nutrient_3_amount,
          nutrient_1_goal,
          nutrient_2_goal,
          nutrient_3_goal} = req.body;
  try {
    // Add the user's profile informaiton
    await db(`UPDATE profiles
              SET 
                  nutrient_1_name = '${nutrient_1_name}',
                  nutrient_2_name = '${nutrient_2_name}',
                  nutrient_3_name = '${nutrient_3_name}',
                  nutrient_1_amount = ${nutrient_1_amount},
                  nutrient_2_amount = ${nutrient_2_amount},
                  nutrient_3_amount = ${nutrient_3_amount},
                  nutrient_1_goal = '${nutrient_1_goal}',
                  nutrient_2_goal = '${nutrient_2_goal}',
                  nutrient_3_goal = '${nutrient_3_goal}'
              WHERE profile_id = ${profile_id};
      
            `);
      // Send a success message to the frontend
       res.status(201).send("Profile changed!");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/* PUT nutrients to track */
router.put("/nutrients/:profile_id", async (req, res) => {
  const {profile_id} = req.params
  const { listOfNutrientsToTrack } = req.body;
  console.log(listOfNutrientsToTrack)

  try {
    // Add the user's profile informaiton
    await db(`UPDATE profiles 
              SET 
                  nutrient_1 = "${listOfNutrientsToTrack[0]}", 
                  nutrient_2 = "${listOfNutrientsToTrack[1]}", 
                  nutrient_3 = "${listOfNutrientsToTrack[2]}" 
              WHERE profile_id = ${profile_id}`
            );
      // Send a success message to the frontend
       res.status(201).send("Nutrients to track updated!");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/* DELETE profile */


module.exports = router;
