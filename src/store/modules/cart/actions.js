/* ============
 * Actions for the cart module
 * ============
 *
 * The actions that are available on the
 * cart module.
 */
/* eslint-disable */
import store from '@/store';
import cartAPI from '../../../api/cart';

const _ = require('lodash');

const buildQuery = (obj, urlString, prefix) => {
  if (obj) {
    const keys = Object.keys(obj);
    for (const key of keys) {
      if (_.isObject(obj[key])) {
        urlString = buildQuery(obj[key], urlString, `${prefix}[${key}]`);
      } else {
        urlString += `${prefix}[${key}]= `;
        if (obj[key]) {
          urlString += obj[key];
        }
        urlString += '&';
      }
    }
  } else {
    urlString += `${prefix}=&`;
  }
  return urlString;
}

const postProductsToCart = (products, commit) => {
  let urlString = '';
  let i = 0;
  for (const item of products) {
    urlString += buildQuery(item, '', `items[${i}]`);
    i++;
  }
  commit('setLoading', true);
  commit('setProductAdding', true);
  cartAPI.addToCart(urlString).then((response) => {
    commit('setCart', response.data);
    commit('setLoading', false);
    commit('setProductAdding', false);
  }).catch(() => {
    commit('setProductAdding', false);
    commit('setLoading', false);
  });
}

const addProductToCart = ({ state, commit }, product) => {
  const { cart } = state;
  const products = _.cloneDeep(cart.cart.items);
  products.push(product);
  postProductsToCart(products, commit);
};

const removeProductFromCart = ({ state, commit }, id) => {
  const { cart } = state
  let products = _.cloneDeep(cart.cart.items);
  products = products.filter(item => item.id !== id);

  postProductsToCart(products, commit);
};

const incrementItemQuantity = ({ state, commit }, id) => {
  const { cart } = state
  let items = _.cloneDeep(cart.cart.items);
  items = items.filter(item => item.id === id);

  if (items.length > 0) {
    let products = _.cloneDeep(cart.cart.items);
    items[0].quantity = 1;
    products.push(items[0]);
    postProductsToCart(products, commit);
  }
};

const decrementItemQuantity = ({ state, commit }, id) => {
  const { cart } = state
  let items = _.cloneDeep(cart.cart.items);

  items = items.map(item => {
    if (item.id === id) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    }
    return item;
  });
  postProductsToCart(items, commit);
};

const applyCoupon = ({ state, commit }, discount_code) => {
  const { cart } = state;
  const { items } = cart.cart;
  let urlString = '';
  let i = 0;
  for (const item of items) {
    urlString += buildQuery(item, '', `items[${i}]`);
    i++;
  }

  urlString += `discount_code=${discount_code}`;
  commit('setApplyingCoupon', true);
  cartAPI.addToCart(urlString).then((response) => {
    commit('setCart', response.data);
    commit('setApplyingCoupon', false);
  }).catch(() => commit('setApplyingCoupon', false));
};

const setCart = ({ commit }) => {
  commit('setLoading', true);
  cartAPI.getCart().then((response) => {
    commit('setCart', response.data);
    commit('setLoading', false);
  }).catch(() => commit('setLoading', false));
};

const setCustomerEmail = ({ commit }, email) => {
  commit('setCustomerEmail', email);
};

const setCustomerFirstName = ({ commit }, firstName) => {
  commit('setCustomerFirstName', firstName);
};

const setCustomerLastName = ({ commit }, lastName) => {
  commit('setCustomerLastName', lastName);
};

const setCustomerCustomFields = ({ commit }, { value, index }) => {
  commit('setCustomerCustomFields', { value, index });
};

const setCustomerCustomFields1 = ({ commit }, value) => {
  commit('setCustomerCustomFields1', value);
};

const setCustomerCustomFields2 = ({ commit }, value) => {
  commit('setCustomerCustomFields2', value);
};

const setCustomerMarketingOptin = ({ commit }, value) => {
  commit('setCustomerMarketingOptin', value);
};

const setSelectedCountry = ({ commit }, value) => {
  commit('setSelectedCountry', value);
};

const setSelectedZone = ({ commit }, value) => {
  commit('setSelectedZone', value);
};

const setSelectedShippingOption = ({ commit }, value) => {
  commit('setSelectedShippingOption', value);
};

const postCustomer = ({ state, commit }) => {
  store.dispatch('cart/setCustomerPosting', true);
  const { first_name, last_name, email } = state.cart.customer;
  const { enabled } = state.cart.requires.marketing_optin;
  const { custom_fields } = state.cart;
  cartAPI.postCustomer(first_name, last_name, email, enabled, custom_fields).then((response) => {
    store.dispatch('cart/setCustomerPosting', false);
  }).catch((e) => {
    store.dispatch('cart/setCustomerPosting', false);
  });
};

const postShipping = ({ state, commit }) => {
  store.dispatch('cart/setShippingPosting', true);
  const { shipping } = state.cart;
  let urlString = '';
  for (const item in shipping) {
    urlString += buildQuery(shipping[item], '', `shipping[${item}]`);
  }

  cartAPI.postShipping(urlString).then((response) => {
    commit('setCart', response.data);
    store.dispatch('cart/setShippingPosting', false);
  }).catch((e) => {
    store.dispatch('cart/setShippingPosting', false);
  });
};

