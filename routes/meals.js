var express = require('express');
var router = express.Router();
const db = require('../model/helper');
// const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn")

const nutrientNames = [ "Energy","Protein", "Carbohydrate, by difference","Total lipid (fat)","Fiber, total dietary","Total Sugars","Calcium, Ca","Iron, Fe","Potassium, K","Sodium, Na","Vitamin A, RAE","Vitamin C, total ascorbic acid","Vitamin D (D2 + D3)","Vitamin E (alpha-tocopherol)","Vitamin K (phylloquinone)","Magnesium, Mg","Zinc, Zn","Cholesterol","Folate, DFE","Fatty acids, total polyunsaturated" ]


function checkObjectFormat(obj, type) {
  if (!obj || typeof obj !== "object") return false;

  if (type === "nutrients") {
    const keys = Object.keys(obj);
    return (
      keys.length === 20 &&
      keys.every((key) => nutrientNames.includes(key) && typeof obj[key] === "number")
    );
  } else if (type === "ingredients") {
    return Object.entries(obj).every(
      ([key, value]) => typeof key === "string" && typeof value === "number"
    );
  }
  return false;
}

/* GET meals, ingredients, nutrients*/
// router.get("/:profile_id", userShouldBeLoggedIn, async(req, res)=>{
router.get("/:profile_id", async(req, res)=>{
  const {date} = req.query; // recommended to not use req.body with a get request
  const {profile_id}= req.params;

  if (!profile_id) {
    return res.status(400).send({ error: "Profile ID is required!" });
  }

  try {
    // Join ingredients, meals, and nutrients_by_meal tables 
    const resultsIngredients = await db(`SELECT *
                              FROM meals m 
                              JOIN ingredients i ON m.meal_id = i.meal_id 
                              WHERE m.profile_id = ${profile_id}
                              AND m.date = "${date.slice(0,10)}"
                            `);
    const resultsNutrients = await db(`SELECT *
                              FROM meals m 
                              JOIN nutrients_by_meal n ON m.meal_id = n.meal_id 
                              WHERE m.profile_id = ${profile_id}
                              AND m.date = "${date.slice(0,10)}"
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

/* POST meal */
router.post('/:profile_id', async(req, res) => {
  const { profile_id } = req.params;
  const { date, nutrients, ingredients} = req.body;

  try {
    // if(checkObjectFormat(nutrients,"nutrients") && checkObjectFormat(ingredients,"ingredients")){
    if(!checkObjectFormat(nutrients,"nutrients")) return res.status(400).json({message:"Invalid nutrients format."});
    if(!checkObjectFormat(ingredients,"ingredients")) return res.status(400).json({message:"Invalid ingredients format."});


      await db("INSERT INTO meals (profile_id,date,nutrients,ingredients) VALUES (?,?,?,?);",
        [profile_id,date,JSON.stringify(nutrients),JSON.stringify(ingredients)]
      );

      res.status(201).json({message:"Meal created successfully"});


    // } else {
    //   return res.status(401).json({message:"Nutrients or ingredients don't have the correct format."});
    // }
  } catch(err){
    console.error("Error creating meal : ",err);
    res.status(500).json({message:"An error occured during meal creation.",err});
  }

})

/* PUT ingredients*/
router.put('/ingredients/:meal_id', async(req, res) => {
  const { meal_id} = req.params;
  const {ingredientsList} = req.body;
  try {
    console.log("before loop");
    // Add ingredients to meal
    for (let ingredient of ingredientsList){
      await db(`UPDATE ingredients 
                SET name = "${ingredient.name}", number_amount = ${ingredient.number_amount}
                WHERE meal_id = ${meal_id}`
      );
      console.log("in loop");
    }
    // Send a success message to the frontend
    res.status(201).send("Ingredients updated!");
  } 
  
  catch (err) {
    res.status(500).send({ error: err.message });
  }
})

/* DELETE meal*/

/* DELETE ingredient */

module.exports = router;
