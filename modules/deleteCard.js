'use strict';

const client = require('./client');

// DELETE CARD FROM WISHLIST OR COLLECTION

function deleteCard(request, response) {
  let { name } = request.body;
  let sql = 'DELETE FROM cardtable WHERE name=$1;';
  let safeValues = [name];
  client.query(sql, safeValues);
  let path = '/error';
  request.body.tag === 'wish-list' ? path = '/wish-list' : path = '/collection';
  response.redirect(path);
}

module.exports = deleteCard;
