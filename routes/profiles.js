var express = require('express');
var router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn")

/* GET profile information*/
router.get("/",userShouldBeLoggedIn,async(req, res)=>{
  console.log(res.locals.userId);
  res.send({protectedData: "This is your profile info!"})

  const { user_id } = req.params;

  if (!userId) {
    return res.status(400).send({ error: "User ID is required!" });
  }
  try {
    const results = await db(`SELECT * FROM users WHERE user_id = ?`, [user_id]);

    if (results.length === 0) {
      return res.status(404).send({ error: "User not found!" });
    } else {
      res.status(200).send(results.data);
      console.log(results.data)
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }

})



/* POST profile information
add middleware to check id userIdMustExist
*/

/*UPDATE profile information*/
// create array of the column names and use index to add to loop
// from the frontend i get an array that has 0-3 nutrients, username
// i want to update the nutrients when username
// loop with 3 iterations for each if there is something in the array add the nutrient to nutrient_1 = index+1, etc.
// else set the nutrient to null



/* DELETE account, will need to figure out if its tied to userid or profile id, whichever you decide you will need ON DELETE CASCADE*/

module.exports = router;
