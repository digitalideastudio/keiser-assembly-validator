import apolloProvider from '@/apolloProvider';

export default {
    setCurrentUser({ commit }, user) {
        apolloProvider.$query('');
        commit('setCurrentUser', user);
    },
};
