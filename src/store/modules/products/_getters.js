export default {
  products: state => state.products,
  productsLoaded: state => !!state.products.length,
};
