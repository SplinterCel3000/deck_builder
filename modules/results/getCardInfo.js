'use strict';

const superagent = require('superagent');
const NewCard = require('../NewCard');

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
      response.render('pages/results', { resultsArray: resultsArray, totalCardCount: totalCardCount, searchCriteria: searchCriteria });
    })
    .catch(error => {
      console.log(`results page error: ${error}`);
      response.render('pages/error', { error: error });
    });
}

module.exports = getCardInfo;
