import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import state from './state';
import mutations from './mutations';
import getters from './getters';
import products from './modules/products';
import settings from './modules/settings';
import users from './modules/users';
import assembly from './modules/assembly';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug,
  actions,
  getters,
  mutations,
  state,
  modules: {
    settings,
    products,
    users,
    assembly,
  },
});
