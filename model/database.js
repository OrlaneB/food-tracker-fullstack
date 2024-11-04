require("dotenv").config();
const mysql = require("mysql");
const fs = require("fs");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const createConnection =()=> {
  console.log("A- Top of database.js...");

  const con = mysql.createConnection({
    host: DB_HOST || "127.0.0.1",
    user: DB_USER || "root",
    password: DB_PASS,
    database: DB_NAME || "foodtracker",
    multipleStatements: true
  });

  console.log("B- Created Connection...");
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  
    let sql = fs.readFileSync(__dirname + "/init_db.sql").toString();
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Table creation `items` was successful!");
  
      console.log("Closing...");
    });

    console.log("C-End of database.js..");
  
    con.end();
  });

  return con;
  
}

module.exports = createConnection;