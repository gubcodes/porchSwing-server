module.exports = function (sequelize, DataTypes) {
    return sequelize.define('chat', {
        senderUserID: DataTypes.INTEGER,
        receiverUserID: DataTypes.INTEGER,
        message: DataTypes.TEXT, //was STRING
        read: DataTypes.BOOLEAN
    });
};
