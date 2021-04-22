require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const ejs = require("ejs");

const expressLayout = require("express-ejs-layouts");
const { static } = require("express");

var PORT = process.env.PORT || 3300;
var mongoose = require("mongoose");

const flash = require("express-flash");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
//Database connection
//For all project this can be Same  ...for remind
const url = "mongodb://localhost/pizza";

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Connection failed...");
  });

// session store
var store = new MongoDBStore({
  uri: url,
  collection: "sessions",
});

// Catch errors
store.on("error", function (error) {
  console.log(error);
});

// session config
app.use(
  require("express-session")({
    secret: process.env.COOKIE_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 week
    },
    store: store,
    // Boilerplate options, see:
    // * https://www.npmjs.com/package/express-session#resave
    // * https://www.npmjs.com/package/express-session#saveuninitialized
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
//asset
app.use(express.static("public"));

//set Template engine  first after set routes
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} `);
});

require("./routes/web")(app);
