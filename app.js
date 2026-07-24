const express = require("express");
const path = require("node:path");
const { Pool } = require("pg");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const methodOverride = require('method-override');

const signupRouter = require("./routes/signupRoutes");
const db = require("./db/queries");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use("/", signupRouter);

app.listen(3000, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("app listening on port 3000!");
});
