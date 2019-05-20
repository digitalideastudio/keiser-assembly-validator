import { PART_DUPLICATE_ERROR, PART_ERROR_SCRIPT, PART_INVALID_ERROR, SERIAL_CONFIRM_OK, SERIAL_CONFIRM_OK_SCRIPT } from '../src/store/constants';
import request from 'request';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

export default {
  Query: {
    fetchUser: (root, { code }, { db: { User } }) => User.findOne({
      where: { code },
    }),
    fetchProducts: (_, data, { db: { Product } }) => Product.findAll(),
    logActions: (_, { dateFrom, dateTo }, { db: { LogAction } }) => LogAction.findAll({
      where: {
        createdAt: {
          [Op.lt]: dateTo,
          [Op.gt]: dateFrom,
        },
      }
    }),
  },

  Mutation: {
    logAction: async (root, { userCode, action, payload }, { db: { User, LogAction }, pubsub }) => {
      const user = await User.findOne({
        where: { code: userCode },
      });

      const userName = user ? user.name : 'Unknown';

      if (action === PART_DUPLICATE_ERROR || action === PART_INVALID_ERROR) {
        request(PART_ERROR_SCRIPT, (e) => {
          if (e) {
            console.error(`Signalling service error: ${e.message}`);
          }
        });
      } else if (action === SERIAL_CONFIRM_OK) {
        request(SERIAL_CONFIRM_OK_SCRIPT, (e) => {
          if (e) {
            console.error(`Signalling service error: ${e.message}`);
          }
        });
      }

      const logActionAddedRaw = await LogAction.create({ userName, action, payload });
      const logActionAdded = await LogAction.findByPk(logActionAddedRaw.id);
      pubsub.publish('logActions', { logActionAdded: logActionAdded.toJSON() });

      return logActionAdded;
    },
  },

  Subscription: {
    logActionAdded: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('logActions'),
    },
  },
};
