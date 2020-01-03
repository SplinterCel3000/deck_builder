'use strict';

const client = require('./client');

// DELETE ALL WISHLIST OR COLLECTION

function deleteAllFromTag(request, response) {
  let { tag } = request.body;
  let sql = 'DELETE FROM cardtable WHERE tag=$1;';
  let safeValues = [tag];
  client.query(sql, safeValues);
  let path = '/error';
  request.body.tag === 'wish-list' ? path = '/wish-list' : path = '/collection';
  response.redirect(path);
}

module.exports = deleteAllFromTag;
