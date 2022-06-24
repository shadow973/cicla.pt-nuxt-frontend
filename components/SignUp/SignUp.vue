<template>
    <div>
      <div class="text-center" v-if="$fetchState.pending">
      <img src="~assets/images/spinner.gif" style="width: 60px;padding-top: 300px !important;">
      </div>
      <div v-else-if="$fetchState.error">
      <p>Erro ao buscar dados</p>
      </div>
      <section v-else class="login contact-us section-padding theme-bg-light signUp">
        <div class="theme-container">
            <div class="row justify-content-center relative-position">
                 <div class="login-img-cycle mob-css">
                    <img src="~assets/images/login-cycle-img.png" alt="">
                </div>
                <div class="main-login-form">
                    <div class="get-in-GET-touch signUp-width">
                        <h4 class="them-title text-center">Registo</h4>
                        <p class="text-center">Os dados recolhidos tem o único propósito de permitir o normal funcionamento da Cicla.</p>
                        <form @keypress.enter.prevent>
                            <div class="row mb-3">
                              <div class="form-floating col-12 col-md-6 mb-4">
                                <input type="text" :class="fNameWarn ? 'warning-border' : ''" class="form-control custom-input" id="Name" placeholder="Nome" v-model="fullName" @blur="validFname">
                                <span v-if="fNameWarn" class="warning mb-0 mt-1">*Nome é obrigatório</span>
                                <label class="custom-label" for="Name">Nome</label>
                              </div>
                              <div class="form-floating col-12 col-md-6 mb-4">
                                <input type="email" :class="emailWarn || emailValidWarn ? 'warning-border' : ''" class="form-control custom-input" id="email" placeholder="Email / User" v-model="email" @change="validEmail" @blur="validEmail">
                                <span v-if="emailWarn && email.length == 0" class="warning">*Email é obrigatório</span>
                                <span v-if="emailValidWarn" class="warning mb-0 mt-1">*Email inválido</span>
                                <label class="custom-label" for="email">Email</label>
                              </div>
                              <div class="form-floating col-12 col-md-6 mb-4">
                                <input type="password" :class="passwordWarn || passwordWarning ? 'warning-border' : ''" class="form-control custom-input" id="password" placeholder="Palavra-passe" v-model="password" @blur="validPassword">
                                <span v-if="passwordWarn" class="warning mb-0 mt-1">*Palavra-passe é obrigatória</span>
                                <span v-if="passwordWarning" class="warning mb-0 mt-1">*As palavras-passe não correspondem. Tente de novo.</span>
                                <label class="custom-label" for="password">Palavra-passe</label>
                              </div>
                              <div class="form-floating col-12 col-md-6 mb-4">
                                <input type="password" :class="cPasswordWarn ? 'warning-border' : ''" class="form-control custom-input" id="confirm-password" placeholder="Repetir Password" v-model="confirmPassword" @blur="validCPassword">
                                <span v-if="cPasswordWarn" class="warning mb-0 mt-1">*Confirmação de palavra-passe é obrigatória</span>
                                <label class="custom-label" for="confirm-password">Repetir Palavra-Passe</label>
                              </div>
                              <div class="form-floating col-12">
                                <google-autocomplete
                                  id="city"
                                  types="(cities)"
                                  v-model="city"
                                  @change="setCity"
                                  :classname="cityWarn ? 'warning-border form-control' : 'form-control'"
                                  placeholder="Localidade"
                                  country="pt"
                                  v-on:placechanged="getToData"
                                  v-on:no-results-found="checkValue"
                                >
                                </google-autocomplete>
                                <span class="warning mb-0 mt-1">
                                  {{ cityWarn ? '*Localidade is required' : '' }}
                                </span>
                                <label class="custom-label" for="city">Localidade</label>
                              </div>

                            </div>

                              <div class="d-inline-flex w-100 justify-content-between align-items-center mb-4 login-check signup-check">
                                <div class="col-md-6  col-xs-12">
                                    <div class="form-check">
                                    <input
                                      type="checkbox"
                                      class="form-check-input set-check-box"
                                      id="exampleCheck1"
                                      v-model="rememberCheck"
                                      @input="validCheck"
                                    >
                                    <label class="form-check-label set-term-text" for="exampleCheck1">Concordo com os <a href="/terms-of-use" target="_blank" class="tc-popup">termos e condições da Cicla.</a></label>
                                    </div>
                                    <span class="warning">
                                      {{ rememberCheckWarn ? '*Please accept the terms & conditions' : '' }}
                                    </span>
                                  </div>
                              </div>
                              <div class="form-floating text-center mb-4">
                                <div class="theme-btn universal-btn" id="button-3">
                                    <div id="circle"></div>
                                    <nuxt-link to="">
                                    <button type="submit" @click="RegisterBtn"><span>Registo <i class="fal fa-arrow-right"></i></span></button>
                                    </nuxt-link>
                                </div>
                              </div>
                              <div class="text-center sign-in">
                                  <label for="sign-in">Já tem conta? Faça </label> <span><nuxt-link to="/login"> Login</nuxt-link></span>
                              </div>
                         </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Termos e Condições</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                {{ terms.description }}
              </div>
              <div class="modal-footer">
                <div class="form-floating mx-3 my-2">
                  <div class="theme-btn universal-btn" id="button-3">
                      <div id="circle"></div>
                      <button type="button" data-bs-dismiss="modal">OK</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  </div>
