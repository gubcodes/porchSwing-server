let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Item = sequelize.import('../models/item');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

//GET ITEMS BY QUERY tested
router.get('/search/:id', function(req, res) {
    const itemName = req.params.id;
    var condition = itemName ? { [Op.iLike]: `%${itemName}%`} : null;

    Item.findAll({
        where: {
            itemName: condition,
            available: true
        } 
    }).then(
        function findOneSuccess(data) {
            res.json(data);
        },
        function findOneError(err) {
            res.send(500, err.message);
            console.log('--GET ITEMS QUERY ERROR--');
        }
    );
});

module.exports = router;