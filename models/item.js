module.exports = function (sequelize, DataTypes) {
    return sequelize.define('item', {
        userID: DataTypes.INTEGER,
        itemName: DataTypes.STRING,
        itemDescription: DataTypes.TEXT, //was STRING
        price: DataTypes.DECIMAL(10,2), //was INTEGER
        quantity: DataTypes.INTEGER,
        photo1: DataTypes.STRING,
        photo2: DataTypes.STRING,
        photo3: DataTypes.STRING,
        available: DataTypes. BOOLEAN
    });
};
