<template>
    <section class="stolen-bike text-left section-padding theme-bg-light">
      <div class="theme-container">
        <div class="row">
          <div class="section-title">
            <h4 class="them-title mb-4">Todas as bicicletas roubadas</h4>
          </div>
          <div class="col-12 text-center" v-if="$fetchState.pending">
            <img src="~assets/images/spinner.gif" style="width: 60px;padding-top: 300px !important;">
          </div>
          <div class="col-12" v-else-if="$fetchState.error">
            <p>Erro ao buscar dados</p>
          </div>
          <div v-else class="col-md-12 col-lg-6" v-for="(info,index) in bikeData" :key="index">
            <div class="stolen-bike-box" data-animation="fadeIn" data-animation-delay="240ms">
              <div class="chip-stolen top-set-line-stolen">
                <button v-if="info.stolen" class="stolen-bike-stolen-btn"><span>ROUBADA</span></button>
              </div>
              <nuxt-link :to="'/stolen-bikes/'+info.slug">
                <div class="stolen-content-box">
                  <div class="stolen-bike-image">
                    <img class="custom-height" :src="__getBaseUrl+info.bike_photo.url" alt="img" />
                  </div>
                  <div class="stolen-bike-info">
                    <h4>{{ info.bike && info.bike.complementary_description ? info.bike.complementary_description : info.complementary_description }}</h4>
                    <ul>
                      <li>
                        <span>Marca:</span>
                        {{ info.brands.length > 0 && info.brands[0].name ? info.brands[0].name : 'N/A' }}
                      </li>
                      <li>
                        <span>Localização:</span>
                        {{ info.user && info.user.city ? info.user.city : 'N/A' }}
                      </li>
                      <li>
                        <span>Cores:</span>
                        {{ info.color ? info.color.name : info.secondary_colors.name}}
                      </li>
                      <li class="stolen">
                        <span>Roubada:</span>
                        {{ info.stolen && info.stolen_details ? getDate(info.stolen_details.stolen_date, 'DD/MM/YYYY  , H:mm') : 'N/A' }}

                      </li>
                    </ul>
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>
          <div class="col-md-12 text-center mt-3" v-if="dataLength > bikeData.length">
            <div class="theme-btn universal-btn text-center" id="button-3" data-aos="fade-up" data-aos-once="true">
              <div id="circle"></div>
              <button @click="loadMore()">
                <span>
                  <i class="fal fa-spinner pe-1"></i> Carregar mais
                </span>
              </button>
            </div>
          </div>
        </div>
        <div class="section-title mt-4">
            <h4 class="them-title mb-0">{{stolenData.title}}</h4>
        </div>
        <div v-if="stolenData.description" v-html="$md.render(stolenData.description)"></div>
        <div class="text-left my-3">
            <div class="theme-btn universal-btn text-center" id="button-3">
              <div id="circle"></div>
              <nuxt-link to="/register-bikes"><span> <i class="fal fa-spinner pe-1"></i> Regista a tua Bicicleta agora! </span></nuxt-link>
            </div>
        </div>
        <!--div class="stolen-video bg-dark w-100 position-relative mt-4">
            <img v-if="stolenData.image && stolenData.image.length > 0" :src="`https://api.cicla.pt${stolenData.image[0].url}`" alt="img">
            <div class="play-icon">
              <a type="button" class="popup-youtube" data-bs-toggle="modal" data-bs-target="#VideoPop"><i :class="stolenData.icon"></i></a>
              <h6>{{stolenData.sub_title}}</h6>
            </div>
        </div>

        <!-- Modal -->
        <!--div class="modal fade VideoPopup" id="VideoPop" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-body p-0">
                  <iframe width="100%" height="600" src="https://www.youtube.com/embed/pBFQdxA-apI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>
        <script>
          $(".VideoPopup").on('hidden.bs.modal', function (e) {
              $(".VideoPopup iframe").attr("src",   $(".VideoPopup iframe").attr("src"));
          });
        </script-->

      </div>
    </section>
