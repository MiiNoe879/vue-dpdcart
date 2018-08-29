<template>
  <v-layout :index="1" :showCheckout="true" :showCart="false">
    <v-card contextual-style="dark">
      <div slot="body">
        <div class="chackout-content">
          <div class="container">
            <div class="row">
              <div class="col-12 col-md-5" id="order_block">
                <v-checkout-order-summary />
                <!-- /.End of order summary -->
              </div>
              <div class="col-12 col-md-7 order-md-first order-last">
                <v-checkout-customer
                  :checkCustomerInfoValidation="checkCustomerInfoValidation"
                  @afterCustomerValidate="afterCustomerValidate"
                />
                <!-- /.End of customer info -->
                <div v-if="cart.cart">
                  <v-checkout-shipping
                    v-if="cart.cart.requires.shipping"
                    :checkShippingInfoValidation="checkCustomerInfoValidation"
                    @afterShippingValidate="afterShippingValidate"
                  />
                </div>
                <!-- /.End of shipping info -->
                <v-checkout-payment :confirmed="confirmed" @orderCompleted="orderCompleted" />
                <div class="content-footer">
                  <button type="button" class="btn btn-primary btn-block" @click="placeOrder" :disabled="customerPosting || shippingPosting || shippingOptionPosting || purchasing" id="placeOrder_btn">
                    <i class="fa fa-fw fa-refresh fa-spin" v-if="customerPosting || shippingPosting || shippingOptionPosting || purchasing"></i>
                    Place order
                  </button>
                  <div class="secure-logo text-center">
                    <a href="#">
                      <img src="static/img/secure-generic.png" alt="">
                    </a>
                    <a href="#">
                      <img src="static/img/secure-rapidssl.gif" alt="">
                    </a>
                    <a href="#">
                      <img src="static/img/secure-pci-dss.png" alt="">
                    </a>
                  </div>
                </div>
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
   * Checkout Component
   * ============
   *
   * Gives an idea how components work.
   */
  import {
    mapState,
    mapGetters
  } from 'vuex';
  import VLayout from '@/layouts/Default';
  import VCard from '@/components/Card';
  import VCheckoutCustomer from '@/components/checkout/Customer';
  import VCheckoutOrderSummary from '@/components/checkout/OrderSummary';
  import VCheckoutShipping from '@/components/checkout/Shipping';
  import VCheckoutPayment from '@/components/checkout/Payment';

  export default {
    /**
     * The name of the component.
     */
    name: 'checkout',
    /**
     * The properties that the component accepts.
     */
    props: {},

    data: function () {
      return {
        confirm: false,
        confirmed: false,
        paymentMethod: 1,
        checkCustomerInfoValidation: false,
        checkShippingInfoValidation: false,
      }
    },

    /**
     * The components that the page can use.
     */
    components: {
      VLayout,
      VCard,
      VCheckoutCustomer,
      VCheckoutOrderSummary,
      VCheckoutShipping,
      VCheckoutPayment,
    },

    /**
     * The computed properties that the component can use.
     */
    computed: {
      ...mapState({
        cart: state => state.cart,
      }),
      ...mapGetters({
        customerPosting: 'cart/getCustomerPosting',
        shippingPosting: 'cart/getShippingPosting',
        shippingOptionPosting: 'cart/getShippingOptionPosting',
        selectedCountry: 'cart/getSelectedCountry',
        selectedZone: 'cart/getSelectedZone',
        selectedShippingOption: 'cart/getSelectedShippingOption',
        purchasing: 'cart/getPurchasing',
      }),
    },

    created() {
      this.$store.dispatch('cart/setCart');
      $(window).scroll(function() {
        if ($(window).scrollTop() > 150) {
          $("#order_block").css('margin-top', $(window).scrollTop() - 130);
        } else if ($(window).scrollTop() <= 150) {
          $("#order_block").css('margin-top', 'unset');
        }
      });
    },

    methods: {
      placeOrder() {
        this.checkCustomerInfoValidation = true;
      },

      orderCompleted() {
        this.confirmed = false;
      },

      paymentMethodChange(val) {
        this.paymentMethod = Number(val);
      },

      afterCustomerValidate(val) {
        this.checkCustomerInfoValidation = false;
        if (val) {
          this.$store.dispatch('cart/postCustomer');
        }
      },

      afterShippingValidate(val) {
        this.checkShippingInfoValidation = false;
        if (val) {
          this.$store.dispatch('cart/postShipping');
        }
      },
    },

    watch: {
      customerPosting: function (newVal, oldVal) {
        if (!newVal && oldVal) {
          if (this.cart.cart.requires.shipping) { // if shipping requires then post shipping
            // this.$store.dispatch('cart/postShipping');
            this.checkShippingInfoValidation = true;
          } else {
            this.confirmed = true;
          }
        }
      },
      shippingPosting: function (newVal, oldVal) {
        if (!newVal && oldVal) {
          this.$store.dispatch('cart/postShippingOption', true);
        }
      },
      shippingOptionPosting: function (newVal, oldVal) {
        // And then place order
        if (!newVal && oldVal) {
          this.confirmed = true;
        }
      },
    },
  };

</script>
