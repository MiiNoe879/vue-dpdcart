<template>
  <div class="checkout-form">
    <div class="form-header">
      <h5>Payment</h5>
    </div>
    <div class="form-body">
      <div class="card-container" id="payment_form">
        <div class="card-select">
          <div class="payment-block" id="payment">
            <div class="payment-item">
              <label for="paypal" class="label">
                <input type="radio" name="payment_method" id="paypal" data-target="#credit_card1" value="0" required="" class="" v-model="selectedMethod">
                <span>Paypal</span>
                <a href="https://www.paypal.com/us/webapps/mpp/paypal-popup" class="about-paypal" onclick="javascript:window.open('https://www.paypal.com/us/webapps/mpp/paypal-popup', 'WIPaypal', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700'); return false;">What is PayPal?</a>
                <img src="static/img/paypal-logo.png" alt="">
              </label>
              <div class="description collapse" id="credit_card1">
                <p class="card-des">Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account. SANDBOX ENABLED. You
                  can use sandbox testing accounts only. See the
                  <a href="https://developer.paypal.com/docs/classic/lifecycle/ug_sandbox/">PayPal Sandbox Testing Guide</a> for more details.</p>
              </div>
            </div>
            <!-- /.Cash on delivery -->
            <div class="payment-item">
              <label for="payment_method_pay" class="label active">
                <input type="radio" name="payment_method" id="payment_method_pay" data-target="#credit_card2" value="1" v-model="selectedMethod">
                <span>Credit card</span>
                <img src="static/img/mastar-card.png" alt="">
              </label>
              <div class="description collapse show" id="credit_card2">
                <div class="card-wrapper"></div>
                <!-- /.Card -->
                <div class="form-container active">
                  <form action="" class="card-form" id="card_form">
                    <div class="form-group">
                      <label for="card_number">Card number</label>
                      <div class="input-img">
                        <input
                          id="card_number"
                          name="number"
                          v-validate="'required'"
                          placeholder=""
                          :class="{'input': true, 'is-danger': errors.has('number'), 'form-control': true }"
                          @input="updateCardNumber"
                          type="text"
                        />
                        <span v-show="errors.has('number')" class="help is-danger">{{ cardNumberError }}</span>
                        <img class="form-card-img" src="static/img/visa-card.png" alt="">
                      </div>
                    </div>
                    <div class="row">
                      <div class="form-group col-md-6">
                        <label for="expiration_date">Expiration date</label>
                        <input
                          :class="{'input': true, 'is-danger': cardMonthError && showValidation, 'form-control': true }"
                          placeholder="MM/YY"
                          id="expiration_date"
                          type="tel"
                          name="expiry"
                          @input="updateExpDate"
                          required
                        />
                        <span class="help is-danger" v-show="cardMonthError && showValidation">
                          {{ cardMonthError }}
                        </span>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="security_code">Security code</label>
                        <div class="form-group has-search">
                          <input
                            id="security_code"
                            name="cvc"
                            v-validate="'required'"
                            placeholder=""
                            :class="{'input': true, 'is-danger': errors.has('cvc'), 'form-control': true }"
                            @input="updateCVC"
                            type="number"
                          />
                          <span v-show="errors.has('cvc')" class="help is-danger">{{ cardCvcError }}</span>
                          <img src="static/img/security-code.png" alt="" class="form-control-feedback">
                          <a href="#" class="question">
                            <i class="fas fa-question-circle"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="name_on_card">Name on card</label>
                      <input class="form-control" placeholder="Full name" id="name_on_card" type="text" name="name">
                    </div>
                    <div class="form-group custom-control custom-checkbox" style="display: unset;">
                      <input type="checkbox" v-validate="'required'" name="confirm" class="custom-control-input" id="customCheck4" />
                      <label class="custom-control-label" for="customCheck4">By cliking the button, you are agree to
                        <a href="#">the terms and condition</a>
                      </label>
                      <span v-show="errors.has('confirm')" class="help is-danger">You must check this field</span>
                    </div>
                  </form>
                  <div class="help is-danger" v-if="cardCheckError">
                    <span>{{ cardCheckErrorMessage }}</span>
                  </div>
                </div>
                <!-- /.Card form -->
              </div>
            </div>
            <!-- /.Direct bank transfer -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .is-danger {
    color: red;
  }
</style>

