require('dotenv').config();

let express = require('express');
let app = express();
let user = require('./controllers/usercontroller');
let shop = require('./controllers/shopcontroller');
let item = require('./controllers/itemcontroller');
let chatauth = require('./controllers/chatcontroller');
let userauth = require('./controllers/userauthcontroller');
let itemauth = require('./controllers/itemauthcontroller');
let shopauth = require('./controllers/shopauthcontroller');
let cartauth = require('./controllers/cartcontroller');
let sequelize = require('./db');

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
app.use('/cartauth', cartauth);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
});