let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Shop = sequelize.import('../models/shop');

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

module.exports = router;