<template>
  <section class="classifiedDetails section-padding mt-0 theme-bg-light">
    <div class="text-center" v-if="$fetchState.pending">
      <img src="~assets/images/spinner.gif" style="width: 60px;padding-top: 300px !important;">
      </div>
      <div v-else-if="$fetchState.error">
      <p>Erro ao buscar dados</p>
      </div>
    <div v-else class="theme-container">
      <div class="row" v-for="info in classifieds" :key="info.id">
        <div class="col-xl-8 col-md-7">
           <div class="sell-items-bx">
          <div class="row p-0">
            <div class="col-12 col-md-12 mb-4">
              <div class="relative-position classified-slider" v-if="info.for_classified.length > 0">
                <VueSlickCarousel
                  v-bind="settings"
                  ref="settings"
                >
                  <div class="item px-1" v-for="img in info.for_classified" :key="img.id">
                    <img class="rounded" :src="__getBaseUrl+img.url" alt="img" />
                  </div>
                </VueSlickCarousel>
              </div>
              <div class="relative-position classified-slider" v-else>
                <VueSlickCarousel
                  v-bind="settings"
                  ref="settings"
                >
                  <div class="item px-1">
                    <img class="rounded" :src="__getBaseUrl+info.bike_photo.url" alt="img" />
                  </div>
                </VueSlickCarousel>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <h4 class="them-title bike-title-clf">{{ info.brand }} {{ info.model }}</h4>
              <p class="updated">Atualizado em : {{ dateFormat(info.created_at, 'DD MM YYYY') }}</p>
            </div>
            <!--2-->
            <div class="col-12 col-md-6 text-end mob-left-text">
              <div class="listing-id btn">
                <p>Venda Número # {{ info.id }}</p>
              </div>
              <h5 class="price">€{{ info.price ? info.price : '200' }}</h5>
              <a href="javascript:void(0)" class="action">VENDA</a>
            </div>
            <div class="col-12 col-md-12 mt-4">
              <div class="border-card rounded">
                <div class="row custom-padding" v-for="info in classifieds" :key="info.id">
                  <h5 class="them-subtitle mt-3">Informações</h5>
                  <div
                    class="col-12 col-md-6 mb-3"
                  >
                    <div
                      class="
                        border-right-card
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <p class="mb-0">Categoria de bicicleta:</p>
                      <p class="mb-0">{{ info.category.name ? info.category.name : 'N/A' }}</p>
                    </div>
                  </div>
                  <div
                    class="col-12 col-md-6 mb-3"
                  >
                    <div
                      class="
                        border-right-card
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <p class="mb-0">Tamanho da roda:</p>
                      <p class="mb-0">{{ info.wheel_size.size ? info.wheel_size.size : 'N/A' }}</p>
                    </div>
                  </div>
                  <div
                    class="col-12 col-md-6 mb-3"
                  >
                    <div
                      class="
                        border-right-card
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <p class="mb-0">Cor primária:</p>
                      <p class="mb-0">{{ info.color.name ? info.color.name : 'N/A' }}</p>
                    </div>
                  </div>
                  <div
                    class="col-12 col-md-6 mb-3"
                  >
                    <div
                      class="
                        border-right-card
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <p class="mb-0">Cor secundária:</p>
                      <p class="mb-0">{{ info.secondary_colors.length > 0 && info.secondary_colors[0].name ? info.secondary_colors[0].name : 'N/A' }}</p>
                    </div>
                  </div>
                  <div
                    class="col-12 col-md-6 mb-3"
                  >
                    <div
                      class="
                        border-right-card
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <p class="mb-0">material de bicicleta:</p>
                      <p class="mb-0">{{ info.materials.length > 0 && info.materials[0].name ? info.materials[0].name : 'N/A' }}</p>
                    </div>
                  </div>
                  <div
                    class="col-12 col-md-6 mb-3"
                  >
                    <div
                      class="
                        border-right-card
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <p class="mb-0">Tipo de Suspensão:</p>
                      <p class="mb-0">{{ info.suspension_types.length > 0 && info.suspension_types[0].type ? info.suspension_types[0].type : 'N/A' }}</p>
                    </div>
                  </div>
                </div>
                <hr />
                <div v-if="info.remarks" class="row custom-padding pb-3">
                  <h5 class="them-subtitle">Descrição</h5>
                  <p>{{ info.remarks }}</p>
                </div>
              </div>
            </div>

          </div>
           </div>

          <div class="sell-items-bx mt-3" v-if="!(info.user.id === sender)">
            <div class="chat-wrapper-box" id="chatinbox">
              <div class="top-user-info-chat">
                <div class="d-flex align-items-center">
                  <span><img src="~assets/images/chat-user.png"></span>
                  <div class="user-name"><h3>{{ info.user.name }}</h3>
                    <p>Membro desde {{ dateFormat(info.user.created_at, 'DD/MM/YYYY') }}</p>
                   </div>
                </div>
                <div class="chat-form">
                  <textarea
                    v-model="messageBox"
                    @blur="checkMessageBox"
                    :class="messageBoxWarn ? 'warning-border' : 'message-border'"
                    placeholder="Escreve uma mensagem..."></textarea>
                    <p v-if="messageBoxWarn" class="warning warn-text">*O campo de mensagem é obrigatório</p>
                </div>
                <div class="theme-btn universal-btn mt-2" id="button-3">
                  <div id="circle"></div>
                    <button type="submit" @click="submitMessage">
                      <span>Enviar para <i class="fal fa-paper-plane"></i></span>
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-md-5 mob-right-sidebar">
          <div class="ps-4">
            <div class="sidebar__single box-shadow mb-5">
              <div class="card-img">
                <div class="relative-position">
                  <img
                    class="card-top-img"
                    src="~assets/images/card-box-shadow-img.jpg"
                    alt="img"
                  />
                  <div class="overlay"></div>
                </div>

                <ul class="d-flex owner-details">
                  <li>
                    <img
                      src="~assets/images/chat-user.png"
                      alt="img"
                    />
                  </li>
                  <li class="ps-3">
                    <h5 class="text-white mb-0">{{ info.user.name }}</h5>
                    <p class="text-white mb-0">Membro desde {{ dateFormat(info.user.created_at, 'DD/MM/YYYY') }}</p>
                    <ul class="d-flex ps-0 text-warning">
                      <li><i class="fal fa-star"></i></li>
                      <li><i class="fal fa-star"></i></li>
                      <li><i class="fal fa-star"></i></li>
                      <li><i class="fal fa-star"></i></li>
                      <li><i class="fal fa-star"></i></li>
                    </ul>
                  </li>
                </ul>
              <div class="px-3" @click="!token ? $router.push('/login') : ''" v-if="!(info.user.id === sender)">
                <div class="theme-btn universal-btn" id="button-3">
                  <div id="circle"></div>
                  <a href="#chatinbox">
                    <span><i class="fal fa-comment-alt-lines pe-2"></i> Enviar Mensagem</span>
                  </a>
                </div>
              </div>

              </div>
            </div>
            <div class="sidebar__single box-shadow">
              <h5 class="sidebar__title mb-3">Encontre-nos no mapa</h5>
              <GmapMap
                :center='center'
                :zoom='12'
                style='width:100%;  height: 300px;'
              >
                <GmapMarker
                  :key="index"
                  v-for="(m, index) in markers"
                  :position="m.position"
                  @click="center=m.position"
                />
              </GmapMap>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '../../services'
