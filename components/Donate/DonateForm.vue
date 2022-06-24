<template>
  <section
    class="
      bike-search-form
      donate-form
      text-left
      section-padding
      theme-bg-light
    "
  >
    <div class="text-center" v-if="$fetchState.pending">
      <img src="~assets/images/spinner.gif" alt="" />
    </div>
    <div v-else-if="$fetchState.error">
      <p>Erro ao buscar dados</p>
    </div>
    <div v-else class="theme-container">
      <!--form-->
      <div
        class="search-bike donate-box-width"
        data-aos="fade"
        data-aos-once="true"
      >
        <div class="section-title pb-4">
          <h4 class="them-title mb-0">Donate Now</h4>
          <p class="text-left">
            Lorem orci elementum dictum viverra sed lobortis vitae purus. Vitae
            eget cursus dictum ac tellus faucibus. Porta aliquet neque morbi
            interdum sem enim. Nunc porttitor.
          </p>
        </div>
        <form @submit.prevent class="row">
          <div class="form-floating col-md-6 mb-4">
            <input
              type="text"
              v-model="name"
              @blur="name === '' ? (nameWarn = true) : (nameWarn = false)"
              :class="
                nameWarn
                  ? 'warning-border form-control custom-input'
                  : 'form-control custom-input'
              "
              id="name"
              placeholder="First Name"
            />
            <label class="custom-label" for="name">First Name</label>
            <p v-if="nameWarn" class="warning mb-0 mt-1">
              *First name is required
            </p>
          </div>

          <div class="form-floating col-md-6 mb-4">
            <input
              type="text"
              v-model="lastName"
              id="last-name"
              @blur="
                lastName === '' ? (lastNameWarn = true) : (lastNameWarn = false)
              "
              :class="
                lastNameWarn
                  ? 'warning-border form-control custom-input'
                  : 'form-control custom-input'
              "
              placeholder="Last Name"
            />
            <label class="custom-label" for="last-name">Last Name</label>
            <p v-if="lastNameWarn" class="warning mb-0 mt-1">
              *Last name is required
            </p>
          </div>

          <div class="form-floating col-md-6 mb-4">
            <input
              type="text"
              v-model="phone"
              @blur="phone === '' ? (phoneWarn = true) : (phoneWarn = false)"
              :class="
                phoneWarn
                  ? 'warning-border form-control custom-input'
                  : 'form-control custom-input'
              "
              id="Phone"
              placeholder="Phone Number"
            />
            <label class="custom-label" for="Phone">Phone Number</label>
            <p v-if="phoneWarn" class="warning mb-0 mt-1">
              *Phone number is required
            </p>
          </div>

          <div class="form-floating col-md-6 mb-4">
            <input
              type="email"
              v-model="email"
              @blur="emailValid()"
              @change="emailValid()"
              :class="
                emailWarn || emailValidWarn
                  ? 'warning-border form-control custom-input'
                  : 'form-control custom-input'
              "
              id="Email"
              placeholder="Email Address"
            />
            <label class="custom-label" for="Email">Email Address</label>
            <p v-if="emailWarn && email.length == 0" class="warning mb-0 mt-1">
              *Email is required
            </p>
            <p
              v-if="emailValidWarn && email.length > 0"
              class="warning mb-0 mt-1"
            >
              *Invalid email address
            </p>
          </div>

          <div class="form-floating col-md-6 mb-4">
            <select
              @blur="
                country === '' ? (countryWarn = true) : (countryWarn = false)
              "
              :class="
                countryWarn
                  ? 'warning-border form-control custom-input'
                  : 'form-control custom-input'
              "
              v-model="country"
              placeholder="Country"
            >
              <option>Select Country</option>
              <option
                v-for="(country, index) in countries"
                :key="index"
                :value="country"
              >
                {{ country.name }}
              </option>
            </select>
            <label class="custom-label" for="Country">Country</label>
            <p v-if="countryWarn" class="warning mb-0 mt-1">
              *Please select your country
            </p>
          </div>

          <div class="form-floating col-md-6 mb-4">
            <input
              type="text"
              @blur="state === '' ? (stateWarn = true) : (stateWarn = false)"
              :class="
                stateWarn
                  ? 'warning-border form-control custom-input'
                  : 'form-control custom-input'
              "
              v-model="state"
              placeholder="State"
            />
            <label class="custom-label" for="Country">State</label>
            <p v-if="stateWarn" class="warning mb-0 mt-1">
              *Please select your state
            </p>
          </div>

          <div class="form-floating col-md-6 mb-4">
            <input
              type="text"
              @blur="
                address === '' ? (addressWarn = true) : (addressWarn = false)
              "
              :class="
                addressWarn
                  ? 'warning-border form-control custom-input'
                  : 'form-control custom-input'
              "
              min="0"
              max="12"
              id="Address"
              v-model="address"
              placeholder="Address"
            />
            <label class="custom-label" for="Address">Address</label>
            <p v-if="addressWarn" class="warning mb-0 mt-1">
              *Address is required
            </p>
          </div>

          <div class="form-floating col-md-6 mb-4">
            <input
              type="text"
              @blur="
                zipCode === '' ? (zipCodeWarn = true) : (zipCodeWarn = false)
              "
              :class="
                zipCodeWarn
                  ? 'warning-border form-control custom-input'
                  : 'form-control custom-input'
              "
              id="Email"
              v-model="zipCode"
              placeholder="Zip"
            />
            <label class="custom-label" for="Zip">Zip Code</label>
            <p v-if="zipCodeWarn" class="warning mb-0 mt-1">
              *Zip code is required
            </p>
          </div>

          <div class="form-floating col-md-12 mb-4">
            <textarea
              @blur="
                message === '' ? (messageWarn = true) : (messageWarn = false)
              "
              :class="
                messageWarn
                  ? 'warning-border form-control custom-input'
                  : 'form-control custom-input'
              "
              placeholder="Your Message"
              v-model="message"
            ></textarea>
            <label class="custom-label" for="Message">Your Message</label>
            <p v-if="messageWarn" class="warning mb-0 mt-1">
              *Message is required
            </p>
          </div>

          <div class="col-md-6 mb-4 custom-btn-radio">
            <div
              class="
                btn-group
                w-100
                h-100
                align-items-center
                justify-content-between
              "
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <div
                class="donate-type h-100"
                v-for="amount in donateAmt"
                :key="amount.id"
              >
                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  :id="amount.id"
                  autocomplete="off"
                  @input="totalDonate = amount.amount"
                  :checked="totalDonate == amount.amount"
                />
                <label
                  class="btn btn-outline-dark h-100 align-items-center d-grid"
                  :for="amount.id"
                  >${{ amount.amount }}</label
                >
              </div>
            </div>
          </div>

          <div class="form-floating col-md-6 mb-4">
            <input
              type="text"
              v-model="totalDonate"
              @blur="
                totalDonate === null
                  ? (totalDonateWarn = true)
                  : (totalDonateWarn = false)
              "
              :class="
                totalDonateWarn
                  ? 'warning-border form-control custom-input'
                  : 'form-control custom-input'
              "
              id="Email"
              placeholder="Type amount (USD)"
            />
            <label class="custom-label" for="Zip">Type amount (USD)</label>
            <p v-if="totalDonateWarn" class="warning mb-0 mt-1">
              *Enter donation amount
            </p>
          </div>

          <div class="form-floating icon-type col-md-6 mb-4">
            <input
              type="text"
              @blur="
                cardNumber === ''
                  ? (cardNumberWarn = true)
                  : (cardNumberWarn = false)
              "
              :class="
                cardNumberWarn
                  ? 'warning-border form-control custom-input'
                  : 'form-control custom-input'
              "
              id="Email"
              v-model="cardNumber"
              placeholder="Card Number"
            />
            <span><i class="fal fa-credit-card"></i></span>
            <label class="custom-label" for="Zip">Card Number</label>
            <p v-if="cardNumberWarn" class="warning mb-0 mt-1">
              *Card number is required
            </p>
          </div>

          <div class="col-md-6 mb-4">
            <div class="row">
              <div class="form-floating icon-type col-md-6">
                <input
                  type="date"
                  @blur="
                    expDate === ''
                      ? (expDateWarn = true)
                      : (expDateWarn = false)
                  "
                  :class="
                    expDateWarn
                      ? 'warning-border form-control custom-input'
                      : 'form-control custom-input'
                  "
                  id="MM/YY"
                  v-model="expDate"
                  placeholder="Card Number"
                />
                <span><i class="fal fa-credit-card"></i></span>
                <label class="custom-label" for="MM/YY">MM/YY</label>
                <p v-if="expDateWarn" class="warning mb-0 mt-1">
                  *Expirey date is required
                </p>
              </div>

              <div class="form-floating icon-type mob-pad-top col-md-6">
                <input
                  type="text"
                  @blur="
                    cvvNumber === '' ? (cvvWarn = true) : (cvvWarn = false)
                  "
                  :class="
                    cvvWarn
                      ? 'warning-border form-control custom-input'
                      : 'form-control custom-input'
                  "
                  id="Email"
                  v-model="cvvNumber"
                  placeholder="CVV Number"
                />
                <span><i class="fal fa-credit-card-front"></i></span>
                <label class="custom-label" for="Zip">CVV Number</label>
                <p v-if="cvvWarn" class="warning mb-0 mt-1">
                  *CVV number is required
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-6 mb-4">
            <div class="form-group cardbox2">
              <div class="inputGroup">
                <input
                  id="radio1"
                  name="radio1"
                  type="radio"
                  value="true"
                  v-model="payPal"
                  @input="handlePaypal"
                />
                <label for="radio1" :class="payViaWarn ? 'warning-border' : ''"
                  >&nbsp; <img src="~assets/images/paypal.png"
                /></label>
              </div>
            </div>
          </div>

          <div class="col-md-6 mb-4">
            <div class="form-group cardbox2">
              <div class="inputGroup">
                <input
                  id="radio2"
                  name="radio2"
                  type="radio"
                  value="true"
                  v-model="stripe"
                  @input="handleStripe"
                />
                <label for="radio2" :class="payViaWarn ? 'warning-border' : ''"
                  >&nbsp; <img height="25px" src="~assets/images/stripe.png"
                /></label>
              </div>
            </div>
          </div>
          <p v-if="payViaWarn" class="warning mb-4">
            *Please select any payment method
          </p>

          <div class="col-md-12">
            <div class="theme-btn universal-btn" id="button-3">
              <div id="circle"></div>
              <button type="submit" class="donate-now" @click="submitData()">
                Donate <span v-if="totalDonate">${{ totalDonate }} </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import api from '../../services'
