var express = require('express');
var router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

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

module.exports = router;
