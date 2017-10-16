import axios from 'axios';

export default {
    setProducts({ commit }, productUrl) {
        return axios.get(productUrl)
            .then(({ data }) => {
                commit('setProducts', data);
            });
    },
};
