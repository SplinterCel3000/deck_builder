'use strict';

const client = require('../client');

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
    });
}

module.exports = getCardCollection;
