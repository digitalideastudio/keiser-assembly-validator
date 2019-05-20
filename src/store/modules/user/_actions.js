import gql from 'graphql-tag';
import apolloProvider from '@/apolloProvider';
import store from '@/store';

export default {
  async fetchUser({ commit }, code) {
    return apolloProvider.defaultClient.query({
      query: gql`
        query fetchUser($code: String!) {
          fetchUser(code: $code) {
            id
            code
            name
          }
        }
      `,
      variables: {
        code,
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
        mutation logAction($userCode: String, $action: LogActionType!, $payload: String!) {
          logAction(userCode: $userCode, action: $action, payload: $payload) {
            id
          }
        },
      `,
      variables: {
        userCode: (store.getters['user/user'] || {}).code || '',
        action,
        payload,
      }
    });
  }
};
