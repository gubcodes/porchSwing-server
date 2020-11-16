module.exports = function (sequelize, DataTypes) {
    return sequelize.define('shop', {
        userID: {
            type: DataTypes.INTEGER,
            unique: true
        },
        shopName: {
            type: DataTypes.STRING,
            unique: true
        },
        payName: DataTypes.STRING,
        shopDescription: DataTypes.TEXT, //was STRING
        logo: DataTypes.STRING,
        color1: DataTypes.STRING,
        color2: DataTypes.STRING,
        color3: DataTypes.STRING,
        open: DataTypes.BOOLEAN
    });
};
