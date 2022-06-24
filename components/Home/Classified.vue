<template>
  <section class="realated pt-5 section-padding">
    <div>
</div>

    <div class="theme-container">
      <div class="section-title text-center pt-5 pb-3">
        <h4 class="them-title">Bicicletas Roubadas mais Recentemente</h4>
        <!--p>
         Neste espaço podes verificar as últimas bicicletas a ser roubadas... :(
        </p-->
      </div>

      <div class="classified-list-items mt-5">
        <div class="text-center" v-if="$fetchState.pending">
        <img src="~assets/images/spinner.gif"  style="width: 60px;padding-top: 300px !important;">
        </div>
        <div v-else-if="$fetchState.error">
        <p>Erro ao buscar dados</p>
        </div>
        <div v-else class="row">
          <VueSlickCarousel v-bind="settings" v-if="classifiedBikeInfo && classifiedBikeInfo.length > 0" >
            <div
            class="col-md-12 mb-4 p-3"
            v-for="(info, index) in classifiedBikeInfo"
            :key="index"
          >
            <div class="classified-box bg-white">
              <nuxt-link :to="'/stolen-bikes/'+info.slug">
                <div class="images" v-if="info.bike_photo">
                  <img class="rounded" :src="__getBaseUrl+info.bike_photo.url" alt="img" />
                  <div class="chip top-set-line">
                    <button class="stolen-bike-info" v-if="info.stolen"><span>Roubada</span></button>
                    <button class="buy-bike-info" v-if="info.on_sale && !info.stolen"><span>Compre</span></button>
                  </div>
                </div>
                <div class="info-classified">
                  <div class="location">
                    <i class="fal fa-map-marker-alt"></i> {{ info.stolen && info.stolen_details ? info.stolen_details.city : 'N/A' }}
                  </div>
                  <div class="t-name-classified">{{ info.model }}</div>
                </div>
                <hr />
                <div class="classified-date">
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <div class="date-post" v-if="info.stolen_details">
                      <i class="fal fa-calendar-week"></i> {{ dateFormat(info.stolen_details && info.stolen_details.stolen_date ? info.stolen_details.stolen_date : null,'DD/MM/YYYY') }}
                    </div>
                    <div class="date-post" v-else>
                      <i class="fal fa-calendar-week"></i> N/A
                    </div>
                    <div class="post-user">
                      <span
                        ><img src="~assets/images/user-img.jpg" alt="img"
                      /></span>
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>
      </VueSlickCarousel>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import api from '../../services'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import dayjs from 'dayjs'
export default {
  components:{
    VueSlickCarousel
  },
  data() {
    return {
      classifiedBikeInfo: [],
      settings: {
        "dots": true,
        "focusOnSelect": true,
        "infinite": true,
        "speed": 500,
        "margin": 10,
        "autoplay":false,
        "slidesToShow": 4,
        "slidesToScroll": 3,
        "touchThreshold": 5,
        "arrows": false,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: false,
              dots: false,
              arrows: true
            }
          },
           {
            breakpoint: 767,
            settings: {
              slidesToShow:1,
              slidesToScroll: 1,
              infinite: false,
              dots: false,
              arrows: true
            }
          },
          ]
      },
      classi: [],
      classifieds: [],
      tokenData: ''
    }
  },
  computed: {
    ...mapGetters({
      __getBaseUrl: 'product/getBaseUrl'
    })
  },
  methods: {
    dateFormat(value, format) {
      return dayjs(value).format(format)
    }
  },
  async fetch () {
    this.tokenData = Cookies.get('token')
    this.classifiedBikeInfo = await api.product.blogServiceHighlights("bikes")
    const dateInfo = this.classifiedBikeInfo
  }
}
</script>

<style lang="scss" scoped>
$them-color: #fd5044;
$them-color-yellow: #f2ad49;
$them-color-dark: #1b1b1b;
// Left Sidebar
// Right listing
.chip.top-set-line {
  .buy-bike-info {
    position: absolute;
    border: none;
    top: 21px;
    left: 22px;
    width: 72px;
    height: 34px;
    background: #13c339;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    text-transform: uppercase;
}
.stolen-bike-info{
    position: absolute;
    border: none;
    top: 21px;
    left: 22px;
    width: 80px;
    height: 34px;
    background: #c00202;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    text-transform: uppercase;
}

}


.classified-box {
  border-radius: 4px;
  box-shadow: 2px 6px 24px -7px #ddd;
  transition: 0.5s;
  &:hover {
    box-shadow: 2px 0px 21px 9px #d3d3d3;
  }
  hr {
    margin: 8px 0 0;
  }
  a:hover {
    color: #323232;
  }
  .date-post {
    font-size: 14px;
    color: #2c2c2c;
  }
  .images {
    padding: 15px;
    position: relative
  }
  .info-classified {
    width: 100%;
    padding: 0 15px;
    text-align: left;
  }

  .location {
    padding-bottom: 4px;
    font-size: 15px;
  }

  .t-name-classified {
    font-size: 18px;
    color: #1a1a1a;
    font-weight: bold;
    padding-bottom: 3px;
    text-transform: capitalize;
  }

  .price-fixed {
    font-size: 16px;

    span.items-price {
      font-size: 19px;
      color: #ff3f06;
      font-weight: bold;
    }
  }
}

span.price-type {
  font-size: 13px;
}

.classified-date {
  padding: 10px 15px;
  text-transform: capitalize;
  .post-user span {
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 100px;
    display: inline-block;
  }
  img {
    overflow: hidden;
  }
}

@media screen and (max-width: 767px) {
  .left-sider-fillter {
    margin-bottom: 30px;
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

.classified-list-items  .col-md-12.mb-4.p-3 {
    margin-bottom: 0 !important;
}


}

@media screen and (max-width: 579px) {
}
</style>

<style>
.classified-list-items .slick-prev:before, .slick-next:before {
    font-family: 'slick';
    font-size: 20px;
    line-height: 1;
    opacity: 0.75;
    color: #3e3c3c;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}


.classified-list-items  .slick-next {
    right: -5px;
}

.classified-list-items  .slick-prev {
    left: -5px !important;
}
</style>
