var express = require('express');
var router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn")

/* GET profile information
add middleware to check id userIdMustExist
*/
router.get("/",userShouldBeLoggedIn,async(req, res)=>{
  console.log(res.locals.userId);
  res.send({protectedData: "This is your profile info!"})

})

/* POST profile information
add middleware to check id userIdMustExist
*/

/*UPDATE profile information*/

/* DELETE account, will need to figure out if its tied to userid or profile id, whichever you decide you will need ON DELETE CASCADE*/

module.exports = router;