</template>

<script>
import api from '../../services'
import { mapActions, mapGetters } from 'vuex'
    export default {
        data(){
          return{
            verifyVisible: false,
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            addressHolder: '',
            latitude: '',
            longitude: '',
            city: '',
            country: '',
            taxPayer: '',
            number: '',
            genre: '',
            dob: '',
            isValid: false,
            fNameWarn: false,
            emailWarn: false,
            emailValidWarn: false,
            passwordWarn: false,
            cPasswordWarn: false,
            cityWarn: false,
            countryWarn: false,
            taxWarn: false,
            phoneWarn: false,
            genreWarn: false,
            dobWarn: false,
            rememberCheck: false,
            rememberCheckWarn: false,
            passwordWarning: false,
            msg: '',
            terms: '',
            cities: null,
            cityVal: ''
          }
        },
        computed: {
          ...mapGetters({
            __getEmail: 'product/getEmail'
          })
        },
        watch: {
          city(val) {
            if(val || this.addressHolder) {
              this.cityWarn = false
            } else {
              this.cityWarn = true
            }
          }
        },
        methods: {
          ...mapActions({
            __email: 'product/setEmail'
          }),
          getToData(addressData) {
            this.addressHolder = addressData
          },
          checkValue(value) {
            this.city = value.name
          },
          setCity() {
            if(this.addressHolder) {
              this.city = this.addressHolder.locality
              this.latitude = this.addressHolder.latitude.toString()
              this.longitude = this.addressHolder.longitude.toString()
            }
          },
          validFname () {
            if(this.fullName === '') {
              this.fNameWarn = true
            } else {
              this.fNameWarn = false
            }
          },
          validEmail () {
            if(this.email === '') {
              this.emailWarn = true
            } else {
              this.emailWarn = false
              this.emailValidWarn = false
            }
          },
          validPassword(){
            if(this.password === '') {
              this.passwordWarn = true
            } else {
              this.passwordWarn = false
            }
          },
          validCPassword(){
            if(this.confirmPassword === '') {
              this.cPasswordWarn = true
            } else {
              this.cPasswordWarn = false
              if(this.confirmPassword !== this.password){
                this.passwordWarning = true
              }
            }
          },
          validCity(){
            if(this.city === '') {
              this.cityWarn = true
            } else {
              this.cityWarn = false
            }
          },
          validCountry(){
            if(this.country === '') {
              this.countryWarn = true
            } else {
              this.countryWarn = false
            }
          },
          validTax(){
            if(this.taxPayer === '') {
              this.taxWarn = true
            } else {
              this.taxWarn = false
            }
          },
          validNumber(){
            if(this.number === '') {
              this.phoneWarn = true
            } else {
              this.phoneWarn = false
            }
          },
          validGenre(){
            if(this.genre === '') {
              this.genreWarn = true
            } else {
              this.genreWarn = false
            }
          },
          validDOB(){
            if(this.dob === '') {
              this.dobWarn = true
            } else {
              this.dobWarn = false
            }
          },
          validCheck() {
            this.rememberCheck = !this.rememberCheck
            if(this.rememberCheck) {
              this.rememberCheckWarn = false
            } else {
              this.rememberCheckWarn = true
            }
          },
          validRememberCheck() {
            if(this.rememberCheck === false) {
              this.rememberCheckWarn = true
            } else {
              this.rememberCheckWarn = false
            }
          },
          async RegisterBtn(){
            this.valid()
            if(this.isValid){
              for(let n of this.cities) {
                if(n.name == this.city || n.slug == this.city) {
                  this.cityVal = n
                }
              }
              const InputData = {
                name: this.fullName,
                username: this.email,
                email: this.email,
                password: this.password,
                city: this.city,
                address_coordinates: {
                  latitude: this.latitude,
                  longitude: this.longitude
                }
              }
              const response = await api.product.registerService(InputData)
              if(response.length === undefined){
                this.__email(this.email)
                this.$router.push('/verify')
                this.$toasted.show('Conta criada com sucesso.', {
                  position: 'top-center',
                  duration: 3000
                })
              } else {
                this.$toasted.show('Nome de usuário existente', {
                  position: 'top-center',
                  duration: 3000
                })
              }
            }
          },
          valid(){
            if(this.fullName && this.email && this.password && this.city && this.rememberCheck){
              this.isValid = true
            }
            if(this.fullName === '' || this.email === '' || this.password === '' || this.confirmPassword === '' || this.city === '' || this.rememberCheck === false){
              this.validFname()
              this.validEmail()
              this.validPassword()
              this.validCPassword()
              this.validCity()
              this.validRememberCheck()
            }
          }
        },
        async fetch () {
          const data = await api.product.cmsPageService('privacy-policy')
          this.terms = data.data[0]
          const cityData = await api.product.getCityData()
          this.cities = cityData.data
        }
    }
