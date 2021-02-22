const express = require("express");
const path = require("path");

const app = express();
const ejs = require("ejs");

const expressLayout = require("express-ejs-layouts");
const { static } = require("express");

var PORT = process.env.PORT || 3300;

app.get("/", (req, res) => {
  res.render("home");
});

//asset
app.use(express.static("public"));

//set Template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} `);
});
