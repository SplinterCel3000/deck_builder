'use strict';

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
app.get('/collection', collectionRender);
app.get('/wish-list', wishListRender);
app.get('/error', errorRender);

app.post('/results', getCardInfo);

// API CALL
function getCardInfo(request, response) {
  let url = 'https://api.scryfall.com/cards/search?q='
  let searchCriteria = request.body.search;

  url += searchCriteria;

  superagent.get(url)
    .then(res => {

      let cardArray = res.body.data.map(card => {
        return new Cards(card)
      });
      let totalCardCount = (res.body.total_cards);
      response.render('pages/results', { cardArray: cardArray, totalCardCount: totalCardCount });
    })
    .catch(error => {
      console.log(error)
      // response.render('pages/error')
    })
}

// PAGE RENDER

function indexRender(request, response) {
  response.render('./pages/index')
}

function aboutUsRender(request, response) {
  response.render('./pages/about-us')
}

function resultsRender(request, response) {
  // CALL FOR A NEW Cards FROM API
  response.render('./pages/results')
}

function collectionRender(request, response) {
  response.render('./pages/collection')
}

function wishListRender(request, response) {
  response.render('./pages/wish-list')
}

function errorRender(request, response) {
  response.render('./pages/error')
}

// ERROR

app.use('*', (request, response) => {
  response.status(404).send('Page Not Found');
});

//CONSTRUCTOR for Magic cards

function Cards(cardObj) {
  this.name = cardObj.name || 'no name available';
  this.released = cardObj.released_at || 'no release date available';
  this.image_url = cardObj.image_uris ? (cardObj.image_uris.normal ? cardObj.image_uris.normal : (cardObj.image_uris.png ? cardObj.image_uris.png : placeHolderImage)) : placeHolderImage;

  this.legal = cardObj.legalities.standard || 'no legality available';
  this.legal1 = cardObj.legalities.pioneer || 'no legality available';
  this.legal2 = cardObj.legalities.modern || 'no legality available';
  this.legal3 = cardObj.legalities.legacy || 'no legality available';
  this.legal4 = cardObj.legalities.commander || 'no legality available';
  this.tag = cardObj.tag;
}

// SERVER LISTENER

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
