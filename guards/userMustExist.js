const db = require("../model/helper");

async function studentMustExist(req, res, next) {
  try {
    const result = await db(
      `SELECT * FROM students WHERE id = ${+req.params.id}`
    );
    if (result.data.length === 1) {
      res.locals.item = result.data[0];
      next();
    } else {
      res.status(404).send({ error: e.message });
    }
  } catch {
    res.status(500).send({ error: e.message });
  }
}

module.exports = studentMustExist;