import axios from 'axios';

export default {
    setProducts({ commit }, productUrl) {
        return axios.get(productUrl)
            .then(({ data }) => {
                data = typeof data === 'string' ? JSON.parse(data) : data; // eslint-disable-line no-param-reassign
                commit('setProducts', data);
            });
    },
};
