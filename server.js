const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var path = require('path');
const app = express();
const db = require("./app/models");

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

//parse request of content-type - application/json
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true 
}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// to sync the db
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome!!!" });
});

require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});