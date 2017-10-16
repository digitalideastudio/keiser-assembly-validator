import axios from 'axios';

export default {
    setUsers({ commit }, remoteUrl) {
        return axios.get(remoteUrl)
            .then(({ data }) => {
                commit('setUsers', data);
            });
    },
};
