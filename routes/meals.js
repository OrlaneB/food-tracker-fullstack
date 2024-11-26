var express = require('express');
var router = express.Router();
const db = require('../model/helper');

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
router.get("/:profile_id/:date", async(req, res)=>{
  const {profile_id,date}= req.params;

  try {
    const result = await db(
      "SELECT COUNT(*) AS profile_count FROM profiles WHERE profile_id= ? ;",
      [profile_id]
    )

    if(result.data[0].profile_count !== 1) return res.status(404).json({message:"This profile does not exists."});

    const mealsResult = await db(
      "SELECT meal_id, nutrients, ingredients FROM MEALS WHERE profile_id= ? AND date = ? ;",
      [profile_id,date]
    )

    const meals = mealsResult.data.map((m)=>JSON.parse(m.ingredients));
    const nutrients = mealsResult.data.map(m=>JSON.parse(m.nutrients));
  

    res.status(200).json({message:"Successful meal retrieval.",meals,nutrients});

  } catch(err){
    console.error("Error retrieving meals",err);
    res.status(500).json({message:"Error while retrieving meals : ",err})
  }

})

/* POST meal */
router.post('/:profile_id', async(req, res) => {
  const { profile_id } = req.params;
  const { date, nutrients, ingredients} = req.body;

  try {
    if(!checkObjectFormat(nutrients,"nutrients")) return res.status(400).json({message:"Invalid nutrients format."});
    if(!checkObjectFormat(ingredients,"ingredients")) return res.status(400).json({message:"Invalid ingredients format."});


      await db("INSERT INTO meals (profile_id,date,nutrients,ingredients) VALUES (?,?,?,?);",
        [profile_id,date,JSON.stringify(nutrients),JSON.stringify(ingredients)]
      );

      res.status(201).json({message:"Meal created successfully"});

  } catch(err){
    console.error("Error creating meal : ",err);
    res.status(500).json({message:"An error occured during meal creation.",err});
  }

})

/* DELETE meal*/
/* PUT meal */

module.exports = router;
