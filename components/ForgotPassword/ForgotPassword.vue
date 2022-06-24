<template>
  <div>
    <section class="login contact-us section-padding theme-bg-light">
      <div class="theme-container">
        <div class="row justify-content-center relative-position">
          <div class="login-img-cycle mob-css">
            <img src="~assets/images/login-cycle-img.png" alt="" />
          </div>
          <div class="main-login-form">
            <div class="get-in-GET-touch">
              <h4 class="them-title text-center">Esqueci-me da Password!</h4>
              <p class="text-center">
                Lorem orci elementum dictum viverra sed lobortis vitae purus.
                Vitae eget cursus dictum ac tellus faucibus. Porta aliquet neque
                morbi interdum sem enim. Nunc porttitor.
              </p>
              <form>
                <div class="form-floating mb-4">
                  <input
                    type="email"
                    @input="validEmail"
                    :class="emailValidWarn || emailWarn ? 'warning-border form-control custom-input' : 'form-control custom-input'"
                    id="email"
                    placeholder="Digite seu e-mail"
                    v-model="email"
                    @blur="validEmail"
                  />
                  <span v-if="emailWarn && !emailValidWarn" class="warning">*Email is required</span>
                  <span v-if="emailValidWarn" class="warning">*Invalid email</span>
                  <label class="custom-label" for="email">Digite seu e-mail</label>
                </div>

                <div class="form-floating text-center mb-4">
                  <div class="theme-btn universal-btn" id="button-3">
                    <div id="circle"></div>
                    <nuxt-link to="">
                      <button type="submit" @click="forgotBtn">
                        <span>Fazer reset à password <i class="fal fa-arrow-right"></i></span>
                      </button>
                    </nuxt-link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from '../../services'
