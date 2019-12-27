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
  let cardSearch = request.body;
  let searchCriteria = request.body.search;

  // if (cardSearch === 'name') {
  //   url += `+inname:${searchCriteria}`
  // }

  url += searchCriteria;
  console.log(url)
  superagent.get(url)
    .then(res => {
      console.log(res.body)
      let cardArray = res.body.data.map(card => {
        return new Cards(card)
      });
      response.render('pages/results', { cardArray: cardArray });
    })
    .catch(error => {
      // response.render('pages/error')
      console.log(error)
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
  this.name = cardObj.name;
  this.released = cardObj.released_at;
  this.image_url = cardObj.image_uris.normal;
  this.legal = cardObj.legalities.standard;
  this.legal1 = cardObj.legalities.pioneer;
  this.legal2 = cardObj.legalities.modern;
  this.legal3 = cardObj.legalities.legacy;
  this.legal4 = cardObj.legalities.commander;
  this.tag = cardObj.tag;
}

// SERVER LISTENER

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
