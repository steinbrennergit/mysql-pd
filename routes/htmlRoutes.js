var db = require("../models");
// var passport = require("../config/passport");

var findUserTeam = function (id) {
  return db.Team.findOne({
    where: {
      user_id: id
    }
  });
}

var findTeamPokemon = function (data) {
  if (!data) {
    return null;
  }
  var listOfIds = [];
  for (key in data.dataValues) {
    if (key[0] === "p") {
      console.log(data.dataValues[key]);
      listOfIds.push(data.dataValues[key])
    }
  }
  return db.Pokemon.findAll({
    where: {
      id: listOfIds
    },
    include: [db.Image]
  })
}

var assembleTeamObject = function (data) {
  var obj = {};

  for (let i = 0; i < 10; i++) {
    let key = "p" + i;
    if (data[i]) {
      // console.log("not here");
      obj[key] = data[i].dataValues;
    } else {
      obj[key] = null;
    }
  }

  return obj;
}

module.exports = function (app) {

  // Load index page
  app.get("/", function (req, res) {
    if (!req.user) {
      return res.redirect("/signin");
    }
    // Need to get user's team to pass to render
    findUserTeam(req.user.id).then(findTeamPokemon).then((data) => {
      if (data) {
        var hbsObj = assembleTeamObject(data);
        res.render("index", hbsObj);
      } else {
        res.render("index");
      }

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

    findUserTeam(req.user.id).then(findTeamPokemon).then((data) => {
      var hbsObj = assembleTeamObject(data);
      // res.render("index", hbsObj);
      db.Pokemon.findOne({
        where: {
          indexedName: req.params.name // .toLowerCase().replace(/[^a-z]/, "");
        },
        include: [db.Image]
      }).then(function (data) {
        console.log(data);

        hbsObj.pokemon = [data];
        res.render("index", hbsObj);

      });
    });
  });
};