const postShippingOption = ({ state, commit }, isContinue) => {
  if (isContinue) {
    store.dispatch('cart/setShippingOptionPosting', true);
  }
  const { shipping } = state.cart;
  const { selectedShippingOption } = state;
  if (selectedShippingOption) {
    let urlString = '';
    for (const item in shipping) {
      if (item === 'option_id') {
        urlString += `&shipping[${item}]=${selectedShippingOption.key}&`
      } else {
        urlString += buildQuery(shipping[item], '', `shipping[${item}]`);
      }
    }

    cartAPI.postShippingOption(urlString).then((response) => {
      commit('setCart', response.data);
      if (isContinue) {
        store.dispatch('cart/setShippingOptionPosting', false);
      }
    }).catch((e) => {
      if (isContinue) {
        store.dispatch('cart/setShippingOptionPosting', false);
      }
    });
  } else {
    if (isContinue) {
      store.dispatch('cart/setShippingOptionPosting', false);
    }
  }
};

export const setZones = ({ commit }, country_code) => {
  cartAPI.getZones(country_code).then((response) => {
    commit('setZones', response.data);
  });
};

export const setCountryCode = ({ commit }, country_code) => {
  commit('setCountryCode', country_code);
};

export const setProvince = ({ commit }, province) => {
  commit('setProvince', province);
};

export const setOptionID = ({ commit }, option_id) => {
  commit('setOption', option_id);
};

export const setAddress1 = ({ commit }, address1) => {
  commit('setAddress1', address1);
};

export const setAddress2 = ({ commit }, address2) => {
  commit('setAddress2', address2);
};

export const setCity = ({ commit }, city) => {
  commit('setCity', city);
};

export const setPostalCode = ({ commit }, postalCode) => {
  commit('setPostalCode', postalCode);
};

export const setLoading = ({ commit }, loading) => {
  commit('setLoading', loading);
};

export const setCustomerPosting = ({ commit }, loading) => {
  commit('setCustomerPosting', loading);
};

export const setShippingPosting = ({ commit }, loading) => {
  commit('setShippingPosting', loading);
};

export const setShippingOptionPosting = ({ commit }, loading) => {
  commit('setShippingOptionPosting', loading);
};

export const setShippingOptions = ({ commit }, options) => {
  commit('setShippingOptions', options);
}

export const getNewShippingOptions = ({ state, commit }) => {
  const { shipping } = state.cart;
  let urlString = '';
  for (const item in shipping) {
    urlString += buildQuery(shipping[item], '', `shipping[${item}]`);
  }

  cartAPI.postShipping(urlString).then((response) => {
    commit('setCart', response.data);
    commit('resetPrices', 0);
  }).catch((e) => {
  });
};

export const resetPrices = ({ state, commit }, shipping) => {
  commit('resetPrices', shipping);
};

export const purchase = ({ state, commit }, credit_card) => {
  let urlString = `credit_card[name]=${credit_card.name}&credit_card[exp][month]=${credit_card.exp.month}&credit_card[exp][year]=${credit_card.exp.year}&credit_card[token]=${credit_card.token}&custom[card_type]=${credit_card.card_type}`;
  urlString += `&credit_card[cvv2]=${credit_card.cvv2}`;
  urlString +=  `&gateway=creditcard&`;

  const { billing } = state.cart;
  for (const info in billing) {
    urlString += buildQuery(billing[info], '', `billing[${info}]`);
  }
  
  commit('setPurchasing', true);
  cartAPI.purchase(urlString).then((response) => {
    commit('setPurchasing', false);
    commit('setPurchaseFinished', true);
    commit('setCart', response.data);
  }).catch((e) => {
    commit('setPurchasing', false);
    commit('setPurchaseFinished', false);
  });
};

export const paypalCheckout = ({ state, commit }) => {
  let urlString = `credit_card[name]=&credit_card[exp][month]=&credit_card[exp][year]=&credit_card[token]=&custom[card_type]=`;
  urlString += `&credit_card[cvv2]=`;
  urlString +=  `&gateway=paypal&`;

  const { billing } = state.cart;
  for (const info in billing) {
    urlString += buildQuery(billing[info], '', `billing[${info}]`);
  }
  
  cartAPI.purchase(urlString).then((response) => {
    commit('setPurchaseFinished', true);
    commit('setCart', response.data);
  }).catch((e) => {
    console.log(e);
    commit('setPurchaseFinished', false);
  });
};

export default {
  addProductToCart,
  removeProductFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
  setCart,
  setCustomerEmail,
  setCustomerFirstName,
  setCustomerLastName,
  postCustomer,
  postShipping,
  postShippingOption,
  setLoading,
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
  setCustomerCustomFields,
  setSelectedZone,
  setSelectedCountry,
  setSelectedShippingOption,
  setOptionID,
  setCustomerPosting,
  setShippingPosting,
  setShippingOptionPosting,
  applyCoupon,
  setShippingOptions,
  getNewShippingOptions,
  resetPrices,
  purchase,
  paypalCheckout,
};
