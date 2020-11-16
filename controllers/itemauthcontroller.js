let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Item = sequelize.import('../models/item');

//CREATE NEW ITEM: tested
router.post('/', function (req, res) {
    let userId = req.user.id;
    let itemName = req.body.itemdata.itemName;
    let itemDescription = req.body.itemdata.itemDescription;
    let price = req.body.itemdata.price;
    let quantity = req.body.itemdata.quantity;
    let photo1 = req.body.itemdata.photo1;
    let photo2 = req.body.itemdata.photo2;
    let photo3 = req.body.itemdata.photo3;
    let available = req.body.itemdata.available;

    Item.create({
        userID: userId,
        itemName: itemName,
        itemDescription: itemDescription,
        price: price,
        quantity: quantity,
        photo1: photo1,
        photo2: photo2,
        photo3: photo3,
        available: available
    }).then(
        function createSuccess(itemdata) {
            res.json({
                itemdata: itemdata
            });
        },
        function createError(err) {
            res.send(500, err.message);
            console.log('--CREATE ITEM ERROR--');
        }
    );
});

//EDIT EXISTING ITEM: tested, updates database but doesn't return updated data
router.put('/:id', function (req,res) {
    let userId = req.user.id;
    let itemName = req.body.itemdata.itemName;
    let itemDescription = req.body.itemdata.itemDescription;
    let price = req.body.itemdata.price;
    let quantity = req.body.itemdata.quantity;
    let photo1 = req.body.itemdata.photo1;
    let photo2 = req.body.itemdata.photo2;
    let photo3 = req.body.itemdata.photo3;
    let available = req.body.itemdata.available;
    let data = req.params.id;

    Item.update({
        userID: userId,
        itemName: itemName,
        itemDescription: itemDescription,
        price: price,
        quantity: quantity,
        photo1: photo1,
        photo2: photo2,
        photo3: photo3,
        available: available
    },
    { where: { id: data }}
    ).then(
        function updateSuccess(updatedItem) {
            res.json({
                itemdata: updatedItem
            });
        },
        function updateError(err) {
            res.send(500, err.message);
            console.log('--UPDATE ITEM ERROR--');
        }
    );
});

//DELETE EXISTING ITEM: tested
router.delete('/:id', function(req, res) {
    let data = req.params.id;
    let userID = req.user.id;

    Item.destroy({
        where: { id: data, userID: userID }
    }).then(
        function deleteItemSuccess(data) {
            res.send('You deleted an item.')
        },
        function deleteItemError(err) {
            res.send(500, err.message);
            console.log('--DELETE ITEM ERROR--');
        }
    );
});

module.exports = router;