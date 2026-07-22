const express = require("express");
const path = require("node:path");
const { Pool } = require("pg");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const signupRouter = require("./routes/signupRoutes");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/", signupRouter);
app.use("/index", (req, res) => {
  res.render('index');
});


app.listen(3000, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("app listening on port 3000!");
});
