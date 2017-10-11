import axios from 'axios';

export default {
    setProducts({ commit }, remoteUrl) {
        return axios.get(remoteUrl)
            .then(({ data }) => {
                commit('setProducts', data);
            });
    },
};
