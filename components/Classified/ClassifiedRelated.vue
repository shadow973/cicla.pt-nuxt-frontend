<template>
  <section class="realated pt-5">
    <div class="text-center" v-if="$fetchState.pending">
      <img src="~assets/images/spinner.gif" style="width: 60px;padding-top: 300px !important;">
      </div>
      <div v-else-if="$fetchState.error">
      <p>Erro ao buscar dados</p>
      </div>
    <div v-else class="theme-container">
      <h4 class="them-title bike-name-title text-black">Realizado</h4>
      <div class="classified-list-items">
        <div class="row relative-position">
          <VueSlickCarousel
            v-bind="settings"
            v-if="classifiedRelated.length"
            ref="settings"
          >
            <div
              class="col-md-4 col-lg-3 mb-4 px-2"
              v-for="info in classifiedRelated"
              :key="info.id"
            >
              <div class="classified-box bg-white">
                <nuxt-link :to="'/classified/' + info.slug">
                  <div class="images" v-if="info.bike_photo">
                    <img :src="_baseUrl + info.bike_photo.url" alt="img" />
                  </div>
                  <div class="info-classified">
                    <div class="location">
                      <i class="fal fa-map-marker-alt"></i> {{ info.address ? info.address : 'lorem' }}
                    </div>
                    <div class="t-name-classified">{{ info.model }}</div>
                    <div class="price-fixed">
                      <span class="items-price">${{ info.price ? info.price : '200' }} </span>
                      <span class="price-type">Fixo</span>
                    </div>
                  </div>
                  <hr />
                  <div class="classified-date">
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <div class="date-post">
                        <i class="fal fa-calendar-week"></i> {{ dateFormat(info.date, 'DD MM YYYY') }}
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
          <div class="divht">
            <span class="icon-color"
              ><i
                class="fal fa-chevron-left p-2 arrow-left"
                size="1.7em"
                @click="$refs.settings.prev()"
              ></i
            ></span>
            <span class="icon-color"
              ><i
                class="fal fa-chevron-right mr-4 p-2 arrow-right"
                @click="$refs.settings.next()"
              ></i
            ></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import { mapGetters } from 'vuex'
import api from '../../services'
import dayjs from 'dayjs'
export default {
  components: {
    VueSlickCarousel,
  },
  data() {
    return {
      settings: {
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        margin: 10,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
      },
      classifiedRelated: [],
    }
  },
  computed: {
    ...mapGetters({
      _baseUrl: 'product/getBaseUrl',
    }),
  },
  methods: {
    dateFormat(value, format) {
      return dayjs(value).format(format)
    }
  },
  async fetch() {
    const classifiedRelated = await api.product.classifiedRelated()
    this.classifiedRelated = classifiedRelated.data
  },
}
</script>

<style lang="scss" scoped>
$them-color: #fd5044;
$them-color-yellow: #f2ad49;
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
// Left Sidebar
.left-sider-fillter {
  padding: 25px;
  box-shadow: 2px 6px 24px -7px #ddd;
  border-radius: 6px;
  select {
    background-position: right 0.75rem center !important;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e") !important;
    background-size: 14px !important;
    background-repeat: no-repeat !important;
  }
  .form-bg {
    background: #f0f3f6;
  }
  .custom-h {
    height: 52px;
    font-size: 14px;
    border: none;
    border-radius: 0;
  }
  .custom-h:focus {
    border-color: #fd5044 !important;
    outline: 0;
    -webkit-box-shadow: inherit !important;
    box-shadow: inherit !important;
  }
  button.btn-search {
    position: absolute;
    right: 15px;
    top: 12px;
    border: none;
    background: transparent;
  }
}

