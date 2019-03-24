'use strict';
const products = require('../data/products');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Products', products, {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Products', null, {});
  },
};
