<template>
  <div class="checkout-form">
    <div class="form-header">
      <h5>Shipping</h5>
    </div>
    <div class="form-body">
      <form id="shipping_form">
        <div class="form-group">
          <label for="address1">Address line 1
            <span>*</span>
          </label>
          <input
            name="address1"
            v-validate="'required'"
            :class="{'input': true, 'is-danger': errors.has('address1'), 'form-control': true }"
            type="text"
            placeholder="Address Line1"
            :value="cart.cart.shipping.location.address1"
            @input="updateAddress1"
          />
          <span v-show="errors.has('address1')" class="help is-danger">The Address Line1 field is required</span>
        </div>
        <div class="form-group">
          <label for="address2">Address line 2
          </label>
          <input
            name="address2"
            :class="{'input': true, 'is-danger': errors.has('address2'), 'form-control': true }"
            type="text"
            placeholder="Address Line2"
            :value="cart.cart.shipping.location.address2"
            @input="updateAddress2"
          />
          <span v-show="errors.has('address2')" class="help is-danger">The Address Line2 field is required</span>
        </div>
        <div class="row">
          <div class="form-group col-md-12">
            <label>Country
              <span>*</span>
            </label>
            <list-select
              :class="{ 'is-danger': !selectedCountry  }"
              :list="cart.cart.shipping.countries"
              optionValue="value"
              optionText="value"
              :selectedItem="selectedCountry"
              @select="onSelectCountry">
            </list-select>
            <span class="help is-danger" v-show="!selectedCountry && showValidation">
              This field is required.
            </span>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-md-12">
            <label for="city">City
              <span>*</span>
            </label>
            <input
              name="city"
              v-validate="'required'"
              :class="{'input': true, 'is-danger': errors.has('city'), 'form-control': true }"
              type="text"
              placeholder="City"
              :value="cart.cart.shipping.location.city"
              @input="updateCity"
            />
            <span v-show="errors.has('city')" class="help is-danger">{{ errors.first('city') }}</span>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-md-6">
            <label>State
              <span>*</span>
            </label>
            <list-select
              :class="{ 'is-danger': !selectedZone && showValidation }"
              :list="cart.cart.shipping.zones"
              optionValue="value"
              optionText="value"
              :selectedItem="selectedZone"
              @select="onSelectZone">
            </list-select>
            <span class="help is-danger" v-show="!selectedZone && showValidation">
              This field is required.
            </span>
          </div>
          <div class="form-group col-md-6">
            <label for="city">ZIP code
              <span>*</span>
            </label>
            <input
              name="zipcode"
              v-validate="'required'"
              :class="{'input': true, 'is-danger': errors.has('zipcode'), 'form-control': true }"
              type="text"
              placeholder="Zip Code"
              :value="cart.cart.shipping.location.postal_code"
              @input="updatePostalCode"
            />
            <span v-show="errors.has('zipcode')" class="help is-danger">{{ errors.first('zipcode') }}</span>
          </div>
        </div>
        <div class="form-group custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="customCheck3">
          <label class="custom-control-label" for="customCheck3">Use this address for future shipping</label>
        </div>
        <div class="row" v-if="cart.cart.requires.shipping_request">
          <div class="form-group col-md-12">
            <label for="city">Shipping Method
              <span>*</span>
            </label>
            <list-select
              :class="{ 'is-danger': !selectedShippingOption && showValidation }"
              :list="cart.cart.shipping.options"
              optionValue="value"
              optionText="value"
              :selectedItem="selectedShippingOption"
              @select="onSelectShippingOption">
            </list-select>
            <span class="help is-danger" v-show="!selectedShippingOption && showValidation">
              This field is required.
            </span>
          </div>
        </div>
        <input type="submit" style="display: none;" />
      </form>
    </div>
  </div>
</template>

