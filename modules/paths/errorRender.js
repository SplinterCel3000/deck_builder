'use strict';

function errorRender(request, response) {
  response.render('pages/error');
}

module.exports = errorRender;