import {mapGetters} from 'vuex'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
export default {
  components: {
    VueSlickCarousel
  },
  data() {
    return {
      token: '',
      markers: [],
      center: null,
      classifieds: [],
      messageBox: '',
      messageBoxWarn: false,
      messageValid: false,
      receiver: '',
      sender: '',
      bikeId: '',
      settings: {
        arrows: true,
        dots: false,
        fade: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        swipe: true,
        swipeToSlide: true,
      }
    }
  },
  computed: {
    ...mapGetters({
      __getBaseUrl: 'product/getBaseUrl',
    }),
  },
  methods: {
    dateFormat(value, format) {
      return dayjs(value).format(format)
    },
    checkMessageBox() {
      if(this.messageBox === ''){
        this.messageBoxWarn = true
        this.messageValid = false
      } else {
        this.messageBoxWarn = false
        this.messageValid = true
      }
    },
    async submitMessage() {
      if(this.token) {
        this.checkMessageBox()
        if(this.messageValid) {
          const message = {
            bike: this.bikeId,
            sender: this.sender,
            reciever: this.receiver,
            message: this.messageBox,
            read: false
          }
          const data = {
            bike: this.bikeId,
            reciever: this.receiver,
            message: this.messageBox
          }
          await api.product.messageService(message)
          await api.product.messageEmailService(data)
          this.$toasted.show('Mensagem enviada com sucesso!', {
            position: 'top-center',
            duration: 3000
          })
          this.messageBox = '',
          this.bikeId = '',
          this.sender = '',
          this.receiver = ''
        } else {
          this.$toasted.show('Erro, algo deu errado!', {
            position: 'top-center',
            duration: 3000
          })
        }
      } else {
        this.$router.push('/login')
      }
    }
  },
  async fetch() {
    this.token = Cookies.get('token')
    const slug = this.$route.params.slug
    const classifieds = await api.product.classifiedDetailData(slug)
    this.classifieds = classifieds.data
    const bikeData = this.classifieds
    this.receiver = bikeData[0].user.id
    const lat = bikeData[0].latitude
    const lng = bikeData[0].longitude
    this.center = { lat: bikeData[0].latitude ? parseFloat(lat) : 38.7223, lng: bikeData[0].longitude ? parseFloat(lng) : -9.1393 }
    this.markers.push({ position: this.center })
    if(this.token) {
      const sender = await api.product.userDetail()
      this.sender = sender.data.id
    }
    this.bikeId = bikeData[0].id
  }
}
</script>

