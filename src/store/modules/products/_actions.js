import apolloProvider from '@/apolloProvider';
import gql from 'graphql-tag';

export default {
  async fetchProducts({ commit }) {
    const { data: { fetchProducts }} = await apolloProvider.defaultClient.query({
      query: gql`
        query fetchProducts {
          fetchProducts {
            id
            startOver
            model
            parts {
              index
              id
              description
            }
          }
        }
      `,
    });

    commit('setProducts', fetchProducts);
  },
};
