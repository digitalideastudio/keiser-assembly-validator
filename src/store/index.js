import Vue from 'vue';
import Vuex from 'vuex';

import products from './modules/products';
import user from './modules/user';
import assembly from './modules/assembly';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug,
  actions: {},
  getters: {},
  mutations: {},
  state: {},

  modules: {
    products,
    user,
    assembly,
  },
});
