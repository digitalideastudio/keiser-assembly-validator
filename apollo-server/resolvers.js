import { PART_DUPLICATE, PART_ERROR_SCRIPT, PART_INVALID, SERIAL_OK, SERIAL_OK_SCRIPT } from '../src/store/constants';
import request from 'request';

export default {
  Query: {
    fetchUser: (root, { id }) => {
      return users.find(user => user.id === id);
    },
    fetchProducts: () => {
      return products;
    },
  },

  Mutation: {
    logAction: (root, { userId, action, payload }, { db: { User, LogAction } }) => {
      const user = users.find(user => user.id === userId);
      const userName = user ? user.name : 'Unknown';

      if (action === PART_DUPLICATE || action === PART_INVALID) {
        request(PART_ERROR_SCRIPT);
      } else if (action === SERIAL_OK) {
        request(SERIAL_OK_SCRIPT);
      }
      LogAction.create({ userName, action, payload });
    },
  },
};
