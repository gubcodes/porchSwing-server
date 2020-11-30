let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Shop = sequelize.import('../models/shop');

//CREATE NEW SHOP: tested
router.post('/', function (req, res) {
    let userID = req.user.id;
    let shopName = req.body.shopdata.shopName;
    let payName = req.body.shopdata.payName;
    let shopDescription = req.body.shopdata.shopDescription;
    let logo = req.body.shopdata.logo;
    let color1 = req.body.shopdata.color1;
    let color2 = req.body.shopdata.color2;
    let color3 = req.body.shopdata.color3;
    let open = req.body.shopdata.open;

    Shop.create({
        userID: userID,
        shopName: shopName,
        payName: payName,
        shopDescription: shopDescription,
        logo: logo,
        color1: color1,
        color2: color2,
        color3: color3,
        open: open
    }).then(
        function createSuccess(shopdata) {
            res.json({
                shopdata: shopdata
            });
        },
        function createError(err) {
            res.send(500, err.message);
            console.log('--CREATE SHOP ERROR--');
        }
    );
});

//EDIT EXISTING SHOP: tested, doesn't return json item data
router.put('/', function(req, res) {
    let userID = req.user.id;
    let shopName = req.body.shopdata.shopName;
    let payName = req.body.shopdata.payName;
    let shopDescription = req.body.shopdata.shopDescription;
    let logo = req.body.shopdata.logo;
    let color1 = req.body.shopdata.color1;
    let color2 = req.body.shopdata.color2;
    let color3 = req.body.shopdata.color3;
    let open = req.body.shopdata.open;

    Shop.update({
        userID: userID,
        shopName: shopName,
        payName: payName,
        shopDescription: shopDescription,
        logo: logo,
        color1: color1,
        color2: color2,
        color3: color3,
        open: open
    },
    {where: { userID: userID }}
    ).then(
        function updateSuccess(shopdata) {
            res.json({
                shopdata: shopdata
            });
        },
        function updateError(err) {
            res.send(500, err.message);
            console.log('--UPDATE SHOP ERROR--');
        }
    );
});

//EDIT SHOP ADD LOGO
router.patch('/', function(req, res) {
    let data = req.user.id;
    // let shopName = req.body.shopdata.shopName;
    // let payName = req.body.shopdata.payName;
    // let shopDescription = req.body.shopdata.shopDescription;
    let logo = req.body.shopdata.logo;
    // let color1 = req.body.shopdata.color1;
    // let color2 = req.body.shopdata.color2;
    // let color3 = req.body.shopdata.color3;
    // let open = req.body.shopdata.open;
    var shopdata = req.body.shopdata;

    Shop.update({
        // userID: userID,
        // shopName: shopName,
        // payName: payName,
        // shopDescription: shopDescription,
        logo: logo,
        // color1: color1,
        // color2: color2,
        // color3: color3,
        // open: open
    },
    {where: { userID: data }}
    ).then(
        function updateSuccess(updateshopdata) {
            console.log('logo updated')
            res.json({
                shopdata: shopdata,
                message: 'Logo successfully updated.'
            });
        },
        function updateError(err) {
            res.send(500, err.message);
            console.log('--UPDATE SHOP ERROR--');
        }
    );
});

//EDIT SHOP FLIP THE SIGN
router.patch('/flip', function(req, res) {
    let data = req.user.id;
    // let shopName = req.body.shopdata.shopName;
    // let payName = req.body.shopdata.payName;
    // let shopDescription = req.body.shopdata.shopDescription;
    // let logo = req.body.shopdata.logo;
    // let color1 = req.body.shopdata.color1;
    // let color2 = req.body.shopdata.color2;
    // let color3 = req.body.shopdata.color3;
    let open = req.body.shopdata.open;
    var shopdata = req.body.shopdata;

    Shop.update({
        // userID: userID,
        // shopName: shopName,
        // payName: payName,
        // shopDescription: shopDescription,
        // logo: logo,
        // color1: color1,
        // color2: color2,
        // color3: color3,
        open: open
    },
    {where: { userID: data }}
    ).then(
        function updateSuccess(updateshopdata) {
            console.log('status updated')
            res.json({
                shopdata: shopdata,
                message: 'you flipped the sign.'
            });
        },
        function updateError(err) {
            res.send(500, err.message);
            console.log('--UPDATE SHOP ERROR--');
        }
    );
});

//GET SHOP BY USERID FROM TOKEN
router.get('/', function(req, res) {
    // let data = req.params.id;
    let data = req.user.id; //this may need to change, what about others pulling up the shop?

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

//DELETE EXISTING SHOP: tested
router.delete('/', function(req, res) {
    // let data = req.params.id;
    let userID = req.user.id;

    Shop.destroy({
        where: { userID: userID }
    }).then(
        function deleteShopSuccess(data) {
            res.send('You deleted your shop.')
        },
        function deleteShopError(err) {
            res.send(500, err.message);
            console.log('--DELETE SHOP ERROR--')
        }
    );
});

module.exports = router;