<style lang="scss">
  .classifiedDetails{
    & .slick-next {
    right: 20px;
    font-size: 30px;
}


.chat-form {
textarea {
    width: 100%;
    height: 190px;
    resize: none;
    padding: 15px;
    margin-top: 30px;
    background: #f9fbfc;
    border-radius: 4px;
    font-size: 15px;
    outline: none !important;
}
}

.message-border {
    border: 1px solid #ddd !important;
}

.warn-text {
  width: 100%;
  display: block;
}

.top-user-info-chat {
img {
    max-width: 75px;
}
h3 {
    font-size: 18px;
}

p {
    font-size: 13px;
    margin: 0;
}

.user-name {
    padding-left: 18px;
}

}


.slick-prev {
    left: 20px;
    z-index: 9;
}

.slick-prev:before, .slick-next:before {
    font-size: 26px;
}

.sell-items-bx {
    position: relative;
    border-radius: 6px;
    padding: 24px;
    background: #FFFFFF;
    margin-bottom: 24px;
    box-shadow: 0px 3px 21px 5px #f1f1f1;
}

  }
</style>
<style lang="scss" scoped>
$them-color: #fd5044;
$them-color-yellow: #f2ad49;
$them-color-dark: #1b1b1b;

.slick-slide img {
  display: block;
  width: 100%;
  height: 600px;
  object-fit: cover;
}
.item.small-images-slider {
    height: 120px;
}
.item.small-images-slider img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

form .form-floating > .custom-input:focus ~ .custom-label,
form .form-floating > .custom-input:not(:placeholder-shown) ~ .custom-label,
form .form-floating > .form-select ~ .custom-label {
  opacity: 1;
  transform: scale(0.85) translateY(-11px) translateX(0.8rem);
  color: #6a6a6a !important;
  background-color: #ffffff;
  height: 26px;
  color: #686868;
  font-size: 16px;
  padding: 0 !important;
}

.sidebar__single.box-shadow.mb-5 .px-3 {
  padding: 0 !important;
}
.arrow-left {
  border: 1px solid #ebe5e5;
  border-radius: 100%;
  float: right;
  background-color: white;
  color: grey;
  width: 40px;
  height: 40px;
  display: grid;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 36%;
  left: 40px;
}
.arrow-right {
  border: 1px solid #ebe5e5;
  border-radius: 100%;
  float: right;
  background-color: white;
  color: grey;
  width: 40px;
  height: 40px;
  display: grid;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 36%;
  right: 40px;
}
.relative-position {
  position: relative;
}
.classifiedDetails {
  form .form-floating > .custom-input:focus ~ .custom-label,
  form .form-floating > .custom-input:not(:placeholder-shown) ~ .custom-label,
  form .form-floating > .form-select ~ .custom-label {
    background-color: transparent !important;
  }
  width: 100%;
  .bg-form {
    border: none !important;
    border-radius: 0;
    resize: none;
    background: #f0f0f0;
  }
  label.custom-label {
    padding: 13px 10px;
    font-size: 15px;
    color: #1c1c1c;
  }

  h4.them-title.bike-title-clf {
    font-size: 28px !important;
    line-height: 38px !important;
  }
  .listing-id {
    padding: 0;
    text-align: right;
    margin-bottom: 10px;
    p {
      background: #f1f1f1;
      padding: 10px 20px;
      margin: 0;
      text-align: center;
      font-size: 18px;
      color: #3e3d3d;
      font-weight: 500;
      width: auto;
    }
  }
  .action {
    color: $them-color;
  }
  .updated {
    font-size: 17px;
    color: #3e3d3d;
    font-weight: 500;
  }
  .price {
    font-size: 20px;
    color: #000;
  }
  h4 {
    margin-bottom: 0;
  }
}

