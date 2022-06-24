<template>
  <div>
      <div class="text-center" v-if="$fetchState.pending">
      <img src="~assets/images/spinner.gif" style="width: 60px;">
      </div>
      <div v-else-if="$fetchState.error">
      <p>Erro ao buscar dados</p>
      </div>

    <header v-else class="site-header" :class="toggleClass ? 'sticky-header' : ''">
      <div class="top-shadow"></div>
      <div class="top-line">
        <div class="theme-container">
          <div class="row d-flex justify-content-between">
            <div class="col-md-6 col-sm-6 col-xs-6 d-flex">
              <p>
                <i class="fal fa-envelope px-2"></i
                ><a href="mailto:info@cicla.pt" target="_blank">info@cicla.pt</a>
              </p>
              <p class="px-3"><img src="~assets/images/diveder.png" alt /></p>
              <p>
                <i class="fal fa-phone-alt px-2"></i
                ><a href="tel:351 928 151 083" target="_blank">351 928 151 083</a>
              </p>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
              <ul class="d-flex float-end social-icon mb-0">
                <li v-for="(data, index) in socialIcons" :key="index">
                  <a :href="data.link"
                     target="_blank"><i :class="data.icon"></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      <div class="header-fixes">
        <div class="theme-container custom-nav-height cicla-header">
         <b-navbar toggleable="lg" type="transparent" variant="transparent" class="bg-transparent p-0">
        <b-navbar-brand>
      <nuxt-link class="navbar-brand" to="/"><img class="brand-logo" src="~assets/images/logo-cicla.png" alt="CICLA"/></nuxt-link>
      </b-navbar-brand>

          <b-navbar-toggle target="nav-text-collapse"><i class="fal fa-bars"></i></b-navbar-toggle>
               <b-collapse id="nav-text-collapse" is-nav class="w-100 justify-content-end">
             <b-navbar-nav class="align-items-center w-100 justify-content-end">
                <li
                  class="nav-item"
                  v-for="(data, index) in headerPages"
                  :key="index"
                  :class="routePath === data.link ? 'active' : ''"
                >
                  <nuxt-link
                    v-if="!data.chekLogin"
                    class="nav-link"
                    :to="data.link"
                    >{{ data.name }}</nuxt-link
                  >
                  <nuxt-link
                    v-if="data.chekLogin"
                    class="nav-link"
                    :to="tokenData ? data.link : data.linkLogin"
                    >{{ data.name }}</nuxt-link
                  >
                </li>
                <li :class="routePath === '/login' ? 'active nav-item d-flex' : 'nav-item d-flex'" v-if="!tokenData">
                  <nuxt-link class="nav-link padding-right-0" to="/login"
                    >Entrar
                  </nuxt-link>
                </li>
                <li :class="routePath === '/sign-up' ? 'active nav-item d-flex' : 'nav-item d-flex'" v-if="!tokenData">
                  <nuxt-link class="nav-link padding-left-0" to="/sign-up">Registar</nuxt-link>
                </li>

                <li class="nav-item">
                  <div class="theme-btn" id="button-3">
                    <div id="circle"></div>
                    <nuxt-link to="/donate" class="nav-link"><span><i class="fal fa-hand-holding-usd"></i></span>
                      Donativos</nuxt-link
                    >
                  </div>
                </li>


                <li class="nav-item dropdown user-dropdown" v-if="tokenData">

                  <a
                    class="dropdown-toggle d-flex align-items-center"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span class="pe-2"
                      ><img src="~assets/images/dropdown-img.png" alt=""
                    /></span>
                    {{ userDetail }}
                  </a>
                  <ul
                    class="dropdown-menu text-dark"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <nuxt-link class="dropdown-item position-relative" to="/my-account#inbox"
                        >Caixa de entrada <span v-if="messageCounts > 0" class="msg-counts position-absolute">{{messageCounts > 9 ? '9+' : messageCounts}}</span></nuxt-link
                      >
                    </li>
                    <li>
                      <nuxt-link class="dropdown-item" to="/my-account#perfil"
                        >O meu perfil</nuxt-link
                      >
                    </li>
                    <li>
                      <nuxt-link class="dropdown-item" to="/my-account#minha_bicicleta"
                        >As Minhas Bicicletas</nuxt-link
                      >
                    </li>
                    <li>
                      <nuxt-link class="dropdown-item" to="/register-bikes"
                        >Registo de Bicicleta</nuxt-link
                      >
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <a class="dropdown-item" @click="logOutBtn">Sair</a>
                    </li>
                  </ul>
                </li>
              </b-navbar-nav>
            </b-collapse>


          </b-navbar>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import api from '../services'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      toggleClass: false,
      socialIcons: [
        {
          link: 'https://twitter.com/cicla_pt',
          icon: 'fab fa-twitter',
        },
        {
          link: 'https://www.facebook.com/cicla.pt',
          icon: 'fab fa-facebook-f',
        },
        {
          link: 'https://www.instagram.com/cicla.pt/',
          icon: 'fab fa-instagram',
        },
      ],
      headerPages: [
        {
          name: 'Inicio',
          link: '/'
        },
        {
          name: 'Pesquisa',
          link: '/search-bikes',
          linkLogin: '/login',
          chekLogin: true,
        },
        {
          name: 'Bicicleta Roubada?',
          link: '/stolen-bike',
          linkLogin: '/login',
          chekLogin: true,
        },
        {
          name: 'Classificados',
          link: '/classified',
          linkLogin: '/login',
          chekLogin: true
        },
      ],
      tokenData: '',
      userDetail: '',
      messages: [],
      messageCounts: 0
    }
  },
  computed: {
    routePath() {
      return this.$route.fullPath
    }
  },
  methods: {
    logOutBtn() {
      Cookies.remove('token')
      window.location = window.location.origin + '/login'
    },
    scrolling() {
      if (window.scrollY > 150) {
        this.toggleClass = true
      } else {
        this.toggleClass = false
      }
    },
  },
  async fetch() {
    this.tokenData = Cookies.get('token')
    if (this.tokenData) {
      const detail = await api.product.userDetail()
      this.userDetail = detail.data.name
      const getMessages = await api.product.getAllMessage(detail.data.id)
      const count = getMessages.data.filter((val) => {
        if(val.read === false) {
          this.messages.push(val)
        }
      })
      this.messageCounts = this.messages.length
    }
  },
  created() {
    window.addEventListener('scroll', this.scrolling)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrolling)
  },
}
AOS.init()
</script>
<style lang="scss">
  $them-color: #fd5044;
