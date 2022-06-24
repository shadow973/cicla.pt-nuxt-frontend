<template>
  <div class="col-12 col-md-7">
    <div class="get-in-get-touch" data-aos="fade" data-aos-once="true">
      <h4 class="them-title" v-if="data.title">{{data.title}}</h4>
      <!--p v-if="data.description">{{data.description}}</p-->
      <form>
        <div class="form-floating mb-4">
          <input
            type="text"
            v-model="name"
            @blur="nameValid()"
            :class="validName ? 'form-control custom-input' : 'form-control custom-input warning-border'"
            id="name"
            placeholder="Insira o nome"
          />
          <label class="custom-label" for="name">Introduza o nome</label>
          <span class="warning" v-if="!validName">O nome é obrigatório*</span>
        </div>
        <div class="form-floating mb-4">
          <input
            type="email"
            :class="validEmail ? 'form-control custom-input' : 'form-control custom-input warning-border'"
            @blur="emailValid()"
            v-model="email"
            id="email"
            placeholder="Digite o e-mail"
          />
          <label class="custom-label" for="email">Introduza o e-mail</label>
          <span class="warning" v-if="!validEmail">Digite um endereço de e-mail válido*</span>
        </div>
        <div class="form-floating mb-4">
          <input
            type="text"
            v-model="subject"
            @blur="subjectValid()"
            :class="validSubject ? 'form-control custom-input' : 'form-control custom-input warning-border'"
            id="subject"
            placeholder="Sujeito"
          />
          <label class="custom-label" for="subject">Assunto</label>
          <span class="warning" v-if="!validSubject">O assunto é obrigatório*</span>
        </div>
        <div class="form-floating mb-4">
          <textarea
            :class="validMessage ? 'form-control custom-input textarea-height' : 'form-control custom-input textarea-height warning-border'"
            @blur="messageValid()"
            v-model="message"
            placeholder="Digite sua mensagem"
            rows="3"
            id="Message"
          ></textarea>
          <label class="custom-label" for="Message">Introduza a sua mensagem</label>
          <span class="warning" v-if="!validMessage">A mensagem é obrigatória*</span>
        </div>
        <div class="theme-btn universal-btn" id="button-3">
          <div id="circle"></div>
          <nuxt-link to>
            <button type="submit" @click="dataSubmit">
              <span>
                Enviar
                <i class="fal fa-arrow-right"></i>
              </span>
            </button>
          </nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import api from '../../services'
export default {
  props: ['data'],
  data() {
    return {
      name: '',
      email: '',
      subject: '',
      message: '',
      formData: {},
      validData: true,
      validName: true,
      validEmail: true,
      validSubject: true,
      validMessage: true,
    }
  },
  methods: {
    async dataSubmit() {
      this.messageValid()
      this.subjectValid()
      this.emailValid()
      this.nameValid()
      if (
        this.validMessage &&
        this.validSubject &&
        this.validEmail &&
        this.validName
      ) {
        this.formData = {
          email: this.email,
          name: this.name,
          subject: this.subject,
          message: this.message,
        }
        const data = await api.product.contact(this.formData)
        this.formReset()
        this.$toasted.show('Sucesso!', {
          position: 'top-center',
          duration: 3000
        })
      } else {
        this.$toasted.show('Erro ao enviar dados', {
          position: 'top-center',
          duration: 3000
        })
      }
    },

    nameValid() {
      if (this.name === '') {
        this.validName = false
      } else {
        this.validName = true
      }
    },
    emailValid() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.validEmail = true
      } else {
        this.validEmail = false
      }
    },
    subjectValid() {
      if (this.subject === '') {
        this.validSubject = false
      } else {
        this.validSubject = true
      }
    },
    messageValid() {
      if (this.message === '') {
        this.validMessage = false
      } else {
        this.validMessage = true
      }
    },
    formReset() {
      this.name = ''
      this.email = ''
      this.subject = ''
      this.message = ''
    },
  },
}
</script>
<style lang="scss" scoped>
$them-color: #fd5044;
.contact-us.contact-label {
  width: 100%;
  background-color: #f9fbfc;

  form .form-floating > .custom-input:focus ~ .custom-label,
  form .form-floating > .custom-input:not(:placeholder-shown) ~ .custom-label,
  form .form-floating > .form-select ~ .custom-label {
    opacity: 1;
    transform: scale(0.85) translateY(-11px) translateX(0.8rem) !important;
    color: #6a6a6a !important;
    background-color: #ffffff;
    height: 26px;
    color: #686868;
    font-size: 16px;
    padding: 0;
  }
  .textarea-height {
    height: 110px !important;
    resize: none;
    padding-top: 16px !important;
  }

  label.custom-label {
    padding: 13px 10px;
    font-size: 15px;
    color: #686868;
  }

  .contact-us-bg-img {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
      url(~assets/images/contact-us-bg-img.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    height: 100%;
    z-index: 1;
    padding: 45px 40px;
    border-radius: 5px;
    .contact-us-content {
      width: 100%;
      h4 {
        text-transform: uppercase;
        margin-bottom: 40px;
      }
      .office-information {
        padding-left: 0px;
        margin-bottom: 0;
        li {
          margin-bottom: 32px;
        }
        p {
          margin-bottom: 0;
          font-size: 18px;
          line-height: 30px;
          font-weight: 400;
          color: #fff;
          transition: all 0.3s ease-in-out;
        }
        a {
          transition: all 0.3s ease-in-out;
          color: #fff;
        }
        & li:hover a {
          color: $them-color !important;
        }
        & li:hover a p {
          color: $them-color !important;
        }
        i {
          font-size: 30px;
        }
      }
    }
  }
  .get-in-get-touch {
    border: 1px solid #b3b3b3;
    border-radius: 5px;
    padding: 40px;
    margin-left: 60px;
    background: #ffffff;
    p {
      font-size: 15px;
      font-weight: 400;
      color: #000;
      line-height: 26px;
      margin-bottom: 0;
      padding-bottom: 30px;
    }
  }
}

section.contact-images {
  width: 100%;
  padding: 60px 0px;
  ul.d-flex.justify-content-between {
    padding-left: 0;
    margin-bottom: 0;
    img {
      opacity: 0.6;
      transition: all 0.3s ease-in-out;
      &:hover {
        opacity: 1;
      }
    }
  }
}
#button-3 a {
  padding: 0 !important;
}
</style>
