let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Chat = sequelize.import('../models/chat');

//GET ALL INBOX MESSAGES BY USERID: tested
router.get('/inbox', function (req, res) {
    let userID = req.user.id;

    Chat.findAll({
        where: { receiverUserID: userID }
    }).then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
            console.log('--GET ALL MESSAGES ERROR--');
        }
    );
});

//GET ALL OUTBOX MESSAGES BY USERID: tested
router.get('/outbox', function (req, res) {
    let userID = req.user.id;

    Chat.findAll({
        where: { senderUserID: userID }
    }).then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
            console.log('--GET ALL MESSAGES ERROR--');
        }
    );
});

//GET SINGLE INBOX MESSAGE BY MESSAGEID (may not use) not tested
router.get('/:id', function(req, res) {
    let data = req.params.id;
    let userID = req.user.id;

    Chat.findOne({
        where: { id: data, receiverUserID: userID }
    }).then(
        function findOneSuccess(data) {
            res.json(data);
        },
        function findOneError(err) {
            res.send(500, err.message);
            console.log('--GET MESSAGE ERROR--');
        }
    );
});

//CREATE NEW MESSAGE: tested
router.post('/', function (req, res) {
    let senderUserID = req.user.id;
    let receiverUserID = req.body.chatdata.receiverUserID;
    let message = req.body.chatdata.message;
    let read = req.body.chatdata.read;

    Chat.create({
        senderUserID: senderUserID,
        receiverUserID: receiverUserID,
        message: message,
        read: read
    }).then(
        function createSuccess(chatdata) {
            res.json({
                chatdata: chatdata
            });
        },
        function createError(err) {
            res.send(500, err.message);
            console.log('--CREATE MESSAGE ERROR--')
        }
    );
});

//EDIT EXISTING MESSAGE BY MESSAGE ID (MAY NOT USE): not tested
router.put('/:id', function (req, res) {
    let senderUserID = req.user.id;
    let receiverUserID = req.body.chatdata.receiverUserID;
    let message = req.body.chatdata.message;
    let read = req.body.chatdata.read;

    Chat.update({
        senderUserID: senderUserID,
        receiverUserID: receiverUserID,
        message: message,
        read: read
    },
    { where: { id: data}}
    ).then(
        function updateSuccess(chatdata) {
            res.json({
                chatdata: chatdata
            });
        },
        function updateError(err) {
            res.send(500, err.message);
            console.log('--UPDATE MESSAGE ERROR--')
        }
    );
});

//DELETE SINGLE MESSAGE BY MESSAGEID: not tested
router.delete('/:id', function(req, res) {
    let data = req.params.id;
    let userID = req.user.id;

    Chat.destroy({
        where: { id: data, receiverUserID: userID }
    }).then(
        function deleteChatSuccess(data) {
            res.send('You deleted a message.')
        },
        function deleteMessageError(err) {
            res.send(500, err.message);
            console.log('--DELETE MESSAGE ERROR--');
        }
    );
});

module.exports = router;