<style>
  .v-select .dropdown-toggle {
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
  .ui.dropdown > .dropdown.icon[data-v-4030daa2]:before {
    content: '';
  }
</style>

<script>
  /* eslint-disable */
  /* ============
   * Checkout/Shipping Component
   * ============
   *
   * Gives an idea how components work.
   */
  import {
    mapState,
    mapGetters
  } from 'vuex';
  import { ListSelect } from 'vue-search-select';

  export default {
    /**
     * The name of the component.
     */
    name: 'checkout-shipping',

    components: {
      ListSelect,
    },

    data() {
      return {
        showValidation: false,
      }
    },
    /**
     * The properties that the component accepts.
     */
    props: {
      checkShippingInfoValidation: false,
    },

    /**
     * The computed properties that the component can use.
     */
    computed: {
      ...mapState({
        cart: state => state.cart,
        country_code: state => state.cart.cart.shipping.location.country_code,
        province: state => state.cart.cart.shipping.location.province,
        option_id: state => state.cart.cart.shipping.option_id,
      }),
      ...mapGetters({
        selectedCountry: 'cart/getSelectedCountry',
        selectedZone: 'cart/getSelectedZone',
        selectedShippingOption: 'cart/getSelectedShippingOption',
      }),
    },

    mounted() {
      const { countries, zones, options } = this.cart.cart.shipping;
      const country_filters = countries.filter(country => country.key === this.country_code);
      const zone_filters = zones.filter(zone => zone.key === this.province);
      const option_filters = options.filter(option => option.key === Number(this.option_id));
      this.$store.dispatch('cart/setSelectedCountry', country_filters[0]);
      this.$store.dispatch('cart/setSelectedZone', zone_filters[0]);
      this.$store.dispatch('cart/setSelectedShippingOption', option_filters[0]);
    },

    methods: {
      updateAddress1(e) {
        this.$store.dispatch('cart/setAddress1', e.target.value);
      },
      updateAddress2(e) {
        this.$store.dispatch('cart/setAddress2', e.target.value);
      },
      updateCity(e) {
        this.$store.dispatch('cart/setCity', e.target.value);
      },
      updatePostalCode(e) {
        this.$store.dispatch('cart/setPostalCode', e.target.value);
      },
      getNewShippingOptions() {
        this.$store.dispatch('cart/setSelectedShippingOption', null);
        this.$store.dispatch('cart/setOptionID', null);
        this.$store.dispatch('cart/setShippingOptions', []);
        this.$store.dispatch('cart/getNewShippingOptions');
      },
      onSelectCountry(newVal) {
        if (!this.selectedCountry || !_.isEmpty(this.selectedCountry)) {
          this.$store.dispatch('cart/setSelectedCountry', newVal);
          this.$store.dispatch('cart/setSelectedZone', null);
          this.$store.dispatch('cart/setZones', newVal.key);
          this.$store.dispatch('cart/setCountryCode', newVal.key);
          this.getNewShippingOptions();
        } else if (!newVal || _.isEmpty(newVal)) {
          this.$store.dispatch('cart/setSelectedCountry', null);
          this.$store.dispatch('cart/setSelectedZone', null);
          this.$store.dispatch('cart/setZones', null);
          this.$store.dispatch('cart/setCountryCode', null);
          this.getNewShippingOptions();
        } else if (newVal.key !== this.selectedCountry.key) {
          this.$store.dispatch('cart/setSelectedCountry', newVal);
          this.$store.dispatch('cart/setSelectedZone', null);
          this.$store.dispatch('cart/setZones', newVal.key);
          this.$store.dispatch('cart/setCountryCode', newVal.key);
          this.getNewShippingOptions();
        }
      },
      onSelectZone(newVal) {
        if (newVal && !_.isEmpty(newVal)) {
          this.$store.dispatch('cart/setSelectedZone', newVal);
          this.$store.dispatch('cart/setProvince', newVal.key);
        } else {
          this.$store.dispatch('cart/setSelectedZone', null);
          this.$store.dispatch('cart/setProvince', null);
        }
      },
      onSelectShippingOption(newVal) {
        if (newVal && !_.isEmpty(newVal)) {
          this.$store.dispatch('cart/setSelectedShippingOption', newVal);
          this.$store.dispatch('cart/setOptionID', newVal.key);
          this.$store.dispatch('cart/postShippingOption', false);
        } else {
          this.$store.dispatch('cart/setSelectedShippingOption', null);
          this.$store.dispatch('cart/setOptionID', null);
        }
      },
      validateForm() {
        this.showValidation = true;
        this.$validator.validateAll().then((result) => {
          if (this.selectedCountry && this.selectedZone && this.selectedShippingOption) {
            this.$emit('afterShippingValidate', result);
          } else {
            this.$emit('afterShippingValidate', false);
          }
        });
      },
    },

    watch: {
      checkShippingInfoValidation: function (newVal, oldVal) {
        if (newVal && !oldVal) {
          this.validateForm();
        }
      },
    },
  };

</script>
