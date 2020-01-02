'use strict';

const client = require('./client');

// ADD CARD TO COLLECTION

function addCardCollection(request, response) {
  let { name, date, image_url, legal0, legal1, legal2, legal3, legal4, tag } = request.body;
  let sql = 'INSERT INTO cardtable (name, date, image_url, legal0, legal1, legal2, legal3, legal4, tag) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);';
  let safeValues = [name, date, image_url, legal0, legal1, legal2, legal3, legal4, tag];
  client.query(sql, safeValues);
  response.redirect('/collection');
}

module.exports = addCardCollection;
