import gql from 'graphql-tag';
import apolloProvider from '@/apolloProvider';
import store from '@/store';

export default {
  async fetchUser({ commit }, id) {
    return apolloProvider.defaultClient.query({
      query: gql`
        query fetchUser($id: String!) {
          fetchUser(id: $id) {
            index
            id
            name
          }
        }
      `,
      variables: {
        id,
      }
    }).then(({ data: { fetchUser }}) => {
      if (fetchUser) {
        return commit('setUser', fetchUser || {});
      }
      return Promise.reject();
    });
  },
  async logAction(_, [action, payload]) {
    await apolloProvider.defaultClient.mutate({
      mutation: gql`
        mutation logAction($userId: String, $action: LogAction!, $payload: String!) {
          logAction(userId: $userId, action: $action, payload: $payload)
        },
      `,
      variables: {
        userId: (store.getters['user/user'] || {}).id || '',
        action,
        payload: JSON.stringify(payload),
      }
    });
  }
};
