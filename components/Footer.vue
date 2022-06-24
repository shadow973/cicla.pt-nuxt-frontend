<template>
  <footer class="site-footer">
    <div class="theme-container">
      <div class="row">
        <div class="col-12 col-md-4 pe-5">
          <h4 class="text-white">Registo Nacional de Bicicletas</h4>
          <p>
          Com o projeto Cicla pretendemos ajudar o mercado de transações de Bicicletas,
          à semelhança do que acontece com os automóveis. Sonhamos que todos os proprietários,
          vendedores e compradores de bicicletas vejam a CICLA como a forma mais fiável de
          saber que a bicicleta que compram ou vendem é proveniente do seu legitimo proprietário.
          </p>
          <ul class="d-flex social-icon">
            <li>
              <a
                href="https://twitter.com/cicla_pt"
                target="_blank"
                class="twitter"
                ><i class="fab fa-twitter"></i
              ></a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/cicla.pt"
                class="facebook"
                target="_blank"
                ><i class="fab fa-facebook-f"></i
              ></a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/cicla.pt/"
                class="instagram"
                target="_blank"
                ><i class="fab fa-instagram"></i
              ></a>
            </li>
          </ul>
        </div>

        <div class="col-12 col-md-2">
          <div class="ps-3 ps-md-0 ps-sm-0 mob-pt-3">
            <h4 class="text-white">Acesso Rápido</h4>
            <ul class="text-white">
              <li v-for="(data, index) in quickLinks" :key="index">
                <nuxt-link v-if="!data.checkToken" :to="data.url">{{
                  data.name
                }}</nuxt-link>
                <nuxt-link
                  v-if="data.checkToken"
                  :to="token ? data.url : data.loginUrl"
                  >{{ data.name }}</nuxt-link
                >
              </li>
            </ul>
          </div>
        </div>

        <div class="col-12 col-md-2">
          <div class="ps-3 ps-md-0 ps-sm-0 mob-pt-3">
            <h4 class="text-white">Informações</h4>
            <ul class="text-white">
              <li v-for="(data, index) in resources" :key="index">
                <nuxt-link :to="data.url">{{ data.name }} </nuxt-link>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-12 col-md-4">
          <div class="ps-4 ps-md-0 ps-sm-0 mob-pt-3">
            <h4 class="text-white">Receba a nossa newsletter</h4>
            <p>
              Periodicamente enviaremos informações sobre noticias acerca da
              Cicla.
            </p>
            <div class="input-group border-bootom">
              <input
                v-model="email"
                @blur="emailValid()"
                @change="emailValid()"
                @keyup.enter="submitData"
                :class="
                  emailWarn || emailValidWarn
                    ? 'warning-border form-control bg-transprint text-gray'
                    : 'form-control bg-transprint text-gray'
                "
                type="email"
                placeholder="O seu email..."
                id="example-search-input"
                required
              />
              <span class="input-group-append">
                <button class="btn bg-transprint" @click="submitData">
                  <i class="fal fa-paper-plane"></i>
                </button>
              </span>
            </div>
            <p v-if="emailWarn && email.length == 0" class="warning">
                É necessário um endereço de e-mail
              </p>
              <p
                v-if="emailValidWarn && email.length > 0"
                class="warning mb-0 mt-1"
              >
                *Endereço de e-mail invalido
              </p>
          </div>
        </div>
      </div>
    </div>
    <div class="theme-container copy-right">
      <div class="row justify-content-between">
        <div class="col-12 col-md-6">
          <p>Marca Registada © 2022, Todos os direitos reservados CICLA. Desenvolvido por <a href="https://www.go4it.pt">GO4IT</a></p>
        </div>
        <div class="col-12 col-md-6">
          <ul class="d-flex float-end">
            <li class="me-3">
              <nuxt-link to="/terms-of-use">Termos e Condições</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/privacy-policy "
                >Política de Privacidade</nuxt-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import api from '../services'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      token: '',
      quickLinks: [
        {
          name: 'Início',
          url: '/',
        },
        {
          name: 'Sobre a Cicla',
          url: '/about-us',
        },
        {
          name: 'Pesquisa',
          url: '/search-bikes',
          loginUrl: '/login',
          checkToken: true,
        },
        {
          name: 'Donativos',
          url: '/donate',
        },
        {
          name: 'Bicicleta Roubada?',
          url: '/stolen-bike',
          loginUrl: '/login',
          checkToken: true,
        },
        {
          name: 'FAQs',
          url: '/help',
        },
        {
          name: 'Contactos',
          url: '/contact',
        },
      ],
      resources: [
        {
          name: 'Segurança',
          url: '/security',
        },
        {
          name: 'Parceiros',
          url: '/bike-manufacturer-list',
        },
        {
          name: 'Protege a tua Bicicleta',
          url: '/protect-your-bike',
        }
      ],
      isValid: true,
      email: '',
      emailWarn: false,
      emailValidWarn: false,
    }
  },
  methods: {
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
    async submitData() {
      try {
        this.checkValid()
        if (this.isValid) {
          const inputData = {
            email: this.email,
          }
          await api.product.newsPost(inputData)

          this.$toasted.show('Sucesso!', {
            position: 'top-center',
            duration: 3000,
          })
          this.email = ''
        } else {
          this.$toasted.show('Erro ao enviar dados', {
            position: 'top-center',
            duration: 3000,
          })
        }
      } catch (error) {
        console.log('error', error)
        this.$toasted.show('Erro! E-mail já existe!', {
          position: 'top-center',
          duration: 3000,
        })
      }
    },
    checkValid() {
      this.emailValid()

      if (this.emailWarn || this.emailValidWarn) {
        this.isValid = false
      } else {
        this.isValid = true
      }
    },
  },
  mounted() {
    this.token = Cookies.get('token')
  },
}
</script>
<style lang="scss">
$them-color: #fd5044;
$them-color-yellow: #f2ad49;
$them-color-dark: #1b1b1b;

