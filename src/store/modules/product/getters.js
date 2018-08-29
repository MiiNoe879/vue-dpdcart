/* ============
 * Getters for the product module
 * ============
 *
 * The getters that are available on the
 * product module.
 */

const getLoading = state => state.loading;
const getProducts = (state) => {
  const { products } = state;
  const results = [];

  if (products) {
    // eslint-disable-next-line
    for (const product in products) {
      results.push(products[product]);
    }
  }
  return results;
};

export default {
  getLoading,
  getProducts,
};
