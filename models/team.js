module.exports = function (sequelize, DataTypes) {
    var Team = sequelize.define("Team", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        p0: {
            type: DataTypes.INTEGER
        },
        p1: {
            type: DataTypes.INTEGER
        },
        p2: {
            type: DataTypes.INTEGER
        },
        p3: {
            type: DataTypes.INTEGER
        },
        p4: {
            type: DataTypes.INTEGER
        },
        p5: {
            type: DataTypes.INTEGER
        },
        p6: {
            type: DataTypes.INTEGER
        },
        p7: {
            type: DataTypes.INTEGER
        },
        p8: {
            type: DataTypes.INTEGER
        },
        p9: {
            type: DataTypes.INTEGER
        }
    }, {
            timestamps: false
        });

    Team.associate = function (models) {
        Team.belongsTo(models.User, { foreignKey: "user_id" });
    }

    return Team;
};