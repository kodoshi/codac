const config = require("./config/config.js");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");

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

const postRoutes = require("./routes/post"); //post routing
const authRoutes = require("./routes/auth"); //authentication routing
const userRoutes = require("./routes/user"); //user routing

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json()); //express is depress-ion
app.use(cookieParser());
app.use(expressValidator());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
//custom middleware to give cleaner missing auth error
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Node server active on port ${process.env.PORT}`);
});
