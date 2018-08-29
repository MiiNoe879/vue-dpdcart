<template>
  <v-layout :showCheckout="false" :showCart="true">
    <v-card contextual-style="dark">
      <div slot="body">
        <div class="product-grid-content">
          <div class="container">
            <div class="row">
              <div class="col-sm-6 col-lg-4" v-for="product of paginatedData" :key="product.id" v-if="paginatedData">
                <div class="product-grid">
                  <div class="product-img justify-content-center align-items-center">
                    <img :src="product.widget_image_portrait" class="img-fluid" alt>
                  </div>
                  <div class="product-info">
                    <h3 class="title">
                      <!-- <router-link :to="{ name: 'product.index', params: { productId: product.id }}">{{product.name}}</router-link> -->
                      <router-link :to="`/product/${product.id}`">{{product.name}}</router-link>
                    </h3>
                    <h5 class="subtitle" v-html="product.description"></h5>
                    <div class="d-flex justify-content-between">
                      <div class="price">{{product.price}}</div>
                      <div class="">
                        <button
                          class="btn"
                          @click="addProductToCart(product)"
                          :disabled="productAdding && selectedProduct===product"
                        >
                          <i class="fa fa-fw fa-refresh fa-spin" v-if="productAdding && selectedProduct===product"></i>
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /.End of product item -->
              </div>
            </div>
          </div>
        </div>
        <!-- /.End of product content -->
        <div style="display: flex; justify-content: center;">
          <nav v-if="pageCount">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" @click="pageNumber=0" aria-label="Previous">
                  <i class="fa fa-fast-backward" aria-hidden="true"></i>
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" @click="pageNumber>0 ? pageNumber-=1 : pageNumber" aria-label="Previous">
                  <i class="fa fa-step-backward" aria-hidden="true"></i>
                </a>
              </li>
              <li class="page-item" v-show="pageNumber>=2 && pageCount>3">
                <span>...</span>
              </li>
              <li
                v-for="index in pageCount"
                :key="index"
                :class="pageNumber==(index-1) ? 'page-item active' : 'page-item'"
                v-show="(index>=pageNumber && index<=pageNumber+2) || (index==pageCount-2 && pageNumber>=pageCount-2) || (pageNumber==0 && index==3)"
              >
                <a class="page-link" @click="pageNumber=index-1">{{index}}</a>
              </li>
              <li class="page-item" v-show="pageNumber<pageCount-2 && pageCount>3">
                <span>...</span>
              </li>
              <li class="page-item">
                <a class="page-link" @click="pageNumber<pageCount-1 ? pageNumber+=1 : pageNumber" aria-label="Next">
                  <i class="fa fa-step-forward" aria-hidden="true"></i>
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" @click="pageNumber=pageCount-1" aria-label="Previous">
                  <i class="fa fa-fast-forward" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </nav>
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
   * Home Index Page
   * ============
   *
   * The home index page.
   */
   /* eslint-disable */

  import { mapState, mapGetters } from 'vuex';
  import VLayout from '@/layouts/Default';
  import VCard from '@/components/Card';

  export default {
    /**
     * The name of the page.
     */
    name: 'home-index',

    props:{
      size:{
        type: Number,
        required: false,
        default: 12,
      }
    },

    data: function () {
      return {
        pageNumber: 0,
        selectedProduct: null,
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
      paginatedData() {
        const start = this.pageNumber * this.size,
        end = start + this.size;
        if (this.products) {
          return this.products.slice(start, end);
        }
        return null;
      },
      pageCount() {
        return Math.ceil(this.products.length / this.size);
      },
    },

    created() {
      this.$store.dispatch('product/getProducts');
      this.$store.dispatch('cart/setCart');
    },

    methods: {
      addProductToCart(product) {
        this.selectedProduct = product;
        this.$store.dispatch('cart/addProductToCart', product);
      },
      nextPage(){
         this.pageNumber++;
      },
      prevPage(){
        this.pageNumber--;
      },
      pageCount(){
        let l = this.products.length,
        s = this.size;
        return Math.floor(l/s);
      },
    },

    watch: {
      productAdding: function(newVal, oldVal) {
        if (!newVal && oldVal) {
          this.$router.push({ name: 'cart.index' });
        }
      },
    },
  };

</script>