html {
  overflow-x: hidden;
}

li.nav-item.dropdown.user-dropdown {ul.dropdown-menu.text-dark {
    li {a { &:hover .msg-counts {
    background-color: white;
    color: $them-color;
  }}}
}}


.msg-counts {
  top: 0.2rem;
  right: 1.3rem;
  padding: 2px;
  text-align: center;
  font-size: 11px;
  background-color: $them-color;
  width: 1.2rem !important;
  height: 1.2rem !important;
  border-radius: 100%;
  color: white;
}

.cicla-header{
 div#nav-text-collapse {
    justify-content: end !important;
}
}

li.nav-item.mobile-btn {
    display: none;
}

header.site-header.sticky-header .header-fixes {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
  background: #fff;
  box-shadow: 2px -30px 44px 3px #141414;

  img.brand-logo {
    max-width: 115px;
  }
  li.nav-item.active a {
    color: #fd5044 !important;
  }
  li.nav-item :hover {
    color: #fd5044 !important;
  }

  li.nav-item div#button-3 a {
    color: #fff !important;
  }

  li.nav-item div#button-3:hover div#circle {
    background: #000;
  }

  li.nav-item a {
    color: #181818 !important;
    text-transform: uppercase;
    font-size: 15px;
  }
}

.header-fixes {
  transition: 0.4s ease 0s;
  animation-name: fadeInDown;
}

.top-shadow {
  box-shadow: 40px 42px 92px 51px #000000;
}

.top-line {
  padding: 10px 0px;
  align-items: center;
  i {
    color: $them-color;
  }

  a {
    color: #fff;
  }
  p {
    margin: 0 !important;
  }
  ul.social-icon li {
    margin-left: 20px;
    transition: all 0.3s ease-in-out;
    i {
      color: #fff;
      font-size: 15px;
      &:hover {
        color: $them-color;
      }
    }
  }
}
.top-navbar ul li a {
  color: #fff;
  transition: all 0.3s ease-in-out;
  &.active {
    color: $them-color;
  }
  &:hover {
    color: $them-color;
  }
}

// Animation to fade in the dropdown menus
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

// Assigning the above animation to all dropdown menus
.dropdown-menu {
  &.show {
    -webkit-animation: fadeIn 0.3s alternate; /* Safari 4.0 - 8.0 */
    animation: fadeIn 0.3s alternate;
  }
}

