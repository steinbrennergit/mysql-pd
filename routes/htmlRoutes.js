var db = require("../models");
// var passport = require("../config/passport");

var findUserTeam = function (id) {
  // console.log("attempted findUserTeam");
  return db.Team.findOne({
    where: {
      user_id: id
    }
  });
}

var findTeamPokemon = function (listOfIds) {
  return db.Pokemon.findAll({
    where: {
      id: listOfIds
    },
    include: [db.Image]
  });
}

module.exports = function (app) {

  // Load index page
  app.get("/", function (req, res) {
    if (!req.user) {
      return res.redirect("/signin");
    }
    // Need to get user's team to pass to render
    findUserTeam(req.user.id).then((data) => {
      if (!data) {
        return null;
      }
      // console.log(data.dataValues);
      // console.log("findUserTeam found data");
      var obj = {};
      var listOfIds = [];
      for (key in data.dataValues) {
        if (key[0] === "p" && data.dataValues[key]) {
          // console.log(data.dataValues[key]);
          obj[key] = data.dataValues[key];
          listOfIds.push(data.dataValues[key]);
        } else if (key[0] === "p") {
          obj[key] = null;
        }
      }

      findTeamPokemon(listOfIds).then((data) => {
        for (let i = 0; i < 10; i++) {
          let key = "p" + i;
          data.forEach((set) => {
            if (obj[key] === set.dataValues.id) {
              obj[key] = set.dataValues;
            }
          });
        }

        // console.log(data);
        res.render("index", obj);
        // console.log(obj);
      }).catch((err) => {
        console.log(err);
        res.render("index");
      });
    }).catch((err) => {
      console.log(err);
      res.render("index");
    });
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

    findUserTeam(req.user.id).then((data) => {
      if (!data) {
        return null;
      }
      // console.log(data.dataValues);
      // console.log("findUserTeam found data");
      var obj = {};
      var listOfIds = [];
      for (key in data.dataValues) {
        if (key[0] === "p" && data.dataValues[key]) {
          // console.log(data.dataValues[key]);
          obj[key] = data.dataValues[key];
          listOfIds.push(data.dataValues[key]);
        } else if (key[0] === "p") {
          obj[key] = null;
        }
      }

      findTeamPokemon(listOfIds).then((data) => {
        for (let i = 0; i < 10; i++) {
          let key = "p" + i;
          data.forEach((set) => {
            if (obj[key] === set.dataValues.id) {
              obj[key] = set.dataValues;
            }
          });
        }

        db.Pokemon.findOne({
          where: {
            indexedName: req.params.name // .toLowerCase().replace(/[^a-z]/, "");
          },
          include: [db.Image]
        }).then(function (data) {
          // console.log(data);

          obj.pokemon = [data];
          res.render("index", obj);

        });
      }).catch((err) => {
        console.log(err);

        var hbsObj = {};
        db.Pokemon.findOne({
          where: {
            indexedName: req.params.name
          },
          include: [db.Image]
        }).then((data) => {
          hbsObj.pokemon = [data];
          res.render("index", hbsObj)
        });
      });
    });
  });
}
