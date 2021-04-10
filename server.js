const express = require("express");
const path = require("path");

const app = express();
const ejs = require("ejs");

const expressLayout = require("express-ejs-layouts");
const { static } = require("express");

var PORT = process.env.PORT || 3300;

//asset
app.use(express.static("public"));

//set Template engine  first after set routes
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} `);
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("auth/login");
});

app.get("/register", (req, res) => {
  res.render("auth/register");
});

app.get("/cart", (req, res) => {
  res.render("customers/cart");
});
