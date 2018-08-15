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

  // Get a pokemon by name
  app.get("/:name", function (req, res) {
    if (req.params.name === "nidoran") {
      // Solving the Nidoran edge case
      var coinToss = Math.floor(Math.random() * 2);
      if (coinToss === 0) {
        req.params.name = "nidoranf";
      } else {
        req.params.name = "nidoranm";
      }
    }

    db.Pokemon.findOne({
      where: {
        indexedName: req.params.name // .toLowerCase().replace(/[^a-z]/, "");
      },
      include: [db.Image]
    }).then(function (data) {
      console.log(data);

      let obj = {
        pokemon: [data]
      }
      res.render("index", obj);

    });
  });
};
