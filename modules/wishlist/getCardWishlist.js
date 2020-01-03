'use strict';

const client = require('../client');

// CARD WITH WISHLIST TAG CALL FROM DATABASE

function getCardWishlist(request, response) {
  let sql = `SELECT * FROM cardtable WHERE tag = 'wish-list' ORDER BY id DESC;`;

  client.query(sql)
    .then(results => {
      response.render('pages/wish-list', { wishlistArray: results.rows });
    })
    .catch(error => {
      console.log(`card wish-list error: ${error}`);
      response.render('pages/error', { error: error });
    });
}

module.exports = getCardWishlist;
