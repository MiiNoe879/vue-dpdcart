<template>
  <div style="flex-grow: 1;">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul id="progressbar" class="navbar-nav mx-auto text-center d-none d-sm-none d-md-block" v-if="showCheckout">
        <li :class="index === 0 || index === 1 || index === 2 ? 'active' : ''">Shopping cart</li>
        <li :class="index ===1 ? 'active' : ''">Checkout</li>
        <li>Finish</li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-if="showCart && cart">
          <router-link :to="{ name: 'cart.index' }" active-class="active" tag="li">
            <a class="cart-icon">
              <i class="flaticon-shopping-cart"></i>
              <div v-if="cart">
                <div class="cart-number" v-if="cart.cart.items.length > 0">{{cart.cart.items.length}}</div>
              </div>
            </a>
          </router-link>
        </li>
        <li class="nav-item dropdown country-dropdown">
          <a class="nav-link dropdown-toggle btn" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            English
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" href="#">France</a>
            <a class="dropdown-item" href="#">Portugal</a>
            <a class="dropdown-item" href="#">Italy</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import { mapState } from 'vuex';
  /* ============
   * Language Component
   * ============
   *
   * Gives an idea how components work.
   */

  export default {
    /**
     * The name of the component.
     */
    name: 'language',

    /**
     * The properties that the component accepts.
     */
    props: {
      index: {
        type: Number,
        default: 0,
      },
      showCart: {
        type: Boolean,
        default: true,
      },
      showCheckout: {
        type: Boolean,
        default: true,
      },
    },

    /**
     * The computed properties that the component can use.
     */
    computed: {
      ...mapState({
        cart: state => state.cart.cart,
			})
    },
    mounted() {
    },
  };

</script>
