module.exports = function (sequelize, DataTypes) {
  var Image = sequelize.define("Image", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Image.associate = function(models) {
    Image.belongsTo(models.Pokemon, {
      foreignKey: "id"
    });
  };

  return Image;
};