<script>
  /* eslint-disable */
  /* ============
   * Checkout/Payment Component
   * ============
   *
   * Gives an idea how components work.
   */
  import {
    mapState,
    mapGetters
  } from 'vuex';

  export default {
    /**
     * The name of the component.
     */
    name: 'checkout-payment',

    data() {
      return {
        showValidation: false,
        selectedMethod: 1,
        // fields
        name: '',
        email: '',
        specialNote: '',
        address: {
          street: '',
          city: '',
          state: '',
          zip: ''
        },

        card: {
          number: null,
          cvc: null,
          exp_month: '',
          exp_year: '',
          exp_date: null,
        },

        // validation
        cardNumberError: "Card Number is Required",
        cardCvcError: "CVC is Required",
        cardMonthError: "Month and Year is Required",
        cardYearError: null,
        cardCheckSending: false,
        cardCheckError: false,
        cardCheckErrorMessage: '',
        cardObj: null,
      }
    },
    /**
     * The properties that the component accepts.
     */
    props: {
      confirmed: false,
    },

    /**
     * The computed properties that the component can use.
     */
    computed: {
      ...mapState({
        cart: state => state.cart,
        stripeKey: state => state.cart.cart.payment.methods[1].client_side_gateway.pub_api_key,
      }),
      ...mapGetters({
        redirect: 'cart/getRedirect',
      }),
    },

    mounted() {
      this.cardObj = new Card({
        form: document.querySelector('.card-form'),
        container: '.card-wrapper',

        placeholders: {
          number: '**** **** **** ****',

          name: 'Arya Stark',
          expiry: '**/****',
          cvc: '***'
        }
      });
      $('.payment-item .label').on('click', function (event) {
        if ($(this).next().hasClass('show')) {
          $(this).next().collapse('show');
        } else {
          $(this).parents('.payment-block').find('.collapse').collapse('hide');
          $(this).next().collapse('show');
        }
      });

      $(".payment-item .label").click(function () {
        $(".payment-item .label").removeClass("active");
        $(this).addClass("active");
      });
    },

    created() {},

    methods: {
      checkOrder() {
        this.$emit('orderCompleted');
        if (this.selectedMethod === 1) { // if stripe
          this.validate();
        } else { // if paypal
          this.$store.dispatch('cart/paypalCheckout');
        }
      },
      validate() {
        this.showValidation = true;
        this.card.number = this.cardObj.$numberInput[0].value;
        this.card.cvc = this.cardObj.$cvcInput[0].value;
        this.name = this.cardObj.$nameInput[0].value;
        const exp_date = this.cardObj.$expiryDisplay[0].innerText;
        this.card.exp_month = null;
        this.card.exp_year = null;
        const split = exp_date.split("/");
        if (split.length > 0) {
          this.card.exp_month = split[0];
          this.card.exp_year = split[1];
        }

        this.clearCardErrors();
        let valid = true;
        this.$validator.validateAll().then((result) => {
          if (!this.card.number) {
            valid = false;
            this.cardNumberError = "Card Number is Required";
          }
          if (!this.card.cvc) {
            valid = false;
            this.cardCvcError = "CVC is Required";
          }
          if (this.card.exp_month === '**') {
            valid = false;
            this.cardMonthError = "Month and Year is Required";
          }
          if (!this.card.exp_year) {
            valid = false;
            this.cardMonthError = "Month and Year is Required";
          }
          if (valid) {
            this.createToken();
          }
        });
      },
      clearCardErrors() {
        this.cardNumberError = null;
        this.cardCvcError = null;
        this.cardMonthError = null;
        this.cardYearError = null;
      },
      createToken() {
        this.cardCheckError = false;
        window.Stripe.setPublishableKey(this.stripeKey);
        window.Stripe.createToken(this.card, $.proxy(this.stripeResponseHandler, this));
        this.cardCheckSending = true;
      },
      stripeResponseHandler(status, response) {
        this.cardCheckSending = false;
        if (response.error) {
          this.cardCheckErrorMessage = response.error.message;
          this.cardCheckError = true;
        } else {
          // token to create a charge on our server 
          var token_from_stripe = response.id;
          // post to server
          var credit_card = {
            name: this.name,
            exp: {
              month: this.card.exp_month,
              year: this.card.exp_year,
            },
            cvv2: this.card.cvc,
            token: token_from_stripe,
            card_type: this.cardObj.cardType,
          };
          this.$store.dispatch('cart/purchase', credit_card);
        }
      },
      updateCardNumber(e) {
        this.card.number = e.target.value;
        if (this.card.number) {
          this.cardNumberError = null;
        } else {
          this.cardNumberError = "Card Number is Required";
        }
      },
      updateExpDate(e) {
        this.card.exp_date = e.target.value;
        if (this.card.exp_date) {
          this.cardMonthError = null;
        } else {
          this.cardMonthError = "Month and Year is Required";
        }
      },
      updateCVC(e) {
        this.card.cvc = e.target.value;
        if (this.card.cvc) {
          this.cardCvcError = null;
        } else {
          this.cardCvcError = "CVC is Required";
        }
      },
    },

    watch: {
      confirmed: function (newVal) {
        if (newVal) {
          this.checkOrder();
        }
      },
      redirect: function (newVal, oldVal) {
        if (newVal && !oldVal) {
          window.location.href = newVal;
        }
      },
      selectedMethod: function (newVal) {
        this.$emit('paymentMethodChange', newVal);
      },
    },
  };

</script>
