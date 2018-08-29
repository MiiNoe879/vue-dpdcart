<template>
  <v-layout :index="0" :showCheckout="true" :showCart="false">
    <v-card contextual-style="dark">
      <div slot="body">
        <div class="cart-content">
          <div class="container">
            <div class="cart-panel">
              <div class="panel-body">
                <div v-if="cart">
                  <div class="row align-items-center" v-for="product of cart.cart.items" :key="product.id">
                    <div class="col-md-7">
                      <div class="d-flex align-items-center">
                        <div class="item_image">
                          <img :src="product.image_urls['100x100']" alt="" width=100 height=100>
                        </div>
                        <div class="item_name">
                          <h4>{{product.name}}</h4>
                          <p v-html="product.description"></p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <div data-quantity="Quantity" class="quantity" v-if="product.quantities_enable">
                        <div class="input-group spinner">
                          <input type="text" class="form-control" :value="product.quantity">
                          <div class="input-group-btn-vertical">
                            <button class="btn btn-default" type="button" @click="incrementItemQuantity(product.id)">
                              <i class="fas fa-angle-up"></i>
                            </button>
                            <button class="btn btn-default" type="button" @click="decreaseQuantity(product.id)">
                              <i class="fas fa-angle-down"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <div data-price="Price" class="u_price">
                        ${{product.price.price.toFixed(2)}}
                      </div>
                    </div>
                    <div class="col-md-1">
                      <div data-action="Action" class="action">
                        <button class="btn btn-sm" data-toggle="tooltip" data-placement="top" title="Remove" @click="removeFromCart(product.id)">
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="row cart-total align-items-center justify-content-end" v-if="cart.cart.total>0">
                    <div class="col-md-4">
                      <form class="cupon">
                        <div class="input-group">
                          <input type="text" class="form-control" placeholder="Cuppon" aria-label="Cuppon" aria-describedby="basic-addon2" v-model="coupon">
                          <div class="input-group-append">
                            <button class="btn" type="button" :disabled="applyingCoupon === true || !coupon" @click="applyCoupon">
                              <i class="fa fa-fw fa-refresh fa-spin" v-if="applyingCoupon"></i>
                              Apply
                            </button>
                          </div>
                        </div>
                      </form>
                      <!-- End of cupon form -->
                    </div>
                    <div class="col-md-4">
                      <div class="total-price-info">
                        <h4>Total Price : ${{cart.cart.subtotal.toFixed(2)}}</h4>
                        <!-- <p>Includes: $6.12 VAT (15% of $39.74)</p> -->
                      </div>
                      <div class="total-price-info" v-if="cart.discounts.length > 0">
                        <h4>Coupon :
                          <span v-for="discount of cart.discounts" :key="discount.code">
                            {{discount.name}}<br />
                            ({{discount.code}})<br />
                          </span>
                        </h4>
                      </div>
                      <div class="total-price-info" v-if="cart.cart.discount !== 0">
                        <h4>Discount : ${{cart.cart.discount.toFixed(2)}}</h4>
                      </div>
                    </div>
                  </div>
                  <form class="row cart-info-form align-items-center justify-content-end" v-show="cart.cart.total>0">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="fu_name">First Name
                          <span>*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="first_name"
                          aria-describedby="emailHelp"
                          placeholder="First Name"
                          :value="cart.customer.first_name"
                          @input="updateFirstName"
                          v-validate="'required|alpha'"
                          name="firstname"
                          :class="{'input': true, 'is-danger': errors.has('firstname'), 'form-control': true }"
                        >
                        <span v-show="errors.has('firstname')" class="help is-danger">{{ errors.first('firstname') }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="fu_name">Last Name
                          <span>*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="last_name"
                          aria-describedby="emailHelp"
                          placeholder="Last Name"
                          :value="cart.customer.last_name"
                          @input="updateLastName"
                          name="lastname"
                          v-validate="'required|alpha'"
                          :class="{'input': true, 'is-danger': errors.has('lastname'), 'form-control': true }"
                        >
                        <span v-show="errors.has('lastname')" class="help is-danger">{{ errors.first('lastname') }}</span>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="email">Your Email
                          <span>*</span>
                        </label>
                        <input
                          name="email"
                          v-validate="'required|email'"
                          placeholder="you@example.com"
                          :class="{'input': true, 'is-danger': errors.has('email'), 'form-control': true }"
                          :value="cart.customer.email"
                          @input="updateEmail"
                          type="text"
                        />
                        <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="btn-row row justify-content-between">
              <div class="col">
                <router-link
                  class="btn btn-deafult"
                  :to="{ name: 'home.index' }"
                >
                  <i class="fas fa-arrow-left"></i>Continue Shopping
                </router-link>
              </div>
              <div class="col" v-if="cart">
                <!-- <button
                  type="button"
                  class="btn btn-primary"
                  @click="checkout"
                  :disabled="customerPosting === true || !(cart.cart.total>0 && cart.customer.first_name && cart.customer.last_name && cart.customer.email)"
                > -->
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="checkout"
                >
                  <i class="fa fa-fw fa-refresh fa-spin" v-if="customerPosting"></i>
                  Checkout
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-layout>
</template>

<script>
  /* eslint-disable */
  /* ============
   * Cart Index Page
   * ============
   *
   * The cart index page.
   */
  import {
    mapState,
    mapGetters
  } from 'vuex';
  import VLayout from '@/layouts/Default';
  import VCard from '@/components/Card';

  export default {
    /**
     * The name of the page.
     */
    name: 'cart-view',

    computed: {
      ...mapState({
        cart: state => state.cart.cart,
      }),
      ...mapGetters({
        customerPosting: 'cart/getCustomerPosting',
        loading: 'cart/getLoading',
        applyingCoupon: 'cart/getApplyingCoupon',
      }),
    },

    /**
     * The components that the page can use.
     */
    components: {
      VLayout,
      VCard,
    },

    data: function () {
      return {
        coupon: null,
      }
    },

    created() {
      this.$store.dispatch('cart/setCart');
    },

    mounted() {
    },

    methods: {
      removeFromCart(id) {
        this.$store.dispatch('cart/removeProductFromCart', id);
      },
      incrementItemQuantity(id) {
        this.$store.dispatch('cart/incrementItemQuantity', id);
      },
      decreaseQuantity(id) {
        this.$store.dispatch('cart/decrementItemQuantity', id);
      },
      updateEmail(e) {
        this.$store.dispatch('cart/setCustomerEmail', e.target.value);
      },
      updateFirstName(e) {
        this.$store.dispatch('cart/setCustomerFirstName', e.target.value);
      },
      updateLastName(e) {
        this.$store.dispatch('cart/setCustomerLastName', e.target.value);
      },
      applyCoupon() {
        if (this.coupon) {
          this.$store.dispatch('cart/applyCoupon', this.coupon);
        }
      },
      checkout() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$store.dispatch('cart/postCustomer');
            return;
          }
        });
      },
    },

    watch: {
      customerPosting: function (newVal, oldVal) {
        if (!newVal && oldVal) {
          this.$router.push({ name: 'checkout.index' });
        }
      },
      loading: function (newVal, oldVal) {
        if (!newVal) {
        }
      },
    },
  };

</script>