footer {
  width: 100%;
  background-color: #1b1b1b;
  padding-top: 70px;
  float: left;
  h4 {
    margin-bottom: 15px;
    font-size: 16px;
    text-transform: uppercase;
  }
  ul {
    padding-left: 0;
    margin-bottom: 0;
    li {
      a {
        font-size: 15px;
        font-weight: 500;
        line-height: 30px;
        transition: all 0.3s ease-in-out;
        color: #98aabb;
        &:hover {
          color: $them-color;
        }
      }
    }
  }
  ul.social-icon li:not(:last-child) {
    margin-right: 23px;
  }
  .input-group .btn {
    color: $them-color;
    box-shadow: none;
  }
  input#example-search-input {
    background: transparent;
    color: #858585;
    border: none;
    width: 80%;
    box-shadow: none;
    outline: none;
    font-size: 14px;
  }
  .input-group.border-bootom {
    border-bottom: 2px solid #323232;
    padding-bottom: 2px;
  }
  p {
    font-size: 15px;
    line-height: 30px;
    font-weight: 400;
    color: #98aabb;
  }
  ul.social-icon a {
    color: #a4a4a4;
    font-size: 20px;
    &:hover.facebook {
      color: #4267b2;
    }
    &:hover.twitter {
      color: #1da1f2;
    }
    &:hover.instagram {
      color: #da2f7b;
    }
  }
  footer .copy-right p {
    font-weight: normal !important;
    font-size: 14px;
  }
  .copy-right {
    border-top: 2px solid #323232;
    padding: 20px 0px;
    margin-top: 50px;
    p {
      margin-bottom: 0;
    }
  }
}

// Responsive
@media screen and (max-width: 1449px) {
  footer .copy-right {
    padding: 20px 15px;
  }
}

@media screen and (max-width: 1200px) {
  footer h4 {
    font-size: 18px;
  }
}

@media screen and (max-width: 767px) {
  section.bike-index ul.d-flex li img {
    max-width: 50px;
  }

  footer {


    p {
    font-size: 13px;
    line-height: 26px;
}
    padding-top: 30px;
     ul li a {
    font-size: 12px;
}

 .copy-right {
    margin-top: 0px;
}


  }
  .mob-pt-3 {
    padding-top: 20px;
    padding-left: 0 !important;
  }
  footer .copy-right ul.d-flex.float-end {
    text-align: left;
    float: left !important;
  }
}
</style>
