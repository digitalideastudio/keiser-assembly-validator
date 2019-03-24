export default {
  setProducts(state, products) {
    return Object.assign(state, {
      products,
      productsLoaded: true,
    });
  },
};
