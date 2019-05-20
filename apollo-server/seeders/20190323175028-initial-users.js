'use strict';
const users = require('../data/users');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', users, {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