</template>
<script>
import api from '../../services'
import dayjs from "dayjs";
import { mapGetters } from 'vuex'
export default {
  props: ['stolenData'],
  data(){
    return{
      videoPopup: false,
      bikeData: {},
      color: [],
      colorName: '',
      start: 0,
      limit:8,
      loadData: {},
      dataLength: ''
    }
  },
  computed: {
    ...mapGetters({
      __getBaseUrl: 'product/getBaseUrl'
    })
  },
  methods: {
    getColor(val) {
      let colorValue = ''
      this.color.filter((data) => {
        if (data.id === val) {
          colorValue = data.name
        }
      })
      return colorValue
    },
    getDate(val, format){
      return dayjs(val).format(format)
    },
    async loadMore(){
      this.start = this.start + this.limit
      const data = await api.product.getStolenBike(this.start, this.limit)
      this.loadData = data.data
      this.bikeData = this.bikeData.concat(this.loadData)
    }
  },
  async fetch() {
    const stolenList = await api.product.getStolenBike(this.start, this.limit)
    this.bikeData = stolenList.data
    this.color = await api.product.blogService('colors')
    const stolens = await api.product.getStolenBike(0,-1)
    const total = stolens.data
    this.dataLength = total.length

  }
}
</script>
<style lang="scss">
.chip-stolen.top-set-line-stolen {
.stolen-bike-stolen-btn{
    position: absolute;
    border: none;
    top: 15px;
    right: 25px;
    width: 80px;
    height: 34px;
    background: #c00202;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    text-transform: uppercase;
}
}
.custom-height {
  min-height: 188px;
  max-height: 188px;
}
$them-color: #fd5044;
// List Box
.stolen-bike-box {
  background: #fff;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 2px -1px 20px 5px #f0f0f0;
  width: 100%;
  margin-bottom: 25px;
  float: left;
  &:hover h4 {
    width: 100%;
    color: $them-color;
  }
  li.found span {
    color: #0fa816 !important;
  }

  a {
    width: 100%;
    color: #212529;
  }
  &:hover a {
    width: 100%;
    color: #212529;
  }

  .stolen-bike-image {
    width: 32%;
    float: left;
    border-radius: 4px;
    overflow: hidden;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .stolen-bike-info {
    width: 68%;
    float: left;
    padding-left: 15px;
    h4 {
      font-size: 17px;
      font-weight: 600;
    }
  }

  .stolen-content-box {
    width: 100%;
    float: left;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    ul {
      padding: 0;
    }

    ul li {
      padding-bottom: 9px;
      font-weight: 300;

      & span {
        color: #3e3e3e;
        font-weight: 600;
        padding-right: 8px;
      }

      &:last-child span {
        color: #fd5044;
      }
    }

    ul li:last-child {
      padding-bottom: 0;
    }
  }
}
// Stolen bike
.modal-content{
  background: transparent;
  border:none;
}
.pop-modal {
  width: 60vw;
  height: 40vh;
}
.stolen-bike {
  p {
    font-size: 16px;
  }
  .stolen-video img {
    opacity: 0.5;
  }

  .play-icon {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    top: 35%;
    a.popup-youtube i {
      color: #fff;
      font-size: 6rem;
      margin-bottom: 20px;
      &:hover {
        color: $them-color;
      }
    }
    h6 {
      color: #fff;
      font-size: 1.6rem;
      font-weight: 500;
      margin: 0;
    }
  }
}
@media screen and (max-width: 991px) {
  .bike-search-form p {
    max-width: 100% !important;
  }
}

@media screen and (max-width: 767px) {
.stolen-bike-box{
    background: #fff;
    padding: 0;
.mt-5.mobile-margin {
    margin: 0 !important;
}
     .stolen-bike-info{
    width: 100%;
    float: left;
    padding-left: 15px;
}
}
.stolen-bike-box .stolen-bike-image{
    width: 100%;
}

  .stolen-bike .play-icon h6 {
    font-size: 12px;
    font-weight: 500;
}
.stolen-bike .play-icon a.popup-youtube i {
    font-size: 2rem;
    margin-bottom: 10px;
}
  .stolen-bike-box {
    padding: 10px;
    .stolen-bike-image {
      width: 40%;
    }
    div#VideoPop iframe.lazyLoad.isLoaded {
    height: 300px;
}
a.popup-youtube i {
    color: #fff;
    font-size: 2rem;
    margin-bottom: 20px;
}


    .stolen-bike-info {
      width: 60%;
    }

    .stolen-bike-info h4 {
      font-size: 14px;
    }
    .stolen-content-box ul li {
      padding-bottom: 2px;
      font-size: 14px;
    }
  }
}

@media screen and (max-width: 479px) {
  .stolen-bike-box .stolen-bike-info {
    width: 100%;
    padding-left: 0;
  }

  .stolen-bike-box .stolen-bike-image {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
