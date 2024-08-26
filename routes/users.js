require("dotenv").config();
var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtSecret = process.env.JWT_SECRET;
const saltrounds = process.env.SALT_ROUNDS || 10;
const userMustExist = require("../guards/userMustExist")

/* POST register new user */
// Register user NEED TO ADD MIDDLEWARE userAlreadyExists
// This endpoint works but the profile_id value is null for user registered through postman
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, +saltrounds);
  try {
    const sql = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${passwordHash}')`;
    await db(sql);
    res.send({ message: "it worked" });
  } catch (err) {
    res
      .status(500)
      .send({ myMessage: "registration failed", serverError: err.message });
  }
});

/* POST login user */
router.post("/login", userMustExist, async (req, res) => {
  const { username, password } = req.body;
  try {
    // find the user
    const results = await db(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    // if user doesn't exist, return error
    if (!results.data.length) {
      res.status(401).send({ error: "user not found" });

    } else {//we found a user with the received username
      const user = results.data[0];
      const userPassword = user.password;
      //else check password
      const passwordCorrect = await bcrypt.compare(password, userPassword);
      if (!passwordCorrect) {

        res.status(401).send({ error: "password incorrect" });
      } else {
        //create token and return it
        const tokenPayload = { userId: user.user_id };
        const token = jwt.sign(tokenPayload, jwtSecret);

        console.log("the user",user);
        console.log("login successful");

        // If successful send token to frontend to put in local storage
        res.send({
          token: token,
        });
      }
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// WE JUST STARTED THIS AT THE END OF CLASS BUT IT IS NOT WORKING YET
// router.post("/loginCheck", async (req, res) => {
//   const token = req.headers["authorization"]?.replace(/^Bearer\s/, "");//
//   if (!token) {
//     res.status(403).send({ message: "please provide a token" });
//   } else {
//     // const payload = jwt.verify(token, supersecret);
//     // use payload
//     jwt.verify(token, jwtSecret, async (err, payload) => {
//       if (err) {
//         res.status(401).send({ message: err.message });
//       } else {
//         res.send({protectedData: "This is a private data!"});
//       }
//     });
//   }
// });

module.exports = router;

