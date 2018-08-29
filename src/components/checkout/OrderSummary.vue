<template>
  <div class="check-order">
    <div class="order-head">
      <h5>Order summary
        <router-link
          class="edit"
          :to="{ name: 'cart.index' }"
        >
          Edit
        </router-link>
      </h5>
    </div>
    <div class="order-body">
      <table class="table" v-if="cart">
        <tbody>
          <tr class="cart_item" v-for="product of cart.cart.items" :key="product.id">
            <td class="product-name">
              <h5>
                <span class="product-sum">× {{product.quantity}}</span>&nbsp; {{product.name}}</h5>
              <div class="product-cat" v-html="product.description"></div>
            </td>
            <td class="product-total">
              <span class="Price-amount amount">
                <span class="Price-currencySymbol">$</span>{{(product.price.price * product.quantity).toFixed(2)}}</span>
            </td>
          </tr>                  
        </tbody>
      </table>
    </div>
    <form class="cupon" v-if="cart">
      <div class="input-group">
        <input class="form-control" placeholder="Cuppon" aria-label="Cuppon" aria-describedby="basic-addon2" type="text" v-model="coupon">
        <div class="input-group-append">
          <button
            class="btn"
            type="button"
            :disabled="applyingCoupon === true || !coupon" @click="applyCoupon"
          >
            <i class="fa fa-fw fa-refresh fa-spin" v-if="applyingCoupon"></i>
            Apply
          </button>
        </div>
      </div>
      <br />
      <div class="total-price-info" v-if="cart.discounts.length > 0">
        <h4>Coupon :
          <span v-for="discount of cart.discounts" :key="discount.code">
            {{discount.name}}<br />
            ({{discount.code}})<br />
          </span>
        </h4>
      </div>
    </form>
    <!-- /.End of cupon form -->
    <div class="order-footer" v-if="cart">
      <!-- <a href="#" class="have_coupon">Have a coupon?</a> -->
      <div class="total-price-info">
        <h4>Subtotal :
          ${{cart.cart.subtotal.toFixed(2)}}
        </h4>
        <!-- <p>Includes: $6.12 VAT (15% of $39.74)</p> -->
      </div>
      <div class="total-price-info" v-if="cart.cart.discount !== 0">
        <h4>Discount : ${{cart.cart.discount.toFixed(2)}}</h4>
      </div>
      <div class="total-price-info" v-if="Number(cart.cart.shipping) > 0">
        <h4>Shipping :
          <span>
            $ {{Number(cart.cart.shipping).toFixed(2)}}
          </span>
        </h4>
      </div>
      <div class="total-price-info">
        <h2>Total :
          <span class="total-price">
            ${{cart.cart.total.toFixed(2)}}
          </span>
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  /* ============
   * Checkout/OrderSummary Component
   * ============
   *
   * Gives an idea how components work.
   */
  import { mapState, mapGetters } from 'vuex';

  export default {
    /**
     * The name of the component.
     */
    name: 'checkout-orderSummary',
    /**
     * The properties that the component accepts.
     */
    props: {},

    /**
     * The computed properties that the component can use.
     */
    computed: {
      ...mapState({
        cart: state => state.cart.cart,
      }),
      ...mapGetters({
        applyingCoupon: 'cart/getApplyingCoupon',
      }),
    },

    data: function () {
      return {
        coupon: null,
      }
    },

    mounted() {
    },

    methods: {
      applyCoupon() {
        if (this.coupon) {
          this.$store.dispatch('cart/applyCoupon', this.coupon);
        }
      },
    }
  };

</script>