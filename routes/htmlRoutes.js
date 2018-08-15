var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {

  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });


  // app.post("/signup", function (req, res) {
  //   db.User.signup(req.body).then(function (result) {
  //     res.json(result);
  //   });
  // });

  /*
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });
  */

  /*
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
  */
};
