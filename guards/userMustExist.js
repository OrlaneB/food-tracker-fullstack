const db = require("../model/helper");

async function userMustExist(req, res, next) {
  try {
    const result = await db(
      `SELECT * FROM users WHERE username="${req.body.username}"`
    );
    if (result.data.length === 1) {
      req.user = result.data[0];
      next();
    } else {
      res.status(404).send({ error: e.message });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
}

module.exports = userMustExist;