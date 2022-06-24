<template>
  <div>
    <div class="text-center" v-if="$fetchState.pending">
      <img src="~assets/images/spinner.gif" style="width: 60px;padding-top: 300px !important;">
      </div>
      <div v-else-if="$fetchState.error">
      <p>Erro ao buscar dados</p>
      </div>
    <section v-else class="stolen">
      <div class="bg-light-blue">
        <div class="theme-container">
          <div class="row">
            <div class="col-12 col-md-6" v-for="(info, index) in searchDetail" :key="index">
              <div class="custom-width">
                <div class="d-flex justify-content-between align-items-center">
                  <h4 v-if="info.stolen" class="them-title">ROUBADA</h4>
                  <span class="d-flex align-items-center"
                    >Partilha :
                    <ul class="social-icon d-flex">
                      <li v-for="network in networks" :key="network.network" class="mx-1">
                        <ShareNetwork
                          :network="network.network"
                          :url="sharing.url"
                          :title="sharing.title"
                          :quote="sharing.quote+' '+sharing.url"
                          :hashtags="sharing.hashtags"
                        >
                          <a :class="network.class" class="text-white"
                            ><i :class="network.icon"></i>
                          </a>
                        </ShareNetwork>
                      </li>
                    </ul>
                  </span>
                </div>
                <h6>{{ info.model ? info.model : info.nickName }}</h6>
                <ul class="custom-ul-padding">
                  <li v-if="info.stolen">
                    <span><i class="fal fa-bicycle"></i></span
                    ><strong>Roubada: </strong>{{ dateFormat(info.stolen_details ? info.stolen_details.stolen_date : '', 'MM/DD/YYYY, H:mm') }}
                  </li>
                  <li v-else>
                    <span><i class="fal fa-bicycle"></i></span
                    ><strong>Registada em: </strong>{{ dateFormat(info.created_at ? info.created_at : '', 'DD/MM/YYYY, H:mm') }}
                  </li>
                  <li>
                    <span><i class="fal fa-map-marker-alt"></i></span
                    ><strong>{{info.stolen ? 'A partir de:' : 'Localização'}}  </strong>{{ info.stolen && info.stolen_details ? info.stolen_details.city : info.user.city }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-12 col-md-6" v-for="info in searchDetail" :key="info.id">
              <div class="contect-owner">
                <div class="row">
                  <div class="col-12 col-md-4">
                    <div class="contect-owner-img">
                      <img src="~assets/images/contect-owner.png" alt="" />
                    </div>
                  </div>
                  <div class="col-12 col-md-8 p-2">
                    <h6>CONTACTAR O PROPRIETÁRIO</h6>
                    <nuxt-link to="#" class="small"
                      >Tem informações sobre esta bicicleta?</nuxt-link
                    >
                    <p>
                      {{ info.model ? info.model : info.nickName }}
                    </p>
                    <div @click="!token ? $router.push('/login') : ''" class="theme-btn-hover mt-2" id="button-hover">
                      <div id="circle-hover"></div>
                      <a :href="token ? '#write-message' : ''"><span
                          ><i class="fal fa-money-check-edit pe-2"></i
                        ></span>
                     Envia uma mensagem
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white">
        <div class="theme-container">
          <div class="row pt-4 pb-4" v-for="info in searchDetail" :key="info.id">
            <div class="col-12 col-md-12 col-lg-8">
              <div class="position-relative stolen-slider" v-if="info.stolen && info.for_stolen.length > 0">
                <VueSlickCarousel v-bind="settings" ref="carousel">
                  <div class="item px-1" v-for="img in info.for_stolen" :key="img.id">
                    <img class="img-set rounded" :src="__getBaseUrl+img.url" alt="img" />
                  </div>
                </VueSlickCarousel>
                <!-- <div class="divht">
                  <span class="icon-color"><i class="fal fa-chevron-left p-2 arrow-left" size="1.7em" @click="showPrev" ></i></span>
                  <span class="icon-color"><i class="fal fa-chevron-right mr-4 p-2 arrow-right" @click="showNext" ></i></span>
                </div> -->
              </div>
              <div class="position-relative stolen-slider" v-if="info.on_sale && info.for_classified.length > 0">
                <VueSlickCarousel v-bind="settings" ref="carousel">
                  <div class="item px-1" v-for="img in info.for_classified" :key="img.id">
                    <img class="img-set rounded" :src="__getBaseUrl+img.url" alt="img" />
                  </div>
                </VueSlickCarousel>
              </div>
              <div class="position-relative stolen-slider" v-if="!info.stolen && !info.on_sale">
                <VueSlickCarousel v-bind="settings" :asNavFor="$refs.thumbSettings" ref="settings">
                  <div class="item px-1">
                    <img class="img-set rounded" :src="__getBaseUrl+info.bike_photo.url" alt="img" />
                  </div>
                </VueSlickCarousel>
              </div>
              <div class="position-relative stolen-slider" v-if="info.stolen && info.for_stolen.length === 0">
                <VueSlickCarousel v-bind="settings" :asNavFor="$refs.thumbSettings" ref="settings">
                  <div class="item px-1">
                    <img class="img-set rounded" :src="__getBaseUrl+info.bike_photo.url" alt="img" />
                  </div>
                </VueSlickCarousel>
              </div>
              <div class="position-relative stolen-slider" v-if="info.on_sale && info.on_sale.length === 0">
                <VueSlickCarousel v-bind="settings" :asNavFor="$refs.thumbSettings" ref="settings">
                  <div class="item px-1">
                    <img class="img-set rounded" :src="__getBaseUrl+info.bike_photo.url" alt="img" />
                  </div>
                </VueSlickCarousel>
              </div>
            </div>

            <div class="col-12 col-md-12 col-lg-4">
              <div class="stolen-side">
                <h5 class="them-subtitle">Informações da bicicleta</h5>
                <ul>
                  <li>
                    <span><i class="fal fa-bicycle"></i></span>
                    <p><strong>Marca:</strong> {{ info.brands.length > 0 && info.brands[0].name ? info.brands[0].name : 'N/A'}}</p>
                  </li>
                  <li>
                    <span><i class="fal fa-oven"></i></span>
                    <p><strong>Modelo:</strong> {{ info.model ? info.model : 'N/A' }}</p>
                  </li>
                  <li>
                    <span><i class="fal fa-calendar-alt"></i></span>
                    <p><strong>Ano:</strong> {{ info.year.year ? info.year.year : 'N/A' }}</p>
                  </li>
                  <li>
                    <span><i class="fal fa-palette"></i></span>
                    <p><strong>Cor principal:</strong> {{ info.color.name ? info.color.name : 'N/A' }}</p>
                  </li>
                  <li>
                    <span><i class="fal fa-bicycle"></i></span>
                    <p><strong>Tamanho da roda:</strong> {{ info.wheel_size.size ? info.wheel_size.size : 'N/A' }}</p>
                  </li>
                  <li>
                    <span><i class="fal fa-tire"></i></span>
                    <p><strong>Materiais:</strong> {{ info.materials.length > 0 && info.materials[0].name ? info.materials[0].name : 'N/A' }}</p>
                  </li>
                  <li>
                    <span><i class="fal fa-bicycle"></i></span>
                    <p><strong>Descrição adicional:</strong> {{ info.other_information ? info.other_information : 'N/A' }}</p>
                  </li>
                  <li>
                    <span><i class="fal fa-tire"></i></span>
                    <p><strong>Tipo de Suspensão:</strong> {{ info.suspension_types.length > 0 && info.suspension_types[0].type ? info.suspension_types[0].type : 'N/A' }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row pb-5" v-for="(info, index) in searchDetail" :key="index">
            <div class="col-12 col-md-4">
              <div class="stolen-side">
                <h5 class="them-subtitle">{{ info.stolen ? 'Detalhes de roubo' : 'Detalhes adicionais' }}</h5>
                <ul>
                  <li>
                    <span><i class="fal fa-oven"></i></span>
                    <p><strong>Cidade de Registo:</strong> {{ info.user && info.user.city ? info.user.city : 'N/A' }}
                    </p>
                  </li>
                  <li v-if="info.stolen">
                    <span><i class="fal fa-bicycle"></i></span>
                    <p><strong>Roubado em:</strong> {{ info.stolen && info.stolen_details ? info.stolen_details.city : 'N/A' }}
                    </p>
                  </li>
                  <li>
                    <span><i class="fal fa-calendar-alt"></i></span>
                    <p><strong>Ano:</strong> {{ info.year.year ? info.year.year : 'N/A' }}
                    </p>
                  </li>
                  <li v-if="info.stolen">
                    <span><i class="fal fa-bicycle"></i></span>
                    <p><strong>Descrição:</strong> {{ info.stolen && info.stolen_details ? info.stolen_details.incident_description : 'N/A' }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-12 col-md-8">
              <div class="map">
                <GmapMap
                  :center='center'
                  :zoom='12'
                  style='width:100%;  height: 100%;'
                >
                  <GmapMarker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    @click="center=m.position"
                  />
                </GmapMap>
                <div id="write-message"></div>

              </div>
            </div>
          </div>
        </div>
      </div>


  <!-- END Write them a message popup -->

 <!--Stolen Form-->


<section class="section-pad">
   <div class="theme-container">
       <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Envia uma mensagem</h5>
      </div>
      <div class="modal-body">
        <form @submit.prevent action="">

        <div class="form-input mb-4">
        <textarea
        v-model="messageBox"
        @blur="messageBox === '' ? messageBoxWarn = true : messageBoxWarn = false"
        :class="messageBoxWarn ? 'warning-border form-control custom-input textarea-height' : 'form-control custom-input textarea-height'"
        placeholder="Digite uma mensagem para o proprietário da bicicleta"
        rows="3"
        id="Message">
        </textarea>
        <span v-if="messageBoxWarn" class="warning">*Por favor introduz a mensagem!</span>
        </div>

        <div class="theme-btn universal-btn" id="button-3">
        <div id="circle"></div>
        <button @click="sendMessage" type="submit" :data-bs-dismiss="messageValid ? 'modal' : ''" >
         <span>Enviar <i class="fal fa-arrow-right"></i></span>
        </button>
        </div>

        </form>
      </div>
    </div>
 </div>
</section>


    </section>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import api from '../../services'
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  components: {
    VueSlickCarousel
  },
  props: ['bikeId'],
  data () {
    return {
        defaultCity: '',
        cityInfo: [],
        markers: [],
        center: null,
        messageBox: '',
        modal: 'modal',
        sender: '',
        receiver: '',
        messageBoxWarn: false,
        messageValid: false,
        sharing: {
          url: '',
          title: '',
          quote: '',
          hashtags: '',
        },
        networks: [
          { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2', class: 'fb' },
          { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2', class: 'twitter' }
        ],
        searchDetail: [],
        settings: {
          arrows: true,
          dots: false,
          fade: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          swipe: true,
          swipeToSlide: true
        }
      }
  },
  computed: {
    ...mapGetters({
      __getBaseUrl: 'product/getBaseUrl'
    })
  },
  methods: {
    showNext() {
      this.$refs.carousel.next()
    },
    showPrev() {
      this.$refs.carousel.prev()
    },
    dateFormat(val, format) {
      return dayjs(val).format(format)
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
    async sendMessage() {
      this.checkMessageBox()
      if(this.token) {
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
    const slug = this.$route.params.slug
    this.searchDetail = await api.product.searchBikeDetail(slug)
    const bikeData = this.searchDetail
    const lat = bikeData[0].latitude
    const lng = bikeData[0].longitude
    this.center = { lat: bikeData[0].latitude ? parseFloat(lat) : 38.7223, lng: bikeData[0].longitude ? parseFloat(lng) : -9.1393 }
    this.markers.push({ position: this.center })
    this.receiver = bikeData[0].user.id
    this.token = Cookies.get('token')
    if(this.token) {
      const sender = await api.product.userDetail()
      this.sender = sender.data.id
    }
    this.sharing.url = bikeData[0].stolen ? 'https://cicla.pt/stolen-bikes/'+bikeData[0].slug : 'https://cicla.pt/search-bikes/'+bikeData[0].slug
    this.sharing.title = bikeData[0].stolen && bikeData[0].stolen_details ? bikeData[0].stolen_details.incident_description : bikeData[0].other_information
    this.sharing.quote = bikeData[0].stolen && bikeData[0].stolen_details ? bikeData[0].stolen_details.incident_description : bikeData[0].other_information
    const cityData = await api.product.getCityData()
    this.cityInfo = cityData.data
    for(let n of this.cityInfo) {
      if(n.id == this.searchDetail[0].user.city) {
        this.defaultCity = n.name
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$them-color: #fd5044;
$them-color-yellow:#f2ad49;
$them-color-dark: #1b1b1b;
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
    top: 45%;
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
    top: 45%;
    right: 40px;
}
section.section-pad {
    padding: 20px 0 80px;
    textarea.form-control {
    min-height: 140px;
}
}
.slick-slide img{
    display: block;
    width: 100%;
    max-height: 600px;
    object-fit: cover;
}
section.stolen {
    width: 100%;
    .bg-light-blue{
    background-color: #f9fbfc;
    padding: 70px 0px 30px 0px;
    }
    .bg-white{
        background-color: #fff;
        padding: 20px 0px 20px 0px;
        }
    .custom-width {
        max-width: 500px;
        h4 {
            line-height: 46px !important;
        }
        span{
            font-size: 16px;
            font-weight: 600;
            color: #404040;
        }
        ul.social-icon {
            margin-bottom: 0;
            padding-left: 20px;
            a {
                padding: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                color: #fff;
                transition: all 0.3s ease-in-out;
                &:hover{
                    box-shadow: 0px 0px 13px 6px #dadada;
                }
            }
            .fb {
                background-color: #3b5998;
                margin-right: 10px;
            }
            .twitter {
                background-color: #55acee;
            }

        }
        h6{
            font-size: 24px;
            font-weight: 500;
        }
        ul.custom-ul-padding {
            padding-left: 0;
            margin-bottom: 0;
            margin-top: 22px;
            li{
                margin-bottom: 17px;
                font-size: 18px;
                color: #404040;
                i{
                    font-size: 28px;
                    margin-right: 10px;
                }
            }
        }
    }
    .contect-owner {
        background: #fff;
        padding: 15px;
        border-radius: 5px;
        box-shadow: 0px 0px 13px 8px #f5f5f5;
        .contect-owner-img {
            background: #ececec;
            height: 100%;
            border-radius: 5px;
            position: relative;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        h6 {
            font-size: 16.52px;
            line-height: 16.37px;
            margin-bottom: 0;
        }
        .small{
            color: $them-color;
        }
        .small, p{
            font-size: 12.92px;
            line-height: 23.9px;
        }
        p{
            margin-bottom: 0;
        }
        #button-hover{
            background-color: #323232;
        }

    }
}
.stolen-side {
    background: #f0f4f6;
    padding: 28px;
    border-radius: 8px;
    height: 100%;
    ul{
        margin-bottom: 0;
        padding-left: 0;
        li{
            display: flex;
            margin-bottom: 15px;
            span{
                font-size: 20px;
                color: $them-color;
                margin-right:15px
            }
            p{
                font-size: 16px;
                color: #3e3e3e;
                margin-bottom: 0;
                font-weight: 400;
            }
            a{
                color: $them-color;
            }
        }
    }
}
.map {
    width: 100%;
    height: 100%;
}
#write-message{
  textarea#Message {
    height: 140px !important;
    resize: none;
}

input:focus, textarea:focus{
  box-shadow: none !important;
  border: 1px solid #ced4da;
}
}
// Popup
</style>

<style>

.stolen-slider .slick-next {
    right: 20px;
    font-size: 40px;
}
.stolen-slider .slick-prev {
    left: 20px;
    z-index: 9;
}

.stolen-slider  .slick-prev:before, .slick-next:before {
    font-family: 'slick';
    font-size: 26px;}


</style>
