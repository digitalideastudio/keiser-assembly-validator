'use strict';
const users = require('../data/users');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
