require ("dotenv").config();
const express = require("express");
const logger = require( "morgan" );
const hbs = require("hbs");
const sessionConfig = require("./config/session.config");

require("./config/db.config");

const app =express();
// Handles access to the public folder
app.use(express.static("public"));
// To have access to `body` property in the request
app.use(express.urlencoded({extended: false}));
// In development environment the app logs
app.use(logger("dev"));

//app.use(sessionConfig);

 // Normalizes the path to the views folder
app.set("views", __dirname + "/views");
// Sets the view engine to handlebars
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials");
// app.use((req, res, next) => {
//   res.locals.currentUser= req.session.currentUser;
//   next;
// });

const routes =require("./config/routes.config");
app.use(routes);

app.use((req, res, next) => {
  // this middleware runs whenever requested page is not available
  res.status(404).render("not-found");
});

app.use((err, req, res, next) => {
  // whenever you call next(err), this middleware will handle the error
  // always logs the error
  console.error("ERROR", err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).render("error");
  }
});

app.use((err, req, res, next) => {
  res.render("error", {err});
});



app.listen(3000, () => console.log("Listening on port 3000"));

