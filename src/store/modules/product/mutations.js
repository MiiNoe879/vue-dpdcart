/* ============
 * Mutations for the product module
 * ============
 *
 * The mutations that are available on the
 * product module.
 */

import {
  GET_PRODUCTS,
  SET_LOADING,
} from './mutation-types';

export default {
  [GET_PRODUCTS](state, products) {
    state.products = products;
  },
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
};