// Mega Menu adjustments
.nav-item.dropdown.dropdown-mega {
  position: static;
  .dropdown-menu {
    width: 90%;
    top: auto;
    left: 5%;
  }
}

// Complete styles for main navbar toggler and hamburger menu
.navbar-toggler {
  border: none;
  padding: 0;
  outline: none;
  &:focus {
    box-shadow: none;
  }
  .hamburger-toggle {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 50px;
    z-index: 11;
    .hamburger {
      position: absolute;
      transform: translate(-50%, -50%) rotate(0deg);
      left: 50%;
      top: 50%;
      width: 50%;
      height: 50%;
      pointer-events: none;
      span {
        width: 100%;
        height: 4px;
        position: absolute;
        background: #333;
        border-radius: 2px;
        z-index: 1;
        transition: transform 0.2s cubic-bezier(0.77, 0.2, 0.05, 1),
          background 0.2s cubic-bezier(0.77, 0.2, 0.05, 1), all 0.2s ease-in-out;
        left: 0px;
        &:first-child {
          top: 10%;
          transform-origin: 50% 50%;
          transform: translate(0% -50%) !important;
        }
        &:nth-child(2) {
          top: 50%;
          transform: translate(0, -50%);
        }
        &:last-child {
          left: 0px;
          top: auto;
          bottom: 10%;
          transform-origin: 50% 50%;
        }
      }
      &.active {
        span {
          position: absolute;
          margin: 0;
          &:first-child {
            top: 45%;
            transform: rotate(45deg);
          }
          &:nth-child(2) {
            left: 50%;
            width: 0px;
          }
          &:last-child {
            top: 45%;
            transform: rotate(-45deg);
          }
        }
      }
    }
  }
}

.icons {
  display: inline-flex;
  margin-left: auto;
  a {
    transition: all 0.2s ease-in-out;
    padding: 0.2rem 0.4rem;
    color: #ccc !important;
    text-decoration: none;
    &:hover {
      color: white;
      text-shadow: 0 0 30px white;
    }
  }
}

// Header
.custom-nav-height div#navbarSupportedContent ul.navbar-nav {
  text-align: right;
  float: right;
  width: 100%;
  display: inline-flex;
  justify-content: end;
  flex-wrap: wrap;
  align-items: center;
}

.site-header {
  position: absolute;
  z-index: 9;
  left: 0;
  right: 0;
  li.nav-item {
    padding-left: 25px;
    span {
      height: 39px;
      align-items: center;
      display: grid;
    }

    a {
      color: #fff !important;
      text-transform: uppercase;
      font-size: 15px;
    }
    :hover {
      color: $them-color !important;
    }
  }
  li.nav-item.active a {
    color: $them-color !important;
  }
}

// Responsive
@media screen and (max-width: 1449px) {
  .slider-content h1 {
    text-transform: uppercase;
    font-size: 34px;
    line-height: 45px;
  }
}

@media screen and (max-width: 1366px) {

  .site-header li.nav-item a {
    color: #fff !important;
    text-transform: uppercase;
    font-size: 13px;
}

  header.site-header.sticky-header .header-fixes li.nav-item a {
    font-size: 13px;
}

}

@media screen and (max-width: 1200px) {
  .brand-logo {
    max-width: 130px !important;
  }
  header.site-header.sticky-header .header-fixes li.nav-item a {
    font-size: 12px;
}
  .owl-carousel.owl-theme-1.home-slider.owl-loaded .theme-container {
    width: 100%;
    padding: 0 15px;
    max-width: 100%;
  }
  .slider-content {
    position: absolute;
    height: 100%;
    display: block;
    padding-top: 13%;
    right: 20px;
    left: 20px;

    br {
      display: none;
    }
  }

  .site-header li.nav-item {
    padding-left: 1px;
  }
  .site-header li.nav-item div#button-3 {
    width: 150px;
    margin-right: 15px;
  }
}

