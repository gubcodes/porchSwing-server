module.exports = function (sequelize, DataTypes) {
    return sequelize.define('cart', {
        userID: DataTypes.INTEGER,
        itemID: DataTypes.INTEGER,
        shopUserID: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        purchased: DataTypes. BOOLEAN
    });
};