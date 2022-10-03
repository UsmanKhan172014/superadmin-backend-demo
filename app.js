const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node",
});
con.connect((err) => {
  if (err) throw err;
  console.log("Connected");
});

const app = express();
const port = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//getting customers from database
app.get("/getCustomers", (req, res) => {
  let sql = "SELECT * FROM customers";
  let query = con.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});

//adding customers to database
app.post("/addCustomer", (req, res) => {
  let customer = {
    name: req.body.name,
    password: req.body.password,
    expiry: req.body.expiry,
    contact: req.body.contact,
  };
  let sql = "INSERT INTO customers SET ?";
  let query = con.query(sql, customer, (err, results) => {
    if (err) throw err;
    res.json({
      message: "Customer added successfully",
    });
  });
});

app.get("/getHome", async (req, res) => {
  let sql = "SELECT * FROM customers";
  let query = con.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
