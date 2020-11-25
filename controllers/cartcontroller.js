let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Cart = sequelize.import('../models/chat');

//GET ALL CART ITEMS BY USERID:
router.get('/', function (req, res) {
    let userID = req.user.id;

    Cart.findAll({
        where: { userID: userID }
    }).then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
            console.log('--GET CART ERROR--')
        }
    );
});

//ADD ITEM TO CART
router.post('/', function (req, res) {
    let userID = req.user.id;
    let itemID = req.body.cartdata.itemID;
    let shopUserID = req.body.cartdata.shopUserID;
    let quantity = req.body.cartdata.quantity;

    Cart.create({
        userID: userID,
        itemID: itemID,
        shopUserID: shopUserID,
        quantity: quantity
    }).then(
        function createSuccess(chatdata) {
            res.json({
                cartdata: cartdata
            });
        },
        function createError(err) {
            res.send(500, err.message);
            console.log('--ADD TO CART ERROR--')
        }
    );
});

//DELETE ITEM FROM CART
router.delete('/:id', function(req, res) {
    let userID = req.user.id;
    let cartItemID = req.params.id;

    Cart.destroy({
        where: { id: cartItemID, userID: userID }
    }).then(
        function deleteCartItemSuccess(data) {
            res.send('You removed a piece from your bag.')
        },
        function deleteCartItemError(err) {
            res.send(500, err.message);
            console.log('--REMOVE ITEM ERROR--');
        }
    );
});

module.export = router;