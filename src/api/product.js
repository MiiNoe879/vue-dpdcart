import Vue from 'vue';
import config from './config';

const getProducts = () => Vue.$http.get(config.GET_PRODUCTS_URL);

export default {
  getProducts,
};