/* Reset style for input range */
/* Style toddler input range */
/* Style track input range */
/* Style for input value block */
/* Style for active state input */
.filter-price {
  border: 0;
  padding: 0;
  margin: 0;
}
.price-field {
  position: relative;
  width: 100%;
  height: 36px;
  box-sizing: border-box;
  background: rgba(248, 247, 244, 0.2);
  padding-top: 15px;
  border-radius: 3px;
  input[type='range'] {
    position: absolute;
    width: 100%;
    height: 2px;
    border: 0;
    outline: 0;
    box-sizing: border-box;
    border-radius: 5px;
    pointer-events: none;
    -webkit-appearance: none;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      position: relative;
      -webkit-appearance: none;
      margin: 0;
      border: 0;
      outline: 0;
      border-radius: 50%;
      height: 15px;
      width: 15px;
      margin-top: -6px;
      background-color: #ff3f06;
      cursor: pointer;
      cursor: pointer;
      pointer-events: all;
      z-index: 100;
    }
    &:active {
      outline: 0;
      &::-webkit-slider-thumb {
        box-shadow: 0 0 0 0.5px #000;
        transition-duration: 0.3s;
      }
    }
    &:focus {
      outline: 0;
    }
    &::-ms-track {
      width: 188px;
      height: 4px;
      border: 0;
      outline: 0;
      box-sizing: border-box;
      border-radius: 5px;
      pointer-events: none;
      background: transparent;
      border-color: transparent;
      color: transparent;
      border-radius: 5px;
      width: 188px;
      height: 2px;
      cursor: pointer;
      background: #000;
      border-radius: 5px;
    }
    &::-moz-range-thumb {
      position: relative;
      appearance: none;
      margin: 0;
      border: 0;
      outline: 0;
      border-radius: 50%;
      height: 10px;
      width: 10px;
      margin-top: -5px;
      background-color: #000;
      cursor: pointer;
      cursor: pointer;
      pointer-events: all;
      z-index: 100;
    }
    &::-ms-thumb {
      position: relative;
      appearance: none;
      margin: 0;
      border: 0;
      outline: 0;
      border-radius: 50%;
      height: 10px;
      width: 10px;
      margin-top: -5px;
      background-color: #000;
      cursor: pointer;
      cursor: pointer;
      pointer-events: all;
      z-index: 100;
    }
    &::-webkit-slider-runnable-track {
      width: 188px;
      height: 3px;
      cursor: pointer;
      background: #dedede;
      border-radius: 5px;
    }
    &::-moz-range-track {
      width: 188px;
      height: 2px;
      cursor: pointer;
      background: #000;
      border-radius: 5px;
    }
    &:hover {
      &::-webkit-slider-thumb {
        box-shadow: 0 0 0 0.5px rgb(94, 92, 92);
        transition-duration: 0.3s;
      }
    }
  }
}
.price-wrap {
  display: flex;
  justify-content: center;
  color: #454545;
  font-size: 14px;
  line-height: 1.2em;
  font-weight: 400;
  margin-bottom: 7px;
  #one {
    width: 30px;
    text-align: right;
    margin: 0;
    padding: 0;
    margin-right: 2px;
    background: 0;
    border: 0;
    outline: 0;
    color: #454545;
    font-size: 14px;
    line-height: 1.2em;
    font-weight: 400;
  }
  #two {
    width: 30px;
    text-align: right;
    margin: 0;
    padding: 0;
    margin-right: 2px;
    background: 0;
    border: 0;
    outline: 0;
    color: #454545;
    font-size: 14px;
    line-height: 1.2em;
    font-weight: 400;
  }
  label {
    text-align: right;
  }
}
.price-wrap-1 {
  display: flex;
  width: 120px;
  background: #f0f3f6;
  padding: 14px;
  text-align: center;
  justify-content: center;
}
.price-wrap-2 {
  display: flex;
  width: 120px;
  background: #f0f3f6;
  padding: 14px;
  text-align: center;
  justify-content: center;
}
.price-wrap_line {
  margin: 0 10px;
}

// Right listing
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
}

@media screen and (max-width: 579px) {
}
</style>
