import axios from 'axios';

export default {
    setProducts({ commit }) {
        return axios.get('/static/products.json')
            .then(({ data }) => {
                commit('setProducts', data);
            });
    },
};
