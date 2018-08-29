/* ============
 * Mutations for the cart module
 * ============
 *
 * The mutations that are available on the
 * cart module.
 */

const pushProductToCart = (state, { product }) => {
  state.items.push(product);
};

const removeProductFromCart = (state, { id }) => {
  state.items = state.items.filter(item => item.id !== id);
};

const incrementItemQuantity = (state, { id }) => {
  const cartItem = state.items.find(item => item.id === id);
  cartItem.quantity += 1;
};

const decrementItemQuantity = (state, { id }) => {
  const cartItem = state.items.find(item => item.id === id);
  if (cartItem.quantity !== 1) {
    cartItem.quantity -= 1;
  }
};

const setCartItems = (state, { items }) => {
  state.items = items;
};

const setCart = (state, cart) => {
  state.cart = cart;
};

const setCheckoutStatus = (state, status) => {
  state.checkoutStatus = status;
};

const setCustomerEmail = (state, email) => {
  state.cart.customer.email = email;
};

const setCustomerFirstName = (state, firstName) => {
  state.cart.customer.first_name = firstName;
};

const setCustomerLastName = (state, lastName) => {
  state.cart.customer.last_name = lastName;
};

const setCustomerCustomFields = (state, data) => {
  const { value, index } = data;
  state.cart.custom_fields[index].value = value;
};

const setCustomerCustomFields1 = (state, value) => {
  state.cart.custom_fields[1].value = value;
};

const setCustomerCustomFields2 = (state, value) => {
  state.cart.custom_fields[2].value = value;
};

const setCustomerMarketingOptin = (state, value) => {
  state.cart.requires.marketing_optin.enabled = value;
};

const setZones = (state, value) => {
  state.cart.shipping.zones = value;
};

const setCountryCode = (state, value) => {
  state.cart.shipping.location.country_code = value;
};

const setProvince = (state, value) => {
  state.cart.shipping.location.province = value;
};

const setOption = (state, value) => {
  state.cart.shipping.option_id = value;
};

const setAddress1 = (state, value) => {
  state.cart.shipping.location.address1 = value;
};

const setAddress2 = (state, value) => {
  state.cart.shipping.location.address2 = value;
};

const setCity = (state, value) => {
  state.cart.shipping.location.city = value;
};

const setPostalCode = (state, value) => {
  state.cart.shipping.location.postal_code = value;
};

const setSelectedCountry = (state, value) => {
  state.selectedCountry = value;
};

const setSelectedZone = (state, value) => {
  state.selectedZone = value;
};

const setSelectedShippingOption = (state, value) => {
  state.selectedShippingOption = value;
};

const setLoading = (state, loading) => {
  state.loading = loading;
};

const setProductAdding = (state, loading) => {
  state.productAdding = loading;
};

const setCustomerPosting = (state, loading) => {
  state.customerPosting = loading;
};

const setShippingPosting = (state, loading) => {
  state.shippingPosting = loading;
};

const setShippingOptionPosting = (state, loading) => {
  state.shippingOptionPosting = loading;
};

const setShippingOptions = (state, options) => {
  state.cart.shipping.options = options;
};

const resetPrices = (state, shipping) => {
  state.cart.cart.shipping = shipping;
  const { subtotal } = state.cart.cart;
  const { discount } = state.cart.cart;
  state.cart.cart.total = subtotal + shipping + discount;
};

const setPurchaseFinished = (state, loading) => {
  state.purchaseFinished = loading;
};

const setApplyingCoupon = (state, loading) => {
  state.applyingCoupon = loading;
};

const setPurchasing = (state, loading) => {
  state.purchasing = loading;
};

export default {
  pushProductToCart,
  incrementItemQuantity,
  decrementItemQuantity,
  setCartItems,
  setCart,
  setCheckoutStatus,
  removeProductFromCart,
  setCustomerEmail,
  setCustomerFirstName,
  setCustomerLastName,
  setLoading,
  setCustomerCustomFields,
  setCustomerCustomFields1,
  setCustomerCustomFields2,
  setCustomerMarketingOptin,
  setZones,
  setCountryCode,
  setProvince,
  setAddress1,
  setAddress2,
  setCity,
  setPostalCode,
  setSelectedCountry,
  setSelectedZone,
  setOption,
  setSelectedShippingOption,
  setCustomerPosting,
  setShippingPosting,
  setShippingOptionPosting,
  setShippingOptions,
  resetPrices,
  setPurchaseFinished,
  setApplyingCoupon,
  setPurchasing,
  setProductAdding,
};
