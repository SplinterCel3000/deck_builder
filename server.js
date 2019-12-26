'use strict';

const express = require('express');
const app = express();
require('ejs');
require('dotenv').config();

const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
// const superagent = require('superagent');
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

// PAGE RENDER

function indexRender(request, response) {
  response.render('./pages/index')
}

function aboutUsRender(request, response) {
  response.render('./pages/about-us')
}

function resultsRender(request, response) {
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


//Constructor for Magic cards

function Cards(cardObj) {
  this.name
  this.released
  this.image
}

// SERVER LISTENER

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
