<template>
  <div class="col-md-12" >
    <div class="text-center" v-if="$fetchState.pending">
      <img src="~assets/images/spinner.gif" style="width: 60px;padding-top: 300px !important;">
      </div>
      <div v-else-if="$fetchState.error">
      <p>Erro ao buscar dados</p>
      </div>
    <div v-else class="comment-one text-start" >
      <div v-if="commentDetail && commentDetail.length > 0">
      <h3 class="comment-one__title">{{commentDetail.length}} Comentários</h3>
      <div class="comment-one__single" v-for="(data, index) in commentDetail" :key="index">
        <div class="comment-one__image">
          <img src="~assets/images/user-img.jpg" alt="img" />
        </div>
        <div class="comment-one__content">
          <h3>{{data.user.name}}</h3>
          <p>
            {{data.comment}}
          </p>
        </div>
      </div>
      </div>
    </div>
    <div class="comment-form text-start" v-if="tokenData">
      <h3 class="comment-one__title mb-5">DEIXE UM COMENTÁRIO</h3>
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
            placeholder="Seu nome"
          />
          <label class="custom-label" for="name">Seu nome</label>
          <p v-if="nameWarn" class="warning mb-0 mt-1">*O nome é obrigatório</p>
        </div>
        <div class="form-floating col-md-6 mb-4">
          <input
            type="email"
            v-model="email"
            @blur="emailValid"
            :class="
              emailWarn || emailValidWarn
                ? 'warning-border form-control custom-input'
                : 'form-control custom-input'
            "
            id="email"
            placeholder="E-mail"
          />
          <label class="custom-label" for="email">Seu email</label>
          <p v-if="emailWarn" class="warning mb-0 mt-1">*O e-mail é obrigatório</p>
          <p v-if="emailValidWarn" class="warning mb-0 mt-1">*E-mail inválido</p>
        </div>

        <div class="form-floating mb-4 col-md-12">
          <textarea
            v-model="message"
            @blur="
              message === '' ? (messageWarn = true) : (messageWarn = false)
            "
            :class="
              messageWarn
                ? 'warning-border form-control custom-input textarea-height pt-4'
                : 'form-control custom-input textarea-height pt-4'
            "
            placeholder="Digite sua mensagem"
            rows="3"
            id="Message"
          ></textarea>
          <label class="custom-label" for="Message">Digite sua mensagem</label>
          <p v-if="messageWarn" class="warning mb-0 mt-1">
            *A mensagem é obrigatória
          </p>
        </div>

        <div class="col-md-12">
          <div class="theme-btn universal-btn" id="button-3">
            <div id="circle"></div>
            <button type="submit" @click="submitData">
              <span> Enviar <i class="fal fa-arrow-right"></i></span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../../services'
import Cookies from 'js-cookie'
export default {
  props: ['blogDetail'],
  data() {
    return {
      name: '',
      nameWarn: false,
      email: '',
      emailWarn: false,
      emailValidWarn: false,
      message: '',
      messageWarn: false,
      isValid: false,
      userDetail: {},
      commentDetail: [],
      tokenData: ''
    }
  },
  methods: {
    async submitData() {
      this.checkValid()
      if (this.isValid) {
        const InputData = {
          user: this.userDetail,
          comment: this.message,
          our_blogs: this.blogDetail,
          name: this.name,
          email: this.email,
        }
        const commentData = await api.product.blogPostService('comments', InputData)
        this.commentDetail.push(commentData)
        this.$toasted.show('Sucesso!', {
          position: 'top-center',
          duration: 3000
        })
        this.name = ''
        this.email = ''
        this.message = ''
      } else {
        this.$toasted.show('Erro ao enviar comentário!', {
          position: 'top-center',
          duration: 3000
        })
      }
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
    checkValid() {
      this.emailValid()
      if (
        this.name === '' ||
        this.nameWarn ||
        this.email === '' ||
        this.emailWarn ||
        this.emailValidWarn ||
        this.message === '' ||
        this.messageWarn
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
      if (this.message === '') {
        this.messageWarn = true
      } else {
        this.messageWarn = false
      }
    },
  },
  async fetch() {
    this.tokenData = Cookies.get('token')
    if(this.tokenData){
    const userData = await api.product.userDetail()
    this.userDetail = userData.data
    this.name = userData.data.name
    this.email = userData.data.email
    this.commentDetail = await api.product.blogService('comments')
    }
  },
}
</script>

<style lang="scss">
.comment-one__title {
  margin: 0;
  font-size: 30px;
  font-weight: 800;
  margin-bottom: 51px;
  text-transform: uppercase;
}
.comment-form__title {
  margin: 0;
  font-size: 30px;
  font-weight: 800;
  margin-bottom: 51px;
  text-transform: uppercase;
}
.comment-one__single {
  display: flex;
  border-bottom: 1px solid #e6e9ef;
  padding-bottom: 60px;
  margin-bottom: 60px;
}
.comment-one__content {
  position: relative;
  margin-left: 45px;
  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 36px;
    text-transform: uppercase;
  }
  p {
    font-weight: 500;
    font-size: 16px;
    margin: 0;
    line-height: 30px;
  }
}
.comment-one__btn {
  font-size: 12px;
  line-height: 40px;
  padding: 2px 20px;
  font-weight: 700;
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    overflow: hidden;
  }
}
.comment-one__image {
  width: 100px;
  img {
    border-radius: 50%;
    mix-blend-mode: luminosity;
  }
}
.comment-form {
  .comment-form__title {
    margin-top: -6px;
  }
}
.comment-form__input-box {
  position: relative;
  display: block;
  input[type='text'] {
    height: 70px;
    width: 100%;
    border: none;
    padding-left: 30px;
    padding-right: 60px;
    margin-bottom: 30px;
    border-radius: 0px;
    outline: none;
    font-size: 14px;
    font-weight: 500;
    display: block;
  }
  input[type='email'] {
    height: 70px;
    width: 100%;
    border: none;
    padding-left: 30px;
    padding-right: 60px;
    margin-bottom: 30px;
    border-radius: 0px;
    outline: none;
    font-size: 14px;
    font-weight: 500;
    display: block;
  }
  textarea {
    font-size: 14px;
    height: 140px;
    width: 100%;
    padding: 20px 30px 30px;
    border: none;
    border-radius: 0px;
    outline: none;
    margin-bottom: 20px;
    font-weight: 500;
  }
}
.comment-form__icon {
  position: absolute;
  top: 50%;
  right: 30px;
  bottom: 0;
  transform: translateY(-50%);
  i {
    font-size: 14px;
  }
}
.contact-expert__icon-comment {
  top: 20px;
  transform: inherit;
}

.comment-form {
  form .form-control.custom-input {
    height: 54px !important;
  }
  form label.custom-label {
    padding-left: 30px;
    font-size: 15px;
    font-weight: normal;
    color: #7b7b7b;
  }
  form textarea.form-control.custom-input {
    height: 130px !important;
  }
}

// Responsive
@media screen and (max-width: 767px) {
  .comment-one__content {
    margin-left: 15px;
    h3 {
      margin-bottom: 6px;
    }
    .comment-one__content p {
      font-size: 14px;
    }

    .comment-one__btn {
      margin-top: -12px;
      padding: 0 22px;
    }
  }
}
</style>
