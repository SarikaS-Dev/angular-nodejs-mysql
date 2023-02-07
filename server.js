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


db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome!!!" });
});

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});