export default {
  data() {
    return {
      name: '',
      nameWarn: false,
      lastName: '',
      lastNameWarn: false,
      phone: '',
      phoneWarn: false,
      email: '',
      emailWarn: false,
      emailValidWarn: false,
      country: 'Select Country',
      countryWarn: false,
      state: '',
      stateWarn: false,
      address: '',
      addressWarn: false,
      zipCode: '',
      zipCodeWarn: false,
      message: '',
      messageWarn: false,
      totalDonate: null,
      totalDonateWarn: false,
      cardNumber: '',
      cardNumberWarn: false,
      expDate: '',
      expDateWarn: false,
      cvvNumber: '',
      cvvWarn: false,
      payPal: false,
      stripe: false,
      payVia: '',
      payViaWarn: false,
      isValid: false,
      donateAmt: [
        {
          id: 'btnradio1',
          amount: 5,
        },
        {
          id: 'btnradio2',
          amount: 15,
        },
        {
          id: 'btnradio3',
          amount: 25,
        },
        {
          id: 'btnradio4',
          amount: 50,
        },
        {
          id: 'btnradio5',
          amount: 100,
        },
      ],
      countries: [],
    }
  },
  methods: {
    async submitData() {
      this.checkValid()
      if (this.isValid) {
        const inputData = {
          first_name: this.name,
          last_name: this.lastName,
          phone_number: this.phone,
          email_address: this.email,
          country: this.country,
          state: this.state,
          address: this.address,
          zip_code: this.zipCode,
          your_message: this.message,
          ammount: this.totalDonate.toString(),
          card_number: this.cardNumber,
          date: this.expDate,
          cvv: this.cvvNumber,
          paypal: this.payPal,
          stripe: this.stripe,
        }
        await api.product.blogPostService('donations', inputData)
        this.$toasted.show('Sucesso!', {
            position: 'top-center',
            duration: 3000
          })
          this.name = ''
          this.lastName = ''
          this.phone = ''
          this.email = ''
          this.country = ''
          this.state = ''
          this.address = ''
          this.zipCode = ''
          this.message = ''
          this.totalDonate = ''
          this.cardNumber = ''
          this.expDate = ''
          this.cvvNumber = ''
          this.payPal = false
          this.stripe = false
      } else {
        this.$toasted.show('Erro ao enviar dados', {
          position: 'top-center',
          duration: 3000
        })
      }
    },
    handlePaypal() {
      this.payPal = true
      this.stripe = false
    },
    handleStripe() {
      this.stripe = true
      this.payPal = false
    },
    emailValid() {
      var check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.email
      )
      if (this.email === '') {
        this.emailWarn = true
      } else if (!check) {
        this.emailValidWarn = true
      } else {
        this.emailWarn = false
        this.emailValidWarn = false
      }
    },
    payViaWarning() {
      if (this.payPal == false && this.stripe == false) {
        this.payViaWarn = true
      } else {
        this.payViaWarn = false
      }
    },
    checkValid() {
      this.emailValid()
      if (
        this.name === '' ||
        this.nameWarn ||
        this.lastName === '' ||
        this.lastNameWarn ||
        this.phone === '' ||
        this.phoneWarn ||
        this.email === '' ||
        this.emailWarn ||
        this.emailValidWarn ||
        this.country === '' ||
        this.countryWarn ||
        this.state === '' ||
        this.stateWarn ||
        this.address === '' ||
        this.addressWarn ||
        this.zipCode === '' ||
        this.zipCodeWarn ||
        this.message === '' ||
        this.messageWarn ||
        this.totalDonate === null ||
        this.totalDonateWarn ||
        this.cardNumber === '' ||
        this.cardNumberWarn ||
        this.expDate === '' ||
        this.expDateWarn ||
        this.cvvNumber === '' ||
        this.cvvWarn
      ) {
        this.isValid = false
      } else {
        this.isValid = true
      }
      if (this.name === '') {
        this.nameWarn = true
      } else {
        this.nameWarn = false
      }
      if (this.lastName === '') {
        this.lastNameWarn = true
      } else {
        this.lastNameWarn = false
      }
      if (this.phone === '') {
        this.phoneWarn = true
      } else {
        this.phoneWarn = false
      }
      if (this.country === '') {
        this.countryWarn = true
      } else {
        this.countryWarn = false
      }
      if (this.state === '') {
        this.stateWarn = true
      } else {
        this.stateWarn = false
      }
      if (this.address === '') {
        this.addressWarn = true
      } else {
        this.addressWarn = false
      }
      if (this.zipCode === '') {
        this.zipCodeWarn = true
      } else {
        this.zipCodeWarn = false
      }
      if (this.message === '') {
        this.messageWarn = true
      } else {
        this.messageWarn = false
      }
      if (this.totalDonate === null) {
        this.totalDonateWarn = true
      } else {
        this.totalDonateWarn = false
      }
      if (this.cardNumber === '') {
        this.cardNumberWarn = true
      } else {
        this.cardNumberWarn = false
      }
      if (this.expDate === '') {
        this.expDateWarn = true
      } else {
        this.expDateWarn = false
      }
      if (this.cvvNumber === '') {
        this.cvvWarn = true
      } else {
        this.cvvWarn = false
      }
    },
  },
  async fetch() {
    this.countries = await api.product.blogService('countries')
  },
}
</script>
<style lang="scss">
$them-color: #fd5044;
// Search
.search-bike {
  border: 1px solid #ddd;
  padding: 25px;
  background: #fff;
  border-radius: 6px;
  margin-bottom: 50px;

  .textarea-height {
    height: 110px !important;
    resize: none;
    padding-top: 16px !important;
  }

  &.donate-box-width {
    max-width: 1100px;
    margin: auto;
  }
  button.donate-now {
    font-size: 18px !important;
  }
  label.custom-label {
    padding-left: 47px;
    color: #686868;
    font-size: 14px;
    padding-top: 13px;
  }

  .form-floating span {
    position: absolute;
    top: 14px;
    left: 22px;
  }

  textarea {
    min-height: 110px;
    resize: none;
  }
  textarea.form-control.custom-input {
    padding-top: 14px !important;
    line-height: 21px !important;
  }
}

