var express = require('express');
var router = express.Router();
const db = require('../model/helper');
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn")
const userMustExist = require("../guards/userMustExist")

/* GET profile information*/
router.get("/:user_id", userShouldBeLoggedIn, async(req, res)=>{

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
router.post("/profiles/user_id", userMustExist, async (req, res) => {
  const {user_id} = req.params
  const { nutrient_1, 
          nutrient_2,
          nutrient_3,
          medical_condition,
          date_of_birth,
          gender,
          weight,
          height} = req.body;
  try {
    // Add the user's profile informaiton
    await db(`INSERT INTO profiles 
              (
              user_id,
              nutrient_1, 
              nutrient_2, 
              nutrient_3, 
              medical_condition, 
              date_of_birth, 
              gender, 
              weight, 
              height) 
       VALUES (
              ${user_id},
              "${nutrient_1}", 
              "${nutrient_2}", 
              "${nutrient_3}", 
              "${medical_condition}", 
              "${date_of_birth.slice(0,10)}", 
              "${gender}", 
              "${weight}", 
              "${height}")`
            );
      // Send a success message to the frontend
       res.status(201).send("Profile updated!");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/*UPDATE profile information*/
// create array of the column names and use index to add to loop
// from the frontend i get an array that has 0-3 nutrients, username
// i want to update the nutrients when username
// loop with 3 iterations for each if there is something in the array add the nutrient to nutrient_1 = index+1, etc.
// else set the nutrient to null



/* DELETE account, will need to figure out if its tied to userid or profile id, whichever you decide you will need ON DELETE CASCADE userMustExist guard*/

module.exports = router;
