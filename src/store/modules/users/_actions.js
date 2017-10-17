import axios from 'axios';

export default {
    setUsers({ commit }, remoteUrl) {
        return axios.get(remoteUrl)
            .then(({ data }) => {
                data = typeof data === 'string' ? JSON.parse(data) : data; // eslint-disable-line no-param-reassign
                commit('setUsers', data);
            });
    },
};
