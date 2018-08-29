/* ============
 * Getters for the cart module
 * ============
 *
 * The getters that are available on the
 * cart module.
 */

const cartProducts = (state, getters, rootState) =>
  state.items.map(({ id, quantity }) => {
    const product = rootState.product.products[id];
    return {
      id,
      name: product.name,
      price: product.price,
      widget_image_portrait: product.widget_image_portrait,
      description: product.description,
      quantity,
    };
  });

const cartTotalPrice = (state, getters) =>
getters.cartProducts.reduce((total, product) => {
  const price = Number(product.price.substring(1));
  return total + (price * product.quantity);
}, 0);

const getSelectedCountry = state => state.selectedCountry;

const getSelectedZone = state => state.selectedZone;

const getSelectedShippingOption = state => state.selectedShippingOption;

const getCustomerPosting = state => state.customerPosting;

const getShippingPosting = state => state.shippingPosting;

const getShippingOptionPosting = state => state.shippingOptionPosting;

const getApplyingCoupon = state => state.applyingCoupon;

const getRedirect = (state) => {
  if (state.cart) {
    return state.cart.redirect;
  }
  return null;
};

const getLoading = state => state.loading;

const getPurchasing = state => state.purchasing;

const getProductAdding = state => state.productAdding;

export default {
  cartProducts,
  cartTotalPrice,
  getSelectedCountry,
  getSelectedZone,
  getSelectedShippingOption,
  getCustomerPosting,
  getShippingPosting,
  getShippingOptionPosting,
  getRedirect,
  getLoading,
  getApplyingCoupon,
  getPurchasing,
  getProductAdding,
};
