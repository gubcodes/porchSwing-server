let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Shop = sequelize.import('../models/shop');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//GET SHOP BY USERID: tested
router.get('/:id', function(req, res) {
    let data = req.params.id;
    // let userID = req.user.id; //this may need to change, what about others pulling up the shop?

    Shop.findOne({
        where: { userID: data }
    }).then(
        function findOneSuccess(data) {
            res.json(data);
        },
        function findOneError(err) {
            res.send(500, err.message);
            console.log('--GET SHOP ERROR--')
        }
    );
});

//GET SHOPS BY QUERY
router.get('/search/:id', function(req, res) {
    const shopName = req.params.id;
    var condition = shopName ? { [Op.iLike]: `%${shopName}%`} : null;
    var condition2 = shopName ? { [Op.iLike]: `%${shopName}%`} : null;

    Shop.findAll({
        where: {
            [Op.or]: [
            {shopName: condition},
            {shopDescription: condition2}
            ],
            open: true
        }
    }).then(
        function findOneSuccess(data) {
            res.json(data);
        },
        function findOneError(err) {
            res.send(500, err.message);
            console.log('--GET SHOPS QUERY ERROR--');
        }
    );
});

module.exports = router;