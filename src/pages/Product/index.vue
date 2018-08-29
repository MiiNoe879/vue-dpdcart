<template>
  <v-layout :showCheckout="false" :showCart="true">
    <v-card contextual-style="dark">
      <div slot="body">
        <div class="product_details">
          <div class="container" v-if="product">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="product-slider">
                  <div>
                    <img :src="product.widget_image_portrait">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="product-info">
                  <h2 class="product-title">{{product.name}}</h2>
                  <div class="meta-sku" v-if="product.sku">SKU: {{product.sku}}</div>
                  <p class="product-text" v-html="product.description">
                  </p>
                  <div class="product-price">{{product.price}}</div>
                  <div class="cart-row">
                    <!-- <div class="number-spinner">
                      <input type="number" class="form-control" id="number-spinner" placeholder="" v-model="count">
                    </div> -->
                    <div>
                      <button
                        class="cart-btn"
                        @click="addProductToCart"
                        :disabled="productAdding"
                      >
                        <i class="fa fa-fw fa-refresh fa-spin" v-if="productAdding"></i>
                        Add to cart
                      </button>
                    </div>
                  </div>
                  <ul class="social-share">
                    <li>Share this :</li>
                    <li>
                      <a href="#">
                        <i class="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fab fa-google-plus-g"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fab fa-pinterest-p"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-lg-10">
                <div class="text-details">
                  <h3>This is the product's LONG description</h3>
                  <p v-html="product.long_description"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--div slot="footer">
        Made with love by Vivid Web
      </div-->
    </v-card>
  </v-layout>
</template>

<script>
  /* ============
   * Product Index Page
   * ============
   *
   * The product index page.
   */
  /* eslint-disable */

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
    name: 'home-index',

    props: {},

    data: function () {
      return {
        product: null,
        count: 0,
      }
    },

    /**
     * The components that the page can use.
     */
    components: {
      VLayout,
      VCard,
    },

    computed: {
      ...mapState({
        cart: state => state.cart.cart,
      }),
      ...mapGetters({
        productAdding: 'cart/getProductAdding',
        loading: 'product/getLoading',
        products: 'product/getProducts',
      }),
    },

    created() {
      this.$store.dispatch('product/getProducts');
      this.$store.dispatch('cart/setCart');
    },

    methods: {
      addProductToCart() {
        this.$store.dispatch('cart/addProductToCart', this.product);
      },
    },

    watch: {
      productAdding: function (newVal, oldVal) {
        if (!newVal && oldVal) {
          this.$router.push({
            name: 'cart.index'
          });
        }
      },
      products: function (newVal, oldVal) {
        if (newVal) {
          const productId = Number(this.$route.params.id);
          const results = this.products.filter(item => item.id === productId);
          if (results.length > 0) {
            this.product = results[0];
          }
        }
      },
    },
  };

</script>
