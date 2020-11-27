const { STRING } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('chat', {
        senderUserID: DataTypes.INTEGER,
        senderUserName: DataTypes.STRING,
        receiverUserID: DataTypes.INTEGER,
        receiverUserName: STRING,
        subject: DataTypes.STRING,
        message: DataTypes.TEXT, //was STRING
        read: DataTypes.BOOLEAN
    });
};
