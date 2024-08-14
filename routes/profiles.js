var express = require('express');
var router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn")

/* GET profile information
add middleware to check id userShouldBeLoggedIn
*/
router.get("/",userShouldBeLoggedIn,async(req, res)=>{
  console.log(res.locals.userId);
  res.send({protectedData: "This is your profile info!"})

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
