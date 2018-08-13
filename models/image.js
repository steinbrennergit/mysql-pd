module.exports = function (sequelize, DataTypes) {
  var Image = sequelize.define("Image", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Pokemon,
        key: "id"
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Image;
};