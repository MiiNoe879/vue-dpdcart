/* eslint-disable */
import Vue from 'vue';
import config from './config';

const addToCart = products => Vue.$http.post(config.ADD_TO_CART_URL, products);

const getCart = () => Vue.$http.get(config.GET_CART_URL);

const postCustomer = (firstName, lastName, email, marketingOptin, customFields) => {
  let data = `customer[first_name]=${firstName}&customer[last_name]=${lastName}&customer[email]=${email}&customer[marketing_optin]=${marketingOptin}&customer[email_retype]=${email}\
  &`;
  const keys = Object.keys(customFields);
  for (const key of keys) {
    if (customFields[key].value) {
      data += `custom_fields[${key}]=${customFields[key].value}&`;
    } else {
      data += `custom_fields[${key}]= &`;
    }
  }
  return Vue.$http.post(config.POST_CUSTOMER_URL, data);
};

const postShipping = (shipping) => Vue.$http.post(config.POST_SHIPPING_URL, shipping);

const postShippingOption = (shipping) => Vue.$http.post(config.POST_SHIPPING_OPTION_URL, shipping);

const getZones = country_code => Vue.$http.get(`${config.GET_ZONES_URL}&country_code=${country_code}`);

const purchase = (urlString) => Vue.$http.post(config.PURCHASE_URL, urlString);

export default {
  addToCart,
  getCart,
  postCustomer,
  getZones,
  postShipping,
  postShippingOption,
  purchase,
};
