require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

function userShouldBeLoggedIn(req, res, next) {
  const token = req.headers["authorization"]?.replace(/^Bearer\s/, "");//
  
  if (!token) {
    res.status(401).send({ message: "please provide a token" });
  } else {
    const payload = jwt.verify(token, jwtSecret);

    // use payload, if there is a token => verify it
    jwt.verify(token, jwtSecret, async (err, payload) => {
      if (err) {
        res.status(401).send({ message: err.message });
      } else {
        //everything is correct!
       res.locals.user = payload.userId;

       //let the request to go through the next middleware
       next();
      }
    });
  }
}
module.exports = userShouldBeLoggedIn;
