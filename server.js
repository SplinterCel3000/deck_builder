'use strict';

const express = require('express');
const app = express();
require('ejs');
require('dotenv').config();

const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
const superagent = require('superagent');
const methodOverride = require('method-override');

const PORT = process.env.PORT || 3001;

const placeHolderImage = 'https://i.stack.imgur.com/787gj.png';

client.on('error', (error) => console.log(error));

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded());
app.use(methodOverride('_method'));

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

app.put('/update', updateCard);
app.delete('/delete', deleteCard);
app.delete('/deleteAll', deleteAllFromTag);

// PAGE RENDERING

function indexRender(request, response) {
  response.render('pages/index');
}

function aboutUsRender(request, response) {
  response.render('pages/about-us');
}

function resultsRender(request, response) {
  response.render('pages/results');
}

function errorRender(request, response) {
  response.render('pages/error');
}

// RESULTS PAGE RENDER FROM API

function getCardInfo(request, response) {
  let url = 'https://api.scryfall.com/cards/search?q=';
  let searchCriteria = request.body.search;
  url += searchCriteria;

  superagent.get(url)
    .then(res => {
      let resultsArray = res.body.data.map(cardData => {
        return new NewCard(cardData);
      });
      let totalCardCount = (res.body.total_cards);
      response.render('pages/results', { resultsArray: resultsArray, totalCardCount: totalCardCount });
    })
    .catch(error => {
      console.log(`results page error: ${error}`);
      response.render('pages/error', { error: error });
    })
}

// CARD WITH COLLECTION TAG CALL FROM DATABASE

function getCardCollection(request, response) {
  let sql = `SELECT * FROM cardtable WHERE tag = 'collection' ORDER BY id DESC;`;

  client.query(sql)
    .then(results => {
      response.render('pages/collection', { collectionArray: results.rows });
    })
    .catch(error => {
      console.log(`card collection error: ${error}`);
      response.render('pages/error', { error: error });
    })
}

// CARD WITH WISHLIST TAG CALL FROM DATABASE

// && name="%INPUT_STR%"

function getCardWishlist(request, response) {
  let sql = `SELECT * FROM cardtable WHERE tag = 'wish-list'ORDER BY id DESC;`;

  client.query(sql)
    .then(results => {
      response.render('pages/wish-list', { wishlistArray: results.rows });
    })
    .catch(error => {
      console.log(`card wish-list error: ${error}`);
      response.render('pages/error', { error: error });
    })
}

// ADD CARD TO COLLECTION

function addCardCollection(request, response) {
  let { name, date, image_url, legal0, legal1, legal2, legal3, legal4, tag } = request.body;
  let sql = 'INSERT INTO cardtable (name, date, image_url, legal0, legal1, legal2, legal3, legal4, tag) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);';
  let safeValues = [name, date, image_url, legal0, legal1, legal2, legal3, legal4, tag];
  client.query(sql, safeValues);
  response.redirect('/collection');
}

// ADD CARD TO WISHLIST

function addCardWishlist(request, response) {
  let { name, date, image_url, legal0, legal1, legal2, legal3, legal4, tag } = request.body;
  let sql = 'INSERT INTO cardtable (name, date, image_url, legal0, legal1, legal2, legal3, legal4, tag) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);';
  let safeValues = [name, date, image_url, legal0, legal1, legal2, legal3, legal4, tag];
  client.query(sql, safeValues);
  response.redirect('/wish-list');
}

// UPDATE CARD FROM WISHLIST TO COLLECTION

function updateCard(request, response) {
  let { name } = request.body;
  let sql = `UPDATE cardtable SET tag='collection' WHERE name=$1;`;
  let safeValues = [name];
  client.query(sql, safeValues);
  response.redirect('/collection');
}

// DELETE CARD FROM WISHLIST OR COLLECTION

function deleteCard(request, response) {
  let { name } = request.body;
  let sql = 'DELETE FROM cardtable WHERE name=$1;';
  let safeValues = [name];
  client.query(sql, safeValues);
  let path = '/error';
  console.log(request.body);
  request.body.tag === 'wish-list' ? path = '/wish-list' : path = '/collection';
  response.redirect(path);
}

// DELETE ALL WISHLIST OR COLLECTION

function deleteAllFromTag(request, response) {
  let { tag } = request.body;
  let sql = 'DELETE FROM cardtable WHERE tag=$1;';
  let safeValues = [tag];
  client.query(sql, safeValues);
  console.log(request.body);
  let path = '/error';
  request.body.tag === 'wish-list' ? path = '/wish-list' : path = '/collection';
  response.redirect(path);
}

// SOFT SEARCH ON WISHLIST OR COLLECTION

// function softSearchByName(request, body) {

// }

// ERROR

app.use('*', (request, response) => {
  response.status(404).send('ERR 404: Page Not Found');
});

// CONSTRUCTOR FOR CARDS w/ UNDERSCORE CLEANER FUNCTION

function NewCard(cardObj) {
  this.name = cardObj.name || 'no name available';
  this.date = cardObj.released_at || 'no release date available';
  this.image_url = cardObj.image_uris ? (cardObj.image_uris.normal ? cardObj.image_uris.normal : (cardObj.image_uris.png ? cardObj.image_uris.png : placeHolderImage)) : placeHolderImage;
  this.legal0 = legalCleaner(cardObj.legalities.standard) || 'no legality available';
  this.legal1 = legalCleaner(cardObj.legalities.pioneer) || 'no legality available';
  this.legal2 = legalCleaner(cardObj.legalities.modern) || 'no legality available';
  this.legal3 = legalCleaner(cardObj.legalities.legacy) || 'no legality available';
  this.legal4 = legalCleaner(cardObj.legalities.commander) || 'no legality available';
  this.tag = cardObj.tag;
}

function legalCleaner(str) {
  var regex = /_/gi;
  return str.includes('_') ? str.replace(regex, ' ') : str;
}

// SERVER LISTENER

client.connect(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