.bike-search-form {
  p {
    max-width: 70%;
    margin-left: 0 !important;
  }
}
.donate-form {
  input {
    padding: 0.375rem 0.75rem !important;
  }
  label.custom-label {
    padding-left: 0.75rem !important;
    left: auto;
    display: grid;
  }
}
section.bike-search-form.donate-form input {
  padding-left: 0.75rem !important;
  padding-right: 0.75rem !important;
}

.donate-form form .form-floating > .custom-input:focus ~ .custom-label,
.donate-form
  form
  .form-floating
  > .custom-input:not(:placeholder-shown)
  ~ .custom-label,
.donate-form form .form-floating > .form-select ~ .custom-label {
  display: block;
  transform: scale(0.85) translateY(-11px) translateX(0.9rem) !important;
  padding-left: 0 !important;
}

.custom-btn-radio .btn.btn-outline-dark:focus {
  box-shadow: none;
}

.donate-type {
  label.btn.btn-outline-dark {
    max-width: 80px;
    min-width: 80px;
    border: 1px solid #c8c8c8;
  }
  .btn-check:checked + .btn-outline-dark {
    border: none !important;
  }
}
.search-bike .form-floating.icon-type input {
  padding-left: 35px !important;
}

.inputGroup label.inputGroup {
  background-color: #fff;
  display: block;
  margin: 10px 0;
  position: relative;
}

