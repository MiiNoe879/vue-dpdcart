const API_BASE_URL = 'https://demo.dpdcart.com';
const CART_COOKIE = '__dpd_cart=ffe7408f-31e1-406e-863b-8fab7f433568';
// const CART_COOKIE = '__dpd_cart=cce7408f-31e1-406e-863b-8fab7f4335ab';

const GET_PRODUCTS_URL = `${API_BASE_URL}/api/productMetadata?${CART_COOKIE}`;
const ADD_TO_CART_URL = `${API_BASE_URL}/api/cart?${CART_COOKIE}`;
const GET_CART_URL = `${API_BASE_URL}/api?${CART_COOKIE}`;
const POST_CUSTOMER_URL = `${API_BASE_URL}/api/customer?${CART_COOKIE}`;
const GET_ZONES_URL = `${API_BASE_URL}/api/zoneJson?${CART_COOKIE}`;
const POST_SHIPPING_URL = `${API_BASE_URL}/api/shipping?${CART_COOKIE}`;
const POST_SHIPPING_OPTION_URL = `${API_BASE_URL}/api/shippingOption?${CART_COOKIE}`;
const PURCHASE_URL = `${API_BASE_URL}/api/purchase?${CART_COOKIE}`;

export default {
  GET_PRODUCTS_URL,
  ADD_TO_CART_URL,
  GET_CART_URL,
  POST_CUSTOMER_URL,
  GET_ZONES_URL,
  CART_COOKIE,
  POST_SHIPPING_URL,
  POST_SHIPPING_OPTION_URL,
  PURCHASE_URL,
};
