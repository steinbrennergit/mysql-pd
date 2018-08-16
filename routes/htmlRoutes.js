var db = require("../models");
// var passport = require("../config/passport");

var userTeam = function (id) {
  return db.Team.findOne({
    user_id: id
  })
}

module.exports = function (app) {

  // Load index page
  app.get("/", function (req, res) {
    if (!req.user) {
      return res.redirect("/signin");
    }

    // Need to get user's team to pass to render
    userTeam(req.user.id).then((data) => {
      console.log(data);
    });

    res.render("index");
  });

  app.get("/signin", function (req, res) {
    if (req.user) {
      return res.redirect("/");
    }
    res.render("signin");
  });

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
    if (!req.user) {
      return res.redirect("/signin");
    }

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