@media screen and (max-width: 1100px) {
  .slider-content h1 {
    font-size: 28px;
    line-height: 45px;
    margin-bottom: 0;
  }
  .border-bottom-line {
    bottom: -5px;
    .slider-content h6 {
      font-size: 26px;
      margin: 0 !important;
    }
    .site-header li.nav-item a {
      font-size: 13px;
    }
  }
}
@media screen and (max-width: 992px) {
  .site-header li.nav-item span {
    height: 39px;
  }

  .mobile-none{
    display: none;
  }

li.nav-item.mobile-btn {
    display: block;
}
  .slider-content ul {
    display: none;
  }
  .site-header li.nav-item {
    padding-left: 2px;
    a {
      font-size: 13px;
    }
  }
}
@media screen and (max-width: 991px) {

li.nav-item.dropdown.user-dropdown {
    padding: 15px;
    background: #f0f3f6;
    border-radius: 10px;
    margin-top: 15px;
}

li.nav-item.dropdown.user-dropdown ul.dropdown-menu.text-dark {
    margin-top: 15px;
}




  .site-header li.nav-item div#button-3 a {
    color: #fff !important;
  }
  .site-header li.nav-item div#button-3 a:hover {
    color: #000 !important;
  }

  div#navbarSupportedContent {
    background: #fff;
    padding: 30px;
    border: 1px solid #ddd;
    border-top: 0;
    text-align: left;
    background: #fff;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 9;
    top: 58px;
  }
  .site-header li.nav-item {
    width: 100%;
    text-align: left;
  }
  div#navbarSupportedContent {
    background: #fff;
  }
  .site-header li.nav-item a {
    color: #0a0909 !important;
    font-size: 16px;
  }
.site-header button.navbar-toggler {
    background: #fff;
    padding: 8px 12px;
    border-radius: 40px;
    height: 40px;
    width: 40px;
    display: grid;
    align-items: center;
    &:hover{
      background: $them-color;
      color: #fff;
      }
}

.cicla-header div#nav-text-collapse {
    background: #fff;
    padding: 25px;
    border-radius: 4px;
}

  .slider-content {
    padding-top: 18%;
    h1 {
      font-size: 20px;
    }
    h6 {
      font-size: 16px;
    }
  }
}

@media screen and (max-width: 767px) {
  div#navbarSupportedContent {
    top: 54px;
  }
  .cicla-header div#nav-text-collapse {
    padding: 15px 0;
}

  .site-header {
    li.nav-item div#button-3 {
      width: 100%;
      text-align: center;
      a {
        padding: 4px 23px;
        width: 100%;
        text-align: center;
        justify-content: center;
        font-size: 14px;
      }
    }
  }

  .bick-register-card img.bike-register-arrow {
    display: none;
  }
  .site-header button.navbar-toggler {
    padding: 6px;
  }
  .border-bottom-line {
    bottom: -3px;
  }
  .site-header {
    background: #fff;
    position: inherit;

div#nav-text-collapse{
     padding: 15px 0;
    position: absolute;
    top: 60px;
    right: 0;
    left: 0;
    padding: 20px 20px 60px 20px;
    margin-left: -20px;
    margin-right: -20px;
    background: #fff !important;
    z-index: 999;

}
    .top-shadow {
      box-shadow: none;
    }
    nav.navbar.navbar-expand-lg.navbar-light.text-white {
      padding: 0;
    }
  }
  .slider-content h1 {
    font-size: 14px;
    line-height: 21px;
    padding-top: 0;
  }
  .slider-content h6 {
    font-size: 16px;
    display: none;
  }
  .top-line {
    display: none;
  }
  .slider-content {
    padding-top: 13%;
  }
  .site-header a.navbar-brand img {
    max-width: 105px !important;
    padding: 5px 0;
  }
}

@media screen and (max-width: 479px) {
  .border-bottom-line {
    bottom: 5px;
  }
}
.brand-logo {
  max-width: 220px;
}
</style>


<style>
.mini-toastr {
    position: fixed !important;
    z-index: 99999 !important;
    right: 15px !important;
    top: inherit !important;
    bottom: 30px !important;
    text-align: left !important;
    max-width: 300px !important;
    float: right !important;
    width: 100% !important;
}
.mini-toastr .mini-toastr__notification.-success {
    background-color: #7AC13E;
    opacity: 1;
    width: 100%;
    box-shadow: none !important;
    padding: 12px 12px;
    border-radius: 4px;
}

.mini-toastr .mini-toastr-notification__message {
    width: 100%;
    padding: 0;
    font-size: 14px;
}

@media screen and (max-width: 767px) {
  .mini-toastr {
    position: fixed !important;
    z-index: 99999 !important;
    right: 0 !important;
    top: inherit !important;
    bottom: 0px !important;
    text-align: left !important;
    max-width: 100% !important;
    float: right !important;
    width: 100% !important;
}

.mini-toastr .mini-toastr__notification.-success {
    padding: 9px 12px !important;
    margin: 0 !important;
    border-radius: 0 !important;
}


}
</style>
