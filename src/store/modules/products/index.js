import state from './_state';
import getters from './_getters';
import actions from './_actions';
import mutations from './_mutations';

const products = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default products;