export default {
  data(){
    return{
      email: '',
      emailWarn: false,
      emailValidWarn: false,
      isValid: false
    }
  },
  methods: {
    validateEmail(value){
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
      {
        this.msg['email'] = '';
      } else{
        this.msg['email'] = 'Invalid Email Address';
      } 
    },
    validEmail () {
      var check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
      if(this.email === '') {
        this.emailWarn = true
      } else if(!check) {
        this.emailValidWarn = true
      } else {
        this.emailWarn = false
        this.emailValidWarn = false
      }
    },
    valid(){
      this.validEmail()
      if(this.email === '' || this.emailWarn || this.emailValidWarn){
        this.isValid = false
      } else {
        this.isValid = true
      }
    },
    async forgotBtn(){
      try {
        this.valid()
        if(this.isValid){
          const InputData = {
            email: this.email
          }
          await api.product.forgotPasswordService(InputData)
          this.$toasted.show('O link de redefinição de senha foi enviado para o e-mail', {
            position: 'top-center',
            duration: 3000
          })
          this.email = ''
        }
      } catch(e) {
        this.$toasted.show(e, {
          position: 'top-center',
          duration: 3000
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$them-color: #fd5044;
$them-color-yellow: #f2ad49;
$them-color-dark: #1b1b1b;
#button-3 a{
  padding: 0 !important;
}
form {
    margin-top: 30px;
}
.warning {
    color: red;
    font-size: 12px;
}
.login {
  width: 100%;
  padding: 70px 0px;
  background-color: #f9fbfc;
  .form-floating>label {
    padding: 0.8rem 0.75rem;
    }
  p {
    color: #2e2d2d !important;
    font-size: 15px !important;
    font-weight: 600 !important;
    margin-bottom: 0;
  }
  .google-icon-wrapper {
    margin-right: 10px;
  }
  .fb-logo {
    margin-right: 10px;
  }
  .login-check label {
    color: #555568;
    font-size: 15px;
    a {
      transition: all 0.3s ease-in-out;
      border-bottom: 2px solid;
      &:hover {
        color: red !important;
      }
    }
  }
  .sign-in {
    font-size: 18px;
    color: #737373;
    a {
      color: #2b2c43;
      transition: all 0.3s ease-in-out;
      &:hover {
        color: $them-color;
      }
    }
  }
  .get-in-GET-touch {
    border: 1px solid #b3b3b3;
    border-radius: 5px;
    padding: 45px 40px;
    background: #ffffff;
    width: 590px;
    margin: auto;
    z-index: 1;
    position: relative;
  }
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

//login password
.Form-description {
  color: rgba(#6d6665, 50%);
}

.Form-fields {
  border-radius: 15px;
  border: 1px solid #c5c1c0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 24px 15px;
}

.Control-label {
  color: #423e3d;
  font-weight: bold;
  transition: color 300ms ease;
}

.Control-requirements {
  // display: none;
  background: pink;
  border-top: none;
  margin: -14px 0 15px;
  max-height: 0;
  overflow: hidden;
  transition: all 200ms ease;
  padding: 0 9px;
}

.ControlInput {
  border-radius: 3px;
  color: #6d6665;
  margin: 0.8em 0;
  border: 1px solid #c5c1c0;
  padding: 0.6em 0.6em;
  transition: box-shadow 300ms ease-out;

  &:focus {
    outline: $them-color auto 1px;
  }
  // only show the invalid input if we aren't focusing on the element
  // and there is no placeholder
  &:invalid:not(:focus):not(:placeholder-shown) {
    border-color: $them-color;

    & + .Control-label {
      color: $them-color;

      & + .Control-requirements {
        // display: block;
        max-height: 100px;
        padding: 9px;
        border: 1px solid $them-color;
      }
    }
  }

  &:valid:not(:focus):not(:placeholder-shown) {
    border-color: $them-color;
    & + .Control-label {
      color: $them-color;
    }
  }
}

.Control-requirements--email,
.ControlInput--email {
  order: -1;
}

.Control-label--email {
  order: -2;
}

.ControlInput--password {
  order: 0;
  padding-right: 50px;
}

.Control-label--password {
  order: -1;
  margin-bottom: -32px; // pull up the offset of the hide password button
}
.Control-label--showPassword {
  width: 32px;
  position: relative;
  top: 52px;
  left: 100%;
  text-align: right;
  margin-left: -36px;
  cursor: pointer;
}

.Form-submit {
  border: 1px solid $them-color;
  background-color: $them-color;
  border-radius: 3px;
  color: #fff;
  display: block;
  width: 100%;
  max-width: 100%;
  pointer-events: none;
  opacity: 0.6;
  cursor: default;
  transition: opacity 300ms ease-out, max-width 150ms ease-out;
  outline: none;
  position: relative;
  margin: auto;

  &:hover {
    background-color: darken($them-color, 10%);
  }
  &:active {
    background-color: darken($them-color, 20%);
    max-width: 50px;
    overflow: hidden;
    text-indent: 300px;

    .Button-spinner {
      opacity: 1;
    }
  }

  .ControlInput--email:valid ~ .ControlInput--password:valid ~ & {
    cursor: pointer;
    pointer-events: auto;
    opacity: 1;
  }
}

//SVG
.Button-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -13px;
  margin-top: -13px;
  opacity: 0;
}
// show password checkbox hack
.show-password {
  display: none;

  &:checked {
    // background: purple;

    & ~ .ControlInput--password {
      text-security: disc;
      -webkit-text-security: disc;
      -moz-text-security: disc; // doesn't work :'|
    }

    & ~ .Control-label--showPassword {
      .svg-toggle-password {
        .closed-eye {
          opacity: 1;
          transition: opacity 300ms ease, height 400ms ease;
          width: 4px;
          height: 44px;
        }
      }
    }
  }
}
// default eye position
.svg-toggle-password {
  fill: rgba($them-color, 50%);

  .closed-eye {
    opacity: 0;
    height: 0;
  }
}

.Button {
  padding: 10px;
  user-select: none;
}

.spinner {
  animation: dash 2s linear infinite;
  animation-direction: normal;
}

@keyframes dash {
  0% {
    stroke-dashoffset: 0;
    stroke-dasharray: 150.6 100.4;
  }
  50% {
    stroke-dasharray: 1 250;
  }
  100% {
    stroke-dashoffset: 502;
    stroke-dasharray: 150.6 100.4;
  }
}

@keyframes spinner-in {
  0% {
    opacity: 0;
  }
  20%,
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

// login social
.row.login-social-btn {
  margin: 37px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  .google-btn,
  .btn-fb {
    border: 1px solid #cdcdcd;
    padding: 10px;
    border-radius: 4px;
    // box-shadow: 11px 16px 14px -1px rgb(230 230 230 / 30%);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
    &:hover {
      border: 1px solid $them-color;
    }
    p {
      margin-bottom: 0;
      color: #2b2c43;
      text-align: right;
    }
  }
}
.login-line {
  text-align: center;
  margin-bottom: 30px;
  overflow: hidden;
  a.line {
    position: relative;
    text-align: center;
    display: inline;
    justify-content: center;
    align-items: center;
    color: #b9b9b9;
    font-size: 16px;
    font-weight: 600;
    &:before {
      content: '';
      position: absolute;
      height: 2px;
      width: 134px;
      background: #b9b9b9;
      top: 50%;
      left: -79%;
    }
    &:after {
      content: '';
      position: absolute;
      height: 2px;
      width: 134px;
      background: #b9b9b9;
      top: 50%;
      right: -79%;
    }
  }
}

@media screen and (max-width: 991px) {
  .contact-us.contact-label {
    .get-in-get-touch {
      margin-left: 0;
      padding: 25px;
    }
    & .contact-us-bg-img {
      padding: 25px;
      border-radius: 5px;
    }
  }
}

@media screen and (max-width: 767px) {
  .contact-us .contact-us-bg-img {
    height: auto !important;
    margin-bottom: 30px;
  }

  .login .get-in-GET-touch {
    padding: 12px;
    width: 100%;
    .login-check label {
      color: #555568;
      font-size: 12px;
    }

    .sign-in {
      font-size: 14px;
      color: #737373;
    }
  }
  section.contact-images {
    padding: 30px 0px;
  }

  .login-img-cycle.mob-css {
    display: none;
  }
  .google-btn {
    margin-bottom: 10px;
  }

  .login-line a.line {
    font-size: 11px;
    &:before {
      left: -114%;
    }
    &:after {
      right: -114%;
    }
  }
}
</style>
