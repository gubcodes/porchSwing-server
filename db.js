const Sequelize = require('sequelize');

const sequelize = new Sequelize('porchswing', 'postgres', 'whatevenisapassword', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('connected to porchswing postgres database');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;