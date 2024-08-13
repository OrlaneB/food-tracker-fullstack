require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

function userShouldBeLoggedIn(req, res, next) {
  const token = req.headers["authorization"]?.replace(/^Bearer\s/, "");//
  const supersecret = process.env.SUPERSECRET;
  if (!token) {
    res.status(401).send({ message: "please provide a token" });
  } else {
    // const payload = jwt.verify(token, supersecret);
    // use payload
    //if there is a token => verify it
    jwt.verify(token, jwtSecret, async (err, payload) => {
      if (err) {
        res.status(401).send({ message: err.message });
      } else {//everything is correct!
       res.locals.user = payload.userId;
       next();//let the request to go through the next middleware
      }
    });
  }
}
module.exports = userShouldBeLoggedIn;
