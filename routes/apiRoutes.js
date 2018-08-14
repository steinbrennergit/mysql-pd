var db = require("../models");

module.exports = function (app) {
  /*
  // Get all Pokemon
  app.get("/api/pokemon", function(req, res) {
    db.Pokemon.findAll({
      include: [db.Image]
    }).then(function(data) {
      res.json(data);
    });
  });
  */

  
  // Get a pokemon by name
  app.get("/api/pokemon/:name", function(req, res) {
    db.Pokemon.findOne({
      where: {
        indexedName: req.params.name // .toLowerCase().replace(/[^a-z]/, "");
      }
    }).then(function(data) {
      res.json(data);
    });
  });
  

  
  // Get a Pokemon by id
  app.get("/api/pokemon/:id", function(req, res) {
    db.Pokemon.findById(req.params.id, {
      include: [db.Image]
    }).then(function(data) {
      res.json(data);
    });
  });
  
};