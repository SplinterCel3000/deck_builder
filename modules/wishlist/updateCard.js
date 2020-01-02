'use strict';

const client = require('../client');

// UPDATE CARD FROM WISHLIST TO COLLECTION

function updateCard(request, response) {
  let { name } = request.body;
  let sql = `UPDATE cardtable SET tag='collection' WHERE name=$1;`;
  let safeValues = [name];
  client.query(sql, safeValues);
  response.redirect('/collection');
}

module.exports = updateCard;
