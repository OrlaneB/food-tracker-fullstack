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
// router.post("/register", usernameUnavailable,async (req, res) => {
  router.post("/register", usernameUnavailable, async (req, res) => {

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

    res.send({ message: "it worked" });
  } catch (err) {
    res
      .status(500)
      .send({ myMessage: "registration failed", serverError: err.message });
  }
});

/* POST login user */

// Login user NEED TO ADD MIDDLEWARE userMustExist
// router.post("/login/:id", userMustExist, async (req, res) => {
  router.post("/login", userMustExist,  async (req, res) => {

  const { password } = req.body;
  
  try {
      const {user} = req;
      // console.log("user is : ",user)

      const userPassword = user.password;
      const passwordCorrect = await bcrypt.compare(password, userPassword);

      if (!passwordCorrect) {
        console.log("Password is correct!")
        res.status(401).send({ error: "password incorrect" });
      } else {
        const tokenPayload = { userId: user.user_id };
        const token = jwt.sign(tokenPayload, jwtSecret);

        res.send({
          token: token,
          user_id:user.user_id
        });
      
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

