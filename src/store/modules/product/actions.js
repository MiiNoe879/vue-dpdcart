/* ============
 * Actions for the product module
 * ============
 *
 * The actions that are available on the
 * product module.
 */
/* eslint-disable */

import store from '@/store';
import productAPI from '../../../api/product';
import * as types from './mutation-types';

export const getProducts = ({ commit }) => {
  store.dispatch('product/setLoading', true);
  productAPI.getProducts().then((response) => {
    commit(types.GET_PRODUCTS, response.data);
    store.dispatch('product/setLoading', false);
  }).catch((e) => {
    store.dispatch('product/setLoading', false);
  });
};

export const setLoading = ({ commit }, loading) => {
  commit(types.SET_LOADING, loading);
};

export default {
  getProducts,
  setLoading,
};
