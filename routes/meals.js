// POST - add meals - rteurn meal Id to the frontend
// GET - meals (JOIN table)
var express = require('express');
var router = express.Router();

// GET - meals (JOIN table)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

// POST - add meals - rteurn meal Id to the frontend

module.exports = router;
