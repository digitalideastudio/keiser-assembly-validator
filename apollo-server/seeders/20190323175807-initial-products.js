'use strict';
const Sequelize = require('sequelize');
const products = require('../data/products');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('products', products, {}, { parts: { type: new Sequelize.JSON() } });
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('products', null, {});
  },
};
