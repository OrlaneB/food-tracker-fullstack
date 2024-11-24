const db = require("../model/helper");

async function usernameUnavailable(req, res, next) {
    const {username} = req.body;

    try {
    const {data,error} = await db("SELECT COUNT(*) AS user_count FROM users WHERE username = ?",[username]);

    if(error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'An error occurred while checking username availability.' });
    }

    if (data[0].user_count > 0) {
      res.status(400).send({message:'Username unavailable'});
    }

    next();
    
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
}

module.exports= usernameUnavailable;