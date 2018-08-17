var db = require("../models");
var passport = require("../config/passport");

var findUserTeam = function (id) {
  return db.Team.findOne({
    where: {
      user_id: id
    }
  });
}

var createUserTeam = function (id, obj) {
  // console.log("attempted create user team");
  obj.user_id = id;

  // console.log(obj);
  return db.Team.create(obj);
}

var addToUserTeam = function (id, obj) {
  // console.log("attempted add to team");
  obj.user_id = id;

  // console.log("############")
  // console.log(obj);
  // console.log("##############")

  return db.Team.update(obj, {
    where: {
      user_id: id
    }
  });
}

module.exports = function (app) {
  
  // Get all Pokemon
  app.get("/api/pokemon", function(req, res) {
    db.Pokemon.findAll({
      include: [db.Image]
    }).then(function(data) {
      res.json(data);
    });
  });
  
  // Authentication
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json("/");
  });

  // Route for signing up a user
  app.post("/api/signup", function (req, res) {
    // console.log(req.body);
    db.User.create(req.body).then(function (data) {
      // console.log(data);
      createUserTeam(data.dataValues.id, {}).then(() => {
        res.redirect(307, "/api/login");
      });      
    }).catch(function (err) {
      // console.log(err);
      res.json(err);
     // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back null
      res.json(null);
    }
    else {
      let data = {
        email: req.user.email,
        id: req.user.id
      }
      res.json(data);
    }
  });

  // Saving a pokemon in a blue button
  app.post("/api/blueButton/", function (req, res) {
    // console.log("reached api")
    if (!req.user) {
      res.json(null);
    }

    let key = req.body.key;
    let val = req.body.id;

    let obj = {
      [key]: val
    }

    // console.log(key, val);
    // console.log(obj);

    findUserTeam(req.user.id).then((data) => {
      // console.log("attempted find user team")
      // console.log(data);
      if (!data) {
        createUserTeam(req.user.id, obj).then((data) => {
          res.json(data);
        });
      } else {
        addToUserTeam(req.user.id, obj).then((data) => {
          res.json(data);
        });
      }
    });
    
  });

  // Overwriting a pokemon in a blue button
  app.put("/api/blueButton/", function (req, res) { 
    // console.log(req.body);
    addToUserTeam(req.user.id, req.body).then((data) => {
      res.json(data);
    });
  });

  // Get a pokemon by name
  app.get("/api/pokemon/:name", function (req, res) {
    if (req.params.name === "nidoran") {
      // Solving the Nidoran edge case
      var coinToss = Math.floor(Math.random() * 2);
      if (coinToss === 0) {
        req.params.name = "nidoranf";
      } else {
        req.params.name = "nidoranm";
      }
    }
    // console.log("searching for " + req.params.name)

    db.Pokemon.findOne({
      where: {
        indexedName: req.params.name // .toLowerCase().replace(/[^a-z]/, "").replace(" ", "")
      },
      include: [db.Image]
    }).then(function (data) {
      // console.log(data.dataValues);
      res.json(data.dataValues);
    });
  });

  // Get a Pokemon by id
  app.get("/api/pokemon/:id", function (req, res) {
    db.Pokemon.findById(req.params.id, {
      include: [db.Image]
    }).then(function (data) {
      res.json(data);
    });
  });

};