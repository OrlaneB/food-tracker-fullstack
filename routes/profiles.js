var express = require('express');
var router = express.Router();
const db = require('../model/helper');
// const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn")
// const userMustExist = require("../guards/userMustExist")

/* GET profile information*/
// router.get("/:user_id", userShouldBeLoggedIn, async(req, res)=>{
// router.get("/:user_id", async(req, res)=>{

//   const { user_id } = req.params;
//   console.log("user_id", user_id);

//   if (!user_id) {
//     res.status(400).json({ error: "User ID is required!" });
//   }
//   try {
//     const results = await db(`SELECT * 
//                               FROM profiles 
//                               LEFT JOIN users
//                               ON profiles.profile_id = ${user_id}
//                               WHERE users.user_id = ${user_id}`);

//     if (results.length === 0) {
//       return res.status(404).json({ error: "Profile not found!" });
//     } else {
//       // Initialize result object
//       let resObj = results.data[0]

//       // Add success message
//       res.status(200).json({message:'Welcome', resObj});
//     }
//   } catch (e) {
//     console.log("something happened");
//     res.status(500).json({ error: e.message });
//   }

// })

/* POST profile information*/
// router.post("/:user_id", async (req, res) => {
//   const {user_id} = req.params
//   try {
//     // Add the user's profile informaiton
//     await db(`INSERT INTO profiles (user_id) 
//               VALUES (${user_id})`
//             );
//       // Send a success message to the frontend
//        res.status(201).json("Profile created!");
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

/* PUT profile information*/
// router.put("/profiles/profile_id", userMustExist, async (req, res) => {
router.put("/:profile_id", async (req, res) => {
  const {profile_id} = req.params
  const { chosenNutrients } = req.body;

  const JSONObject = JSON.stringify(chosenNutrients);
  console.log(JSONObject);
  try {
    // Add the user's profile informaiton
    await db(
      `UPDATE profiles
       SET chosenNutrients = ?
       WHERE profile_id = ?`,
      [JSONObject, profile_id]
    );

      // Send a success message to the frontend
       res.status(201).json("Updated chosen nutrients");
  } catch (err) {
    res.status(500).json(err);
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
       res.status(201).json("Nutrients to track updated!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* DELETE profile */


module.exports = router;
