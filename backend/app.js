const config = require("./config/config.js");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

// Mongoose DB connection
mongoose.connect(config.dbCFG, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
let db = mongoose.connection;

//Check connection
db.once("open", function () {
  console.log("Connection to MongoDB successful");
});

//Check DB errors
db.on("error", function (err) {
  console.log(err);
});

const postRoutes = require("./routes/post"); //routing

//logging middleware
app.use(morgan("dev"));
app.use(bodyParser.json()); //express is depress-ion
app.use(expressValidator());

app.use("/", postRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Node server active on port ${process.env.PORT}`);
});
