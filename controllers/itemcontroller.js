let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Item = sequelize.import('../models/item');

//GET ALL ITEMS BY USERID: tested
router.get('/all/:id', function (req, res) {
    // let userID = req.user.id;
    let data = req.params.id;

    Item.findAll({
        where: { userID: data }
    }).then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
            console.log('--GET ALL ITEMS ERROR--');
        }
    );
});

//GET SINGLE ITEM BY ID: tested
router.get('/:id', function(req, res) {
    let data = req.params.id;
    // let userID = req.user.id;

    Item.findOne({
        where: { id: data }
    }).then(
        function findOneSuccess(data) {
            res.json(data);
        },
        function findOneError(err) {
            res.send(500, err.message);
            console.log('--GET ITEM ERROR--');
        }
    );
});

module.exports = router;