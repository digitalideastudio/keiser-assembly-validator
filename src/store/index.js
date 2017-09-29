import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import state from './state';
import mutations from './mutations';
import getters from './getters';
import products from './modules/products';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    strict : debug,
    actions,
    getters,
    mutations,
    state,
    modules: {
        products,
    },
});
