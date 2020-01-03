'use strict';

const express = require('express');
const app = express();
require('ejs');
require('dotenv').config();

const methodOverride = require('method-override');

const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded());
app.use(methodOverride('_method'));

// MODULES

const client = require('./modules/client');
const getCardCollection = require('./modules/collection/getCardCollection');
const addCardCollection = require('./modules/addCardCollection');
const addCardWishlist = require('./modules/results/addCardWishlist');
const getCardInfo = require('./modules/results/getCardInfo');
const getCardWishlist = require('./modules/wishlist/getCardWishlist');
const updateCard = require('./modules/wishlist/updateCard');
const deleteCard = require('./modules/deleteCard');
const deleteAllFromTag = require('./modules/deleteAllFromTag');
const indexRender = require('./modules/paths/indexRender');
const aboutUsRender = require('./modules/paths/aboutUsRender');
const resultsRender = require('./modules/paths/resultsRender');
const errorRender = require('./modules/paths/errorRender');

// ROUTES

app.get('/', indexRender);
app.get('/about-us', aboutUsRender);

app.get('/error', errorRender);

app.get('/results', resultsRender);
app.post('/results', getCardInfo);

app.get('/collection', getCardCollection);
app.post('/collection', addCardCollection);

app.get('/wish-list', getCardWishlist);
app.post('/wish-list', addCardWishlist);

app.put('/update', updateCard);
app.delete('/delete', deleteCard);
app.delete('/deleteAll', deleteAllFromTag);

// ERROR

app.use('*', (request, response) => {
  response.status(404).send('ERR 404: Page Not Found');
});

// SERVER LISTENER

client.connect(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
