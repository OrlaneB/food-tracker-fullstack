require("dotenv").config();
var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtSecret = process.env.JWT_SECRET;

const saltrounds = process.env.SALT_ROUNDS || 10;

//const userMustExist = require("../guards/userMustExist")
const usernameUnavailable = require("../guards/usernameUnavailable")


/* POST register new user */
// router.post("/register", usernameUnavailable,async (req, res) => {
  router.post("/register", usernameUnavailable, async (req, res) => {

  console.log(req.body);
  const { username, password } = req.body;

  console.log("Received password:", password);  // Debugging: log password
  console.log("Salt rounds:", saltrounds);      // Debugging: log saltrounds

  const passwordHash = await bcrypt.hash(password, +saltrounds);
  try {
    await db(`INSERT INTO users (username, password) VALUES ('${username}', '${passwordHash}')`);
    
    const result = await db(`SELECT user_id FROM users WHERE username = "${username}"`);

    const userId = result.data[0].user_id;

    await db(`UPDATE users SET profile_id=${userId} where user_id=${userId}`);

    await db(`INSERT INTO profiles (user_id)
      VALUES (${userId})`);

    res.json({ message: "it worked" });
  } catch (err) {
    res
      .status(500)
      .json({ myMessage: "registration failed", serverError: err.message });
  }
});

/* POST login user */

// Login user NEED TO ADD MIDDLEWARE userMustExist
// router.post("/login/:id", userMustExist, async (req, res) => {
  router.post("/login",  async (req, res) => {

  const { password,username } = req.body;
  
  try {
      const user = req.body;
      console.log("user is : ",user)
      
      //Check if username exists 
      const userWithUsername = await db(`SELECT * FROM users WHERE username="${username}"`);

      if(userWithUsername.data.length <1) res.status(404).json({error:"There's no user with that username"});
      else {

          console.log("user with username ",userWithUsername);
        const passwordToCompare = userWithUsername.data[0].password;
        console.log("PasswordToCompare , ",passwordToCompare);
        const userPassword = user.password;
        const passwordCorrect = await bcrypt.compare(password, passwordToCompare);

        if (!passwordCorrect) {
          console.log("Password is incorrect!")
          res.status(401).json({ error: "password incorrect" });
        } else {
          const tokenPayload = { userId: userWithUsername.data[0].user_id };
          const token = jwt.sign(tokenPayload, jwtSecret);

          res.status(200).json({
            token: token,
            user_id:user.user_id
          });
        
        }

      }
      
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* Send user_id to the frontend to display meals */
router.post("/token", async(req,res)=>{
  const {token} = req.body;
 
  try{

    jwt.verify(token, jwtSecret, (err,decoded)=>{
      if(err) {
        res.status(401).json({message:err.message})}
      else {
 	console.log("Decoded user is : ",decoded);       
        res.status(200).json(decoded);
      }

      
    })
    
    
  }catch(err){
    res.status(500).json({message:err.message});
  }
})
/* Change username*/
// router.put

/* Reset password */

module.exports = router;