.inputGroup {
  label {
    padding: 12px 4px;
    width: 100%;
    display: block;
    text-align: left;
    color: #3c454c;
    cursor: pointer;
    position: relative;
    z-index: 2;
    transition: color 200ms ease-in;
    overflow: hidden;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    &:before {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      content: '';
      /* border-color: #fd5044 ;
            background-color: #fd5044; */
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale3d(1, 1, 1);
      transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
      opacity: 0;
      z-index: -1;
    }

    &:after {
      width: 22px;
      height: 22px;
      content: '';
      border: 2px solid #d1d7dc;
      background-color: #fff;
      background-repeat: no-repeat;
      background-position: 2px 3px;
      border-radius: 50%;
      z-index: 2;
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      transition: all 200ms ease-in;
    }
  }

  input:checked ~ label {
    color: #fff;
    &:before {
      transform: translate(-50%, -50%) scale3d(56, 56, 1);
      opacity: 1;
    }

    &:after {
      background-color: #fd5044;
      border-color: #fd5044;
    }
  }

  input {
    width: 32px;
    height: 32px;
    order: 1;
    z-index: 2;
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    visibility: hidden;
  }
}

// Responsive
@media screen and (max-width: 1100px) {
  .donate-type label.btn.btn-outline-dark {
    max-width: 70px;
    min-width: 70px;
  }
}

@media screen and (max-width: 991px) {
  .donate-type label.btn.btn-outline-dark {
    max-width: 60px;
    min-width: 60px;
    padding: 2px;
  }
}

@media screen and (max-width: 767px) {
  .donate-type label.btn.btn-outline-dark {
    max-width: 70px;
    min-width: 80px;
    padding: 7px;
  }
  .mob-pad-top {
    margin-top: 15px;
  }
  .icon-type.mob-pad-top {
    margin-top: 15px;
  }
  .search-bike {
    padding: 15px;
  }
}

@media screen and (max-width: 579px) {
  .donate-type label.btn.btn-outline-dark {
    max-width: 70px;
    min-width: 38px;
    padding: 4px;
    font-size: 12px;
  }
}
</style>
