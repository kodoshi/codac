const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("test express");
});

app.listen(4242);
