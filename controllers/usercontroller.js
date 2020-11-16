let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

//REGISTER NEW USER: tested
router.post('/register', function (req, res) {
    let email = req.body.user.email;
    let pass = req.body.user.password;
    let firstName = req.body.user.firstName;
    let lastName = req.body.user.lastName;
    let username = req.body.user.username;
    let shopOwner = req.body.user.shopOwner;

    User.create({
        email: email,
        passwordHash: bcrypt.hashSync(pass, 10),
        firstName: firstName,
        lastName: lastName,
        username: username,
        shopOwner: shopOwner
    }).then(
        function createSuccess(user) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
            res.json({
                user: user,
                message: 'New user created.',
                sessionToken: token
            });
        },
        function createError(err) {
            res.send(500, err.message);
            console.log('--REGISTER USER ERROR--')
        }
    );
});

//LOGIN EXISTING USER: tested
router.post('/login', function (req, res) {
    User.findOne({ where: { email: req.body.user.email } })
        .then(
            function (user) {
                if (user) {
                    bcrypt.compare(req.body.user.password, user.passwordHash, function (err, matches) {
                        if (matches) {
                            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                            res.json({
                                user: user,
                                message: 'User successfully authenticated.',
                                sessionToken: token
                            });
                        } else {
                            res.status(502).send({ error: 'User sign in failed.' });
                        }
                    });
                } else {
                    res.status(500).send({ error: 'Failed to authenticate user.' });
                }
            },
            function (err) {
                res.status(501).send({ error: 'Failed to sign in user.' })
            }
        );
});

module.exports = router;