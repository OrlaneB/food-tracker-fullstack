var express = require('express');
var router = express.Router();
const db = require('../model/helper');


const nutrientNames = [ "Energy","Protein", "Carbohydrate, by difference","Total lipid (fat)","Fiber, total dietary","Total Sugars","Calcium, Ca","Iron, Fe","Potassium, K","Sodium, Na","Vitamin A, RAE","Vitamin C, total ascorbic acid","Vitamin D (D2 + D3)","Vitamin E (alpha-tocopherol)","Vitamin K (phylloquinone)","Magnesium, Mg","Zinc, Zn","Cholesterol","Folate, DFE","Fatty acids, total polyunsaturated" ]


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


/* DELETE profile */


module.exports = router;