</script>

<style lang="scss" scoped>
$them-color: #fd5044;
$them-color-yellow:#f2ad49;
$them-color-dark: #1b1b1b;
.set-term-text {
  margin-left: -0.3em;
}
.set-check-box {
  margin-left: -2.2em !important;
}
.modal-popup {
  padding: auto;
}
.tc-popup:hover {
  color: #fd5044;
  text-decoration: underline;
}
// Left Sidebar
.close-popup{
  display: none;
}
.verify-mail-box {
    text-align: center;
	img {
		max-width: 80%;
		margin-bottom: 30px;
	}
	p {
		font-size: 16px;
	}
	span.verify-email-show {
	  color: $them-color;
	  font-weight: bold;
	}
}
.btn-close{
  float: right;
  font-size: 20px;
}
#button-3 a{
  padding: 0 !important;
}
.form-floating>label {
    padding: 0.8rem .75rem;
}
.warning {
    color: red;
    font-size: 12px;
}
section.login.contact-us.section-padding .custom-input {
    height: 52px;
    padding: .375rem 2.25rem .375rem .75rem;
  }
  .form-left-pad {
    padding-left: 12px;
}
  .get-in-GET-touch {
    border: 1px solid #b3b3b3;
    border-radius: 5px;
    padding: 45px 40px;
    background: #ffffff;
    margin: auto;
    z-index: 1;
    position: relative;
  }

.relative-position {
  position: relative;
}
.login-img-cycle {
  position: absolute;
  background-repeat: no-repeat;
  left: -28%;
  bottom: -10%;
}

.signUp-width {

  .sign-in {
    label {
    font-size: 16px;
    color: #6c6c6c;
}
 a {
    color: #2b2c43;
    transition: all 0.3s ease-in-out;
}
}
    width: 1050px !important;
    margin: auto;
    p{
        color: #525252 !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 28px;
    }
    .form-floating>label{
        left: 10px;
    }
    form .form-floating > .custom-input:focus, form .form-floating > .custom-input:not(:placeholder-shown) {
        padding-top: 8px;
        box-shadow: none;
        border: 1px solid #ced4da;
        font-size: 14px;
    }
    form {
        margin-top: 30px;
}
}



/*****=========================RESPONSIVE======================****/

@media screen and (max-width: 1100px) {

    .signUp-width {
        width: 100% !important;
    }
}


@media screen and (max-width: 767px) {
  .login-img-cycle.mob-css {
    display: none;
}
.get-in-GET-touch{
    padding: 12px;}
.text-sm-left {
    /* text-align: left !important; */
    justify-content: start !important;
}
    .birth-select {
        margin-top: 20px !important;
    }

    .signup-check {
        display: block !important;

        .form-check.justify-content-end.col-12.col-xs-6.text-right {
            text-align: left;
            justify-content: start !important;
        }
    }

}


</style>