.border-card {
  border: 1px solid #d7d9d9;
  .custom-padding {
    padding-right: 25px;
    padding-left: 25px;
    p {
      color: #262626 !important;
      font-size: 14px !important;
      font-weight: 400 !important;
    }
  }
  .border-right-card {
      background: #f5f5f5;
    padding: 13px 20px;
    border-radius: 4px;
    border-left: 7px solid #fd5044;
    cursor: pointer;
    p {
      color: #262626 !important;
      font-size: 14px !important;
      font-weight: 500 !important;
    }
  }
  .rating {
    display: inline-block;
    position: relative;
    height: 50px;
    line-height: 50px;
    font-size: 25px;
  }
  .rating label {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    cursor: pointer;
  }
  .rating label:last-child {
    position: static;
  }
  .rating label:nth-child(1) {
    z-index: 5;
  }
  .rating label:nth-child(2) {
    z-index: 4;
  }
  .rating label:nth-child(3) {
    z-index: 3;
  }
  .rating label:nth-child(4) {
    z-index: 2;
  }
  .rating label:nth-child(5) {
    z-index: 1;
  }
  .rating label input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
  .rating label .icon {
    float: left;
    color: transparent;
  }
  .rating label:last-child .icon {
    color: #aaa;
  }
  .rating:not(:hover) label input:checked ~ .icon,
  .rating:hover label:hover input ~ .icon {
    color: $them-color;
  }
  .rating label input:focus:not(:checked) ~ .icon:last-child {
    color: #aaa;
    text-shadow: 0 0 5px $them-color;
  }
  .border-card.row.Description p {
    font-size: 14px;
    color: #353535;
    font-weight: 400;
    line-height: 24px;
  }
  h5.them-subtitle {
    font-size: 22px !important;
    color: #262626;
  }
}

// Sidebar

.sidebar__single.box-shadow {
  box-shadow: 12px 6px 74px -7px #ddd;
  padding: 20px;
  border-radius: 6px;
  .card-top-img {
    border-radius: 6px !important;
    width: 100%;
  }
  ul.d-flex.owner-details {
    padding: 0px 15px;
    align-items: center;
    width: 100%;
    margin-top: -83px;
    position: relative;

    img {
      border-radius: 6px;
      max-width: 80px;
    }
  }
  img {
    border-radius: 6px;
  }
  .overlay {
    position: absolute;
    background: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 6px !important;
  }
  p.margin {
    font-size: 18px;
  }
  h4.sidebar__title {
    font-size: 22px !important;
    font-weight: 500;
  }
  .seller-contact h5 {
    font-size: 22px !important;
  }

  .seller-contact label.custom-label {
    padding: 13px 10px;
    font-size: 15px;
    color: #1c1c1c;
  }

  .bg-form {
    border: none !important;
    border-radius: 0;
    resize: none;
    background: #f0f0f0;
  }
}
/*****=========================RESPONSIVE======================****/
@media screen and (max-width: 1449px) {
}

@media screen and (max-width: 1299px) {
}

@media screen and (max-width: 1200px) {
}

@media screen and (max-width: 1100px) {
}

@media screen and (max-width: 991px) {
  .sidebar__single.box-shadow ul.d-flex.owner-details {
    margin-top: 20px;
    align-items: start;
    padding: 0;
    .text-white {
      color: #000 !important;
    }
  }

  .classifiedDetails .listing-id p {
    font-size: 13px;
  }
}

@media screen and (max-width: 767px) {
  .mob-left-text {
    text-align: left !important;
    margin: 0 !important;
  }
  .mob-right-sidebar .ps-4 {
    padding-left: 0 !important;
    margin-top: 26px;
  }
}

@media screen and (max-width: 579px) {
}
</style>
