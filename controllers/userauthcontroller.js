let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let bcrypt = require('bcryptjs');

//EDIT USER: tested (but may need to mess with how it finds the user ID)
router.put('/edit', function (req, res) {
    let userdata = req.body.userdata;
    let email = req.body.user.email;
    let pass = req.body.user.password;
    let firstName = req.body.user.firstName;
    let lastName = req.body.user.lastName;
    let data = req.body.user.id;//this may need to be changed

    User.update({
        email: email,
        passwordHash: bcrypt.hashSync(pass, 10),
        firstName: firstName,
        lastName: lastName,
    }, { where: {id: data} }//this may need to be changed
    ).then(
        function updateSuccess(user) {
            res.json({
                userdata: userdata,
                message: 'User information updated.',
            });
        },
        function updateError(err) {
            res.send(500, err.message);
            console.log('--UPDATE USER ERROR--')
        }
    );
});


module.exports = router;