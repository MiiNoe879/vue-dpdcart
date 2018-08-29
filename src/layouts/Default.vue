<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <v-logo />
        <v-language :showCheckout="showCheckout" :showCart="showCart" :index="index" />
      </div>
    </nav>
    <vue-ins-progress-bar></vue-ins-progress-bar>
    <vue-progress-bar></vue-progress-bar>

    <div class="container">
      <div class="row">
        <div class="col col-12">
          <!-- Content will be placed here -->
          <slot></slot>
        </div>
      </div>
    </div>

    <v-footer />

  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import VFooter from '@/components/Footer';
  import VLogo from '@/components/Logo';
  import VLanguage from '@/components/Language';
  /* ============
   * Default Layout
   * ============
   *
   * Used for the home and account pages.
   *
   * Layouts are used to store a lot of shared code.
   * This way the app stays clean.
   */
  /* eslint-disable */

  export default {
    /**
     * The name of the layout.
     */
    name: 'default-layout',

    computed: {
      ...mapGetters({
        productLoading: 'product/getLoading',
        cartLoading: 'cart/getLoading',
      })
    },

    /**
     * The components that the page can use.
     */
    components: {
      VFooter,
      VLogo,
      VLanguage,
    },

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
        default: false,
      },
      showCheckout: {
        type: Boolean,
        default: false,
      },
    },

    /**
     * The data that can be used by the page.
     *
     * @returns {Object} The view-model data.
     */
    data() {
      return {
        menuCollapsed: false,
      };
    },

    /**
     * The methods that the layout can use.
     */
    methods: {
      /**
       * Will log the user out.
       */
      logout() {
        this.$store.dispatch('auth/logout');
      },

      /**
       * Will toggle the menu.
       */
      toggleMenu() {
        this.menuCollapsed = !this.menuCollapsed;
      },
    },
    created() {
      this.$Progress.start();
      // this.$insProgress.start();
    },
    watch: {
      productLoading: function(newVal) {
        if (newVal) {
          this.$Progress.start();
        } else {
          this.$Progress.finish();
        }
      },
      cartLoading: function(newVal) {
        if (newVal) {
          this.$Progress.start();
        } else {
          this.$Progress.finish();
        }
      },
    },
  };

</script>
