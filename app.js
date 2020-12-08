require('dotenv').config();

let express = require('express');
let app = express();
let user = require('./controllers/usercontroller');
let shop = require('./controllers/shopcontroller');
let item = require('./controllers/itemcontroller');
let chatauth = require('./controllers/chatcontroller');
let cartauth = require('./controllers/cartcontroller');
let userauth = require('./controllers/userauthcontroller');
let itemauth = require('./controllers/itemauthcontroller');
let shopauth = require('./controllers/shopauthcontroller');
let sequelize = require('./db');

//STRIPE:
// // Set your secret key. Remember to switch to your live secret key in production!
// // See your keys here: https://dashboard.stripe.com/account/apikeys
// const stripe = require('stripe')('pk_test_51HqtlNFbOjNmnOEQhozxFoJLw3EZVhYKDtEMQo6Exmx5XgO3zp4cxscik7FHjkM8SdbKyoz78YIlIXr28VVL8hVW00jRKXb2Jm');

// const paymentIntent = await stripe.paymentIntents.create({
//   amount: 1099,
//   currency: 'usd',
//   // Verify your integration in this guide by including this parameter
//   metadata: {integration_check: 'accept_a_payment'},
// });

sequelize.sync({force: true}); // don't forget: {force: true} for resetting tables

app.use(express.json());
app.use(require('./middleware/headers'));

//EXPOSED ROUTES:
app.use('/user', user); //TESTED
app.use('/item', item); //TESTED
app.use('/shop', shop); //TESTED

app.use(require('./middleware/validate-session'));

//PROTECTED ROUTES:
app.use('/userauth', userauth); //TESTED
app.use('/itemauth', itemauth); //TESTED
app.use('/shopauth', shopauth); //TESTED
app.use('/chatauth', chatauth); //TESTED
app.use('/cartauth', cartauth); //

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
});