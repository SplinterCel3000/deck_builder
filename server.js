'use strict';

// LINK DATABASE TO HEROKU

const express = require('express');
const app = express();
require('ejs');
require('dotenv').config();

const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
const superagent = require('superagent');
// const methodOverride = require('method-override');

const PORT = process.env.PORT || 3001;

const placeHolderImage = 'https://i.stack.imgur.com/787gj.png';

client.on('error', (error) => console.log(error));

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded());
// app.use(methodOverride('_method'));

// ROUTES

app.get('/', indexRender);
app.get('/about-us', aboutUsRender);
app.get('/results', resultsRender);

app.get('/error', errorRender);

app.post('/results', getCardInfo);

app.get('/collection', getCardCollection);
app.post('/collection', addCardCollection);

app.get('/wish-list', getCardWishlist);
app.post('/wish-list', addCardWishlist);

// RESULTS PAGE RENDER from API

function getCardInfo(request, response) {
  let url = 'https://api.scryfall.com/cards/search?q=';
  let searchCriteria = request.body.search;

  url += searchCriteria;

  superagent.get(url)
    .then(res => {
      let cardArray = res.body.data.map(card => {
        return new Cards(card);
      });
      let totalCardCount = (res.body.total_cards);
      response.render('pages/results', { cardArray: cardArray, totalCardCount: totalCardCount });
    })
    .catch(error => {
      console.log(error);
      response.render('pages/error');
    })
}

// PAGE RENDER

function indexRender(request, response) {
  response.render('./pages/index');
}

function aboutUsRender(request, response) {
  response.render('./pages/about-us');
}

function resultsRender(request, response) {
  response.render('./pages/results');
}

function errorRender(request, response) {
  response.render('./pages/error');
}

// CARD COLLECTION CALL

function getCardCollection(request, response) {
  let sql = `SELECT * FROM collection WHERE tag = 'collection';`;

  client.query(sql)
    .then(results => {
      response.render('pages/collection', { cardArrCollection: results.rows });
    })

    .catch((error) => console.log(error));
}

// ADD CARD TO COLLECTION

function addCardCollection(request, response) {
  let { name, date, image_url, legal0, legal1, legal2, legal3, legal4, tag } = request.body;
  let sql = 'INSERT INTO collection (name, date, image_url, legal0, legal1, legal2, legal3, legal4, tag) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);';
  let safeValues = [name, date, image_url, legal0, legal1, legal2, legal3, legal4, tag];
  client.query(sql, safeValues);
  response.redirect('/collection');
}

// CARD WISHLIST CALL

function getCardWishlist(request, response) {
  let sql = `SELECT * FROM collection WHERE tag = 'wishlist';`;

  client.query(sql)
    .then(results => {
      response.render('pages/wish-list', { cardArrwishlist: results.rows });
    })

    .catch((error) => console.log(error));
}

// ADD CARD TO WISHLIST

function addCardWishlist(request, response) {
  let { name, date, image_url, legal0, legal1, legal2, legal3, legal4, tag } = request.body;
  let sql = 'INSERT INTO collection (name, date, image_url, legal0, legal1, legal2, legal3, legal4, tag) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);';
  let safeValues = [name, date, image_url, legal0, legal1, legal2, legal3, legal4, tag];
  client.query(sql, safeValues);
  response.redirect('/wish-list');
}

// ERROR

app.use('*', (request, response) => {
  response.status(404).send('Page Not Found');
});

// CONSTRUCTOR FOR CARDS

function Cards(cardObj) {
  this.name = cardObj.name || 'no name available';
  this.date = cardObj.released_at || 'no release date available';
  this.image_url = cardObj.image_uris ? (cardObj.image_uris.normal ? cardObj.image_uris.normal : (cardObj.image_uris.png ? cardObj.image_uris.png : placeHolderImage)) : placeHolderImage;
  this.legal0 = cardObj.legalities.standard || 'no legality available';
  this.legal1 = cardObj.legalities.pioneer || 'no legality available';
  this.legal2 = cardObj.legalities.modern || 'no legality available';
  this.legal3 = cardObj.legalities.legacy || 'no legality available';
  this.legal4 = cardObj.legalities.commander || 'no legality available';
  this.tag = cardObj.tag;
}

// SERVER LISTENER

client.connect(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
