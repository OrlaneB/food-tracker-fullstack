require("dotenv").config();
var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtSecret = process.env.JWT_SECRET;

const saltrounds = process.env.SALT_ROUNDS || 10;

const userMustExist = require("../guards/userMustExist")
const usernameUnavailable = require("../guards/usernameUnavailable")


/* POST register new user */
router.post("/register", usernameUnavailable,async (req, res) => {
  const { username, password } = req.body;

  console.log("Received password:", password);  // Debugging: log password
  console.log("Salt rounds:", saltrounds);      // Debugging: log saltrounds

  const passwordHash = await bcrypt.hash(password, +saltrounds);
  try {
    const sql = `INSERT INTO users (username, password) VALUES ('${username}', '${passwordHash}')`;
    await db(sql);
    res.send({ message: "it worked" });
  } catch (err) {
    res
      .status(500)
      .send({ myMessage: "registration failed", serverError: err.message });
  }
});

/* POST login user */

// Login user NEED TO ADD MIDDLEWARE userMustExist
router.post("/login/:id", userMustExist, async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // find the user
    const results = await db(
      `SELECT * FROM users WHERE username = '${username}'`
    );
  
    // if user doesn't exist, return error
    if (!results.data.length) {
      // console.log("user dont exist");
      res.status(401).send({ error: "user not found" });

    } else {//we found a user with the received username
      const user = results.data[0];
      // console.log("user exists?");
      const userPassword = user.password;
      //else check password
      const passwordCorrect = await bcrypt.compare(password, userPassword);
      if (!passwordCorrect) {
        // console.log("password incorrect");
        res.status(401).send({ error: "password incorrect" });
      } else {
        //create token and return it
        // console.log("password correct");
        const tokenPayload = { userId: user.user_id };
        // console.log("payload correct",jwtSecret);
        const token = jwt.sign(tokenPayload, jwtSecret);

        console.log("token is good");

        console.log("the user",user);
        console.log("login successful");

        // If successful send token to frontend to put in local storage
        res.send({
          token: token,
          user_id:user.user_id
        });
      }
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/* Send user_id to the frontend to display meals */
router.post("/token", async(req,res)=>{
  const {token} = req.body;
  let user_id =null;
  try{

    jwt.verify(token, jwtSecret, (err,decoded)=>{
      if(err) {
        res.status(401).send({message:err.message})}
      else {
        
        res.status(200).send(String(decoded.userId));
      }

      
    })
    
    
  }catch(err){
    res.status(500).send({message:err.message});
  }
})
/* Change username*/
// router.put

/* Reset password */

module.exports = router;

