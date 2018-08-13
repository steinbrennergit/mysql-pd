module.exports = function(sequelize, DataTypes) {
  var Pokemon = sequelize.define("Pokemon", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Pokemon;
};
