var express = require('express');
var router = express.Router();
const db = require('../model/helper');


const nutrientNames = [ "Energy","Protein", "Carbohydrate, by difference","Total lipid (fat)","Fiber, total dietary","Total Sugars","Calcium, Ca","Iron, Fe","Potassium, K","Sodium, Na","Vitamin A, RAE","Vitamin C, total ascorbic acid","Vitamin D (D2 + D3)","Vitamin E (alpha-tocopherol)","Vitamin K (phylloquinone)","Magnesium, Mg","Zinc, Zn","Cholesterol","Folate, DFE","Fatty acids, total polyunsaturated" ]

// const nutrients = require("../client/src/utilities/userFriendlyNutrientNames");
// const nutrientNames = Object.keys(nutrients);
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

function checksValidFormat(obj){
  if(typeof obj==="object" &&
    obj!==null){

      for(let nut in obj){
        const n = obj[nut];
        if (typeof n==="object" &&
          n!==null &&
          typeof n.name==="string" &&
          typeof n.amount==="number" &&
          typeof n.goal==="string" &&
          nutrientNames.includes(n.name) &&
          ["More than","Equals","Less than"].includes(n.goal)
        ) {
          return true

        } else {
          return false
        }
      }

  } else {
    return false
  }
}

/* PUT profile information*/
// router.put("/profiles/profile_id", userMustExist, async (req, res) => {
router.put("/:profile_id", async (req, res) => {
  const {profile_id} = req.params
  const { chosenNutrients } = req.body;

  if(!checksValidFormat(chosenNutrients)) return res.status(401).json({message:"Object has an incorrect format."});

  const jsonObject = JSON.stringify(chosenNutrients);
  
  try {
    // Add the user's profile informaiton
    await db(
      "UPDATE profiles SET chosenNutrients = ? WHERE profile_id = ?",
      [jsonObject, profile_id]
    );

      // Send a success message to the frontend
       res.status(201).json("Updated chosen nutrients");
  } catch (err) {
    res.status(500).json(err);
  }
});

/* PUT nutrients to track */
// router.put("/nutrients/:profile_id", async (req, res) => {
//   const {profile_id} = req.params
//   const { listOfNutrientsToTrack } = req.body;
//   console.log(listOfNutrientsToTrack)

//   try {
//     // Add the user's profile informaiton
//     await db(`UPDATE profiles 
//               SET 
//                   nutrient_1 = "${listOfNutrientsToTrack[0]}", 
//                   nutrient_2 = "${listOfNutrientsToTrack[1]}", 
//                   nutrient_3 = "${listOfNutrientsToTrack[2]}" 
//               WHERE profile_id = ${profile_id}`
//             );
//       // Send a success message to the frontend
//        res.status(201).json("Nutrients to track updated!");
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

/* DELETE profile */


module.exports = router;
