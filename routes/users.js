require("dotenv").config();
var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtSecret = process.env.JWT_SECRET;

const saltrounds = process.env.SALT_ROUNDS || 10;
const pool = require("../model/pool");



/* POST register new user */
  router.post("/register", async (req, res) => {

    const {username,password} = req.body;

    const passwordHash = await bcrypt.hash(password, +saltrounds);

    //Add verification for username and password in frontend
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const [userResult] = await connection.query(
        "INSERT INTO users (username, password) VALUES (?,?)",
        [username,passwordHash]
      );

      const newUserId = userResult.insertId;

      await connection.query(
        "INSERT INTO profiles (user_id, profile_id) VALUES (?,?)",
        [newUserId,newUserId]
      );

      await connection.commit();

      res.status(201).json({message:"User registered successfully."});

    } catch (err){
      
      await connection.rollback();

      if(err.code === "ER_DUP_ENTRY"){
        return res.status(400).json({ message: "Username is already taken." });
      }

      console.error("Registration error : ",err);
      res.status(500).json({message:"An error occured during registration."});

    } finally {

      connection.release();

    }
  });

/* POST login user */
  router.post("/login",  async (req, res) => {

  const {username,password} = req.body;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const result = await connection.query(
      "SELECT user_id,password FROM users where username = ? ;",
      [username]
    );

    if(!result[0][0]){
      return res.status(404).json({message:"No user exists with that username."})
    }

    const {user_id} = result[0][0];
    const passwordToCompare = result[0][0].password;
    const correctPassword = await bcrypt.compare(password,passwordToCompare);

    if(!correctPassword){

      return res.status(401).json({message:"The password is incorrect."})

    } else {

      const tokenPayload = {user_id, username};
      const token = jwt.sign(tokenPayload,jwtSecret);

      const profile = await connection.query(
        "SELECT chosenNutrients from profiles where user_id = ? ;",
        [user_id]
      );


      // Check `profile[0]`
      if (Array.isArray(profile[0]) && profile[0].length > 0 && profile[0][0].chosenNutrients) {
        chosenNutrients = profile[0][0].chosenNutrients;
      }// Fallback to `profile[1]`
      else if (Array.isArray(profile[1]) && profile[1].length > 0 && typeof profile[1][0] === 'string') {
        chosenNutrients = JSON.parse(profile[1][0]);
      } else {
        chosenNutrients = {
          nutrient1:{name:"Sodium, Na",amount:2300,goal:"Less than"},
          nutrient2:{name:"Vitamin E (alpha-tocopherol)",amount:15,goal:"Equals"},
          nutrient3:{name:"Vitamin D (D2 + D3)",amount:600,goal:"More than"}
        }
      }

      const profileInfo = {
        id:user_id,
        username,
        chosenNutrients
      }

      res.status(200).json({token, profileInfo});
    }

  } catch(err){

    await connection.rollback();

    console.error("Login error : ",err);
    res.status(500).json({message:"An error occured druing login."});

  } finally {
    connection.release();
  }
   
});

/* Send user_id to the frontend to display meals */
router.post("/token", async(req,res)=>{
  const {token} = req.body;
  try{

    const decoded = jwt.verify(token,jwtSecret);

    const profile = await db("SELECT chosenNutrients FROM profiles WHERE user_id = ?", [decoded.user_id]);

    if(!profile){
      return res.status(404).json({ message: "Profile not found" });
    }

    const chosenNutrients = profile.data[0].chosenNutrients? JSON.parse(profile.data[0].chosenNutrients) : {};

    const profileInfo = {
      id : decoded.user_id,
      username : decoded.username,
      chosenNutrients
    }

    res.status(200).json({message:"Successful login from token", profileInfo});

    
  } catch(err){
    res.status(500).json({message:"Login with token failed", err});
  }
})


module.exports = router;

