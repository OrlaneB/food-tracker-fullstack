const db = require("../model/helper");

async function usernameUnavailable(req, res, next) {
    const {username} = req.body;

    try {
    const result = await db(
      `SELECT * FROM users WHERE username = "${username}"`
    );

    if (result.data.length === 1) {
      res.send('Username unavailable');
    }

    next();
    
  } catch {
    res.status(500).send({ error: e.message });
  }
}

module.exports = usernameUnavailable;