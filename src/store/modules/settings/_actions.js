import axios from 'axios';

export default {
    setSettings({ commit }) {
        return axios.get('/settings.json')
            .then(({ data }) => {
                commit('setSettings', data);
                return data;
            });
    },
};
