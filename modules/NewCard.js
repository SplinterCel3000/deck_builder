'use strict';

const placeHolderImage = 'https://i.stack.imgur.com/787gj.png';


// CONSTRUCTOR FOR CARDS w/ UNDERSCORE CLEANER FUNCTION

function NewCard(cardObj) {
  this.name = cardObj.name || 'no name available';
  this.date = cardObj.released_at || 'no release date available';
  this.image_url = cardObj.image_uris ? (cardObj.image_uris.normal ? cardObj.image_uris.normal : (cardObj.image_uris.png ? cardObj.image_uris.png : placeHolderImage)) : placeHolderImage;
  this.legal0 = legalCleaner(cardObj.legalities.standard) || 'no legality available';
  this.legal1 = legalCleaner(cardObj.legalities.pioneer) || 'no legality available';
  this.legal2 = legalCleaner(cardObj.legalities.modern) || 'no legality available';
  this.legal3 = legalCleaner(cardObj.legalities.legacy) || 'no legality available';
  this.legal4 = legalCleaner(cardObj.legalities.commander) || 'no legality available';
  this.tag = cardObj.tag;
}

function legalCleaner(str) {
  var regex = /_/gi;
  return str.includes('_') ? str.replace(regex, ' ') : str;
}

module.exports = NewCard;
