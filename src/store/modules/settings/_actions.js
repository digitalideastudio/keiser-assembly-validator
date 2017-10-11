import axios from 'axios';

export default {
    setSettings({ commit }) {
        return axios.get('/static/settings.json')
            .then(({ data }) => {
                commit('setSettings', data);
                return data;
            });
    },
};
