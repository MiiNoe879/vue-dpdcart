<template>
  <form class="checkout-form" id="customer_form">
    <div class="form-header">
      <h5>Customer</h5>
    </div>
    <div class="form-body">
      <div v-if="cart">
        <div class="form-group">
          <label for="exampleInputEmail1">First Name
            <span>*</span>
          </label>
          <input
            name="firstname"
            v-validate="'required|alpha'"
            :class="{'input': true, 'is-danger': errors.has('firstname'), 'form-control': true }"
            type="text"
            placeholder="First Name"
            :value="cart.customer.first_name"
            @input="updateCustomerFirstName"
          />
          <span v-show="errors.has('firstname')" class="help is-danger">{{ errors.first('firstname') }}</span>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Last Name
            <span>*</span>
          </label>
          <input
            name="lastname"
            v-validate="'required|alpha'"
            :class="{'input': true, 'is-danger': errors.has('lastname'), 'form-control': true }"
            type="text"
            placeholder="Last Name"
            :value="cart.customer.last_name"
            @input="updateCustomerLastName"
          />
          <span v-show="errors.has('lastname')" class="help is-danger">{{ errors.first('lastname') }}</span>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email
            <span>*</span>
          </label>
          <input
            name="email"
            v-validate="'required|email'"
            placeholder="you@example.com"
            :class="{'input': true, 'is-danger': errors.has('email'), 'form-control': true }"
            :value="cart.customer.email"
            @input="updateCustomerEmail"
            type="email"
          />
          <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
        </div>
        <div class="form-group" v-for="(custom_field, index) of cart.custom_fields" :key="index">
          <label for="required" v-if="custom_field.type !== 'external' && custom_field.type !== 'checkbox'">
            {{custom_field.label}}
            <span v-if="custom_field.required">*</span>
          </label>
          <p v-if="custom_field.type !== 'checkbox'">{{custom_field.description}}</p>
          <div v-if="custom_field.type === 'text'">
            <input
              type="text"
              v-validate="'required'"
              :class="{'input': true, 'is-danger': errors.has('email'), 'form-control': true }"
              :name="custom_field.label"
              :placeholder="custom_field.label"
              :value="custom_field.value"
              @input="updateCustomerCustomFields($event, index)"
              v-if="custom_field.required"
            >
            <input
              type="text"
              :class="{'input': true, 'is-danger': errors.has('email'), 'form-control': true }"
              :name="custom_field.label"
              :placeholder="custom_field.label"
              :value="custom_field.value"
              @input="updateCustomerCustomFields($event, index)"
              v-else
            >
            <span v-show="errors.has(custom_field.label)" class="help is-danger">This field is required</span>
          </div>
          <div v-if="custom_field.type === 'textarea'">
            <textarea
              v-validate="'required'"
              :name="custom_field.label"
              :class="{'input': true, 'is-danger': errors.has('email'), 'form-control': true }"
              :placeholder="custom_field.label"
              :value="custom_field.value"
              @input="updateCustomerCustomFields($event, index)"
              v-if="custom_field.required"
            >
            </textarea>
            <textarea
              :class="{'input': true, 'is-danger': errors.has('email'), 'form-control': true }"
              :placeholder="custom_field.label"
              :value="custom_field.value"
              @input="updateCustomerCustomFields($event, index)"
              v-else
            >
            </textarea>
            <span v-show="errors.has(custom_field.label)" class="help is-danger">This field is required</span>
          </div>
          <div v-if="custom_field.type === 'radio'">
            <div class="radio" v-for="option of custom_field.options" :key="option.key">
              <label>
                <input type="radio" :value="option.key" :name="custom_field.label" :selected="custom_field.value === option.key" v-validate="'required'" v-if="custom_field.required"  @input="updateCustomerCustomFields($event, index)" />
                <input type="radio" :value="option.key" :name="custom_field.label" :selected="custom_field.value === option.key" v-else  @input="updateCustomerCustomFields($event, index)" />
                  {{option.value}}
              </label>
            </div>
            <span v-show="errors.has(custom_field.label)" class="help is-danger">This field is required</span>
          </div>
          <div v-if="custom_field.type === 'select'">
            <select class="form-control" :name="custom_field.label" v-if="custom_field.required" v-validate="'required'"  @input="updateCustomerCustomFields($event, index)">
              <option type="radio" :value="option.key" name="optradio" :selected="custom_field.value === option.key"  v-for="option of custom_field.options" :key="option.key">
                {{option.value}}
              </option>
            </select>
            <select class="form-control" v-else  @input="updateCustomerCustomFields($event, index)">
              <option type="radio" value="">
              </option>
              <option type="radio" :value="option.key" name="optradio" :selected="custom_field.value === option.key"  v-for="option of custom_field.options" :key="option.key">
                {{option.value}}
              </option>
            </select>
            <span v-show="errors.has(custom_field.label)" class="help is-danger">This field is required</span>
          </div>
          <div v-if="custom_field.type === 'checkbox'">
            <div class="form-group custom-control custom-checkbox" style="display: unset;">
              <input
                v-if="custom_field.required"
                :checked="custom_field.value"
                @click="updateCustomerCustomFieldsForCheckbox($event, index)"
                type="checkbox"
                :name="custom_field.label.replace(/\s/g, '')"
                class="custom-control-input"
                :id="custom_field.label.replace(/\s/g, '')"
              />
              <input
                v-else
                type="checkbox"
                :checked="custom_field.value"
                :name="custom_field.label.replace(/\s/g, '')"
                @click="updateCustomerCustomFieldsForCheckbox($event, index)"
                class="custom-control-input"
                :id="custom_field.label.replace(/\s/g, '')"
              />
              <label :for="custom_field.label.replace(/\s/g, '')" class="custom-control-label">
                {{custom_field.label}}
                <span v-if="custom_field.required">*</span>
              </label>
              <p>{{custom_field.description}}</p>
              <span v-show="!custom_field.value" class="help is-danger">This field is required</span>
            </div>
          </div>
        </div>
        <div class="form-group custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="customCheck1" :checked="cart.requires.marketing_optin.enabled" @click="updateCustomerMarketingOptin">
          <label class="custom-control-label" for="customCheck1">{{cart.requires.marketing_optin.message}}</label>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  /* eslint-disable */
  /* ============
   * Checkout/Customer Component
   * ============
   *
   * Gives an idea how components work.
   */
  import { mapState, mapGetters } from 'vuex';
  
  export default {
    /**
     * The name of the component.
     */
    name: 'checkout-customer',
    /**
     * The properties that the component accepts.
     */
    props: {
      checkCustomerInfoValidation: false,
    },

    /**
     * The computed properties that the component can use.
     */
    computed: {
      ...mapState({
        cart: state => state.cart.cart,
      }),
      ...mapGetters({
        loading: 'cart/getLoading',
      }),
    },

    mounted() {
      response: {
      }
    },

    methods: {
      updateCustomerEmail(e) {
        this.$store.dispatch('cart/setCustomerEmail', e.target.value);
      },
      updateCustomerFirstName(e) {
        this.$store.dispatch('cart/setCustomerFirstName', e.target.value);
      },
      updateCustomerLastName(e) {
        this.$store.dispatch('cart/setCustomerLastName', e.target.value);
      },
      updateCustomerCustomFields(e, index) {
        this.$store.dispatch('cart/setCustomerCustomFields', {value: e.target.value, index});
      },
      updateCustomerCustomFieldsForCheckbox(e, index) {
        console.log(index, e.target.checked);
        this.$store.dispatch('cart/setCustomerCustomFields', {value: e.target.checked, index});
      },
      updateCustomerMarketingOptin(e) {
        this.$store.dispatch('cart/setCustomerMarketingOptin', e.target.checked);
      },
      validateForm() {
        this.$validator.validateAll().then((result) => {
          console.log(result);
          const custom_fields = this.cart.custom_fields;
          let flag = true;
          for (const index in custom_fields) {
            if (custom_fields[index].type === 'checkbox' && custom_fields[index].required) {
              if (!custom_fields[index].value) {
                flag = false;
              }
            }
          }
          if (flag) {
            this.$emit('afterCustomerValidate', result);
          } else {
            this.$emit('afterCustomerValidate', false);
          }
        });
      },
    },

    watch: {
      loading: function (newVal, oldVal) {
      },
      checkCustomerInfoValidation: function (newVal, oldVal) {
        if (newVal && !oldVal) {
          this.validateForm();
        }
      },
    },
  };

</script>