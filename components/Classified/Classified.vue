<template>
  <div>
    <section class="text-center section-padding theme-bg-light">
      <div class="theme-container">
        <div class="row">
          <div class="col-xl-3 col-md-4">
            <div
              class="left-sider-fillter text-start"
              data-aos="fade"
              data-aos-once="true"
            >
              <h4 class="mb-4">Pesquisar</h4>
              <div class="search-form">
                <div class="form-group mb-4">
                  <label class="form-label">Pesquisar por nome</label>
                  <div class="form-group position-relative">
                    <input
                      class="form-control custom-h form-bg"
                      placeholder="Pesquisar por nome"
                      v-model="searchClassified"
                    />
                    <button type="submit" class="btn-search">
                      <i class="fal fa-search"></i>
                    </button>
                  </div>
                </div>

                <div class="form-group mb-4">
                  <label class="form-label">Selecione localização</label>
                  <select class="form-select custom-h form-bg" v-model="selectedCountry">
                    <option v-for="(city, index) in cityData" :key="index" :value="city.id">{{city.name}}</option>
                  </select>
                </div>

                <div class="form-group mb-4">
                  <label class="form-label">Selecione categoria</label>
                  <select class="form-select custom-h form-bg" v-model="selectedCategory">
                    <option v-for="(cat, index) in categoryData" :key="index" :value="cat.id">{{cat.name}}</option>
                  </select>
                </div>

                <fieldset class="filter-price">
                  <label class="mb-2">Preços</label>
                  <div class="price-field">
                    <input
                      type="range"
                      min="0"
                      :max="maxPrice"
                      v-model="lowPrice"
                      id="lower"
                    />
                    <input
                      type="range"
                      min="0"
                      :max="maxPrice"
                      v-model="highPrice"
                      id="upper"
                    />
                  </div>
                  <div class="price-wrap align-items-baseline">
                    <span class="price-title pe-2">Filtro</span>
                    <div class="price-wrap-1">
                      <input id="one" v-model="lowPrice"/>
                      <label for="one">€</label>
                    </div>
                    <div class="price-wrap_line">-</div>
                    <div class="price-wrap-2">
                      <input id="two" v-model="highPrice"/>
                      <label for="two">€</label>
                    </div>
                  </div>
                  <script>
                    var lowerSlider = document.querySelector('#lower')
                    var upperSlider = document.querySelector('#upper')

                    document.querySelector('#two').value = upperSlider.value
                    document.querySelector('#one').value = lowerSlider.value

                    var lowerVal = parseInt(lowerSlider.value)
                    var upperVal = parseInt(upperSlider.value)

                    upperSlider.oninput = function () {
                      lowerVal = parseInt(lowerSlider.value)
                      upperVal = parseInt(upperSlider.value)

                      if (upperVal < lowerVal + 4) {
                        lowerSlider.value = upperVal - 4
                        if (lowerVal == lowerSlider.min) {
                          upperSlider.value = 4
                        }
                      }
                      document.querySelector('#two').value = this.value
                    }

                    lowerSlider.oninput = function () {
                      lowerVal = parseInt(lowerSlider.value)
                      upperVal = parseInt(upperSlider.value)
                      if (lowerVal > upperVal - 4) {
                        upperSlider.value = lowerVal + 4
                        if (upperVal == upperSlider.max) {
                          lowerSlider.value = parseInt(upperSlider.max) - 4
                        }
                      }
                      document.querySelector('#one').value = this.value
                    }
                  </script>
                </fieldset>
              </div>
            </div>
          </div>

          <div class="col-xl-9 col-md-8">
            <div class="classified-list-items" v-if="bikeInfo && bikeInfo.length > 0">
              <div class="text-center" v-if="$fetchState.pending">
              <img src="~assets/images/spinner.gif" style="width: 60px;padding-top: 300px !important;">
              </div>
              <div v-else-if="$fetchState.error">
              <p>Erro ao buscar dados</p>
              </div>
              <div v-else class="row" >
                <div
                  class="col-md-6 col-lg-4 mb-4"
                  v-for="(info, index) in bikeInfo"
                  :key="index"
                >
                  <div
                    class="classified-box bg-white"
                    data-aos="fade-up"
                    data-aos-once="true"
                  >
                    <nuxt-link :to="'/classified/'+info.slug">
                      <div class="images" v-if="info.bike_photo">
                        <img
                          class="rounded"
                          :src="__getBaseUrl+info.bike_photo.url"
                          alt="img"
                        />
                        <div class="chip top-set-line">
                          <button class="buy-bike-info"><span>Compre</span></button>
                        </div>
                      </div>
                      <div class="info-classified">
                        <div class="location">
                          <i class="fal fa-map-marker-alt"></i>
                          {{ info.user && info.user.city ? info.user.city : 'N/A' }}
                          <!-- {{ calCity(info) }} -->
                        </div>
                        <div class="t-name-classified">{{ info.brand }} {{ info.model }}</div>
                        <div class="price-fixed">
                          <span class="items-price">€{{ info.price ? info.price : 2000 }} </span>
                          <span class="price-type">Fixo</span>
                        </div>
                      </div>
                      <hr />
                      <div class="classified-date">
                        <div
                          class="
                            d-flex
                            align-items-center
                            justify-content-between
                          "
                        >
                          <div class="date-post">
                            <i class="fal fa-calendar-week"></i> {{ dateFormat(info.classified_date, 'DD/MM/YYYY') }}
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
              </div>
              <div class="col-md-12 text-center">
                <div>
                  <vs-pagination class="pagination-type text-center" v-if="bikeDataLength && bikeDataLength > 1" :total-pages="bikeDataLength" @change="changePage"></vs-pagination>
                </div>
              </div>
            </div>
            <div v-else>
             Não existem dados para mostrar
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from '../../services'
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      cities: [],
      bikeInfo: [],
      bikeHistory: [],
      start: 0,
      limit: 12,
      bikeDataLength: 0,
      searchClassified: '',
      cityData: [],
      selectedCountry: {},
      categoryData: [],
      selectedCategory: '',
      lowPrice: 0,
      highPrice: null,
      maxPrice: null,
      pageValue: '',
      catId: '',
      countryId: '',
      nameValue: '',
      dataLength: [],
      filterCategoryData: [],
      serviceData: {},
      servicePaginationData: {}
    }
  },
  computed:{
    ...mapGetters({
      __getBaseUrl: 'product/getBaseUrl'
    })
  },
  watch:{
    async searchClassified(val){
        this.nameValue = val
        if(this.countryId && this.catId && this.lowPrice && this.highPrice){
        this.serviceData = {
        model_contains: val,
        'category.id': this.catId,
        price_gte: this.lowPrice,
        price_lte: this.highPrice,
        'user.city': this.countryId,
        // '[user][city][$eq]': this.countryId,
        _start: this.start,
        _limit: this.limit,
        _where: {on_sale:true},
        _sort: `classified_date:DESC`
      }
        this.servicePaginationData = {
          model_contains: val,
          'user.city': this.countryId,
          price_gte: this.lowPrice,
          price_lte: this.highPrice,
          'category.id': this.catId,
          // '[user][city][$eq]': this.countryId,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
      } else if(this.countryId || this.catId || this.lowPrice || this.highPrice) {
        if(this.countryId) {
          this.serviceData = {
        model_contains: val,
        'user.city': this.countryId,
        // '[user][city][$eq]': this.countryId,
        _start: this.start,
        _limit: this.limit,
        _where: {on_sale:true},
        _sort: `classified_date:DESC`
      }
        this.servicePaginationData = {
          model_contains: val,
          'user.city': this.countryId,
          // '[user][city][$eq]': this.countryId,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        } else if(this.catId) {
          this.serviceData = {
        model_contains: val,
        'category.id': this.catId,
        _start: this.start,
        _limit: this.limit,
        _where: {on_sale:true},
        _sort: `classified_date:DESC`
      }
        this.servicePaginationData = {
          model_contains: val,
          'category.id': this.catId,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        } else if(this.lowPrice) {
          this.serviceData = {
        model_contains: val,
        price_gte: this.lowPrice,
        price_lte: this.highPrice,
        _start: this.start,
        _limit: this.limit,
        _where: {on_sale:true},
        _sort: `classified_date:DESC`
      }
        this.servicePaginationData = {
          model_contains: val,
          price_gte: this.lowPrice,
          price_lte: this.highPrice,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        } else if(this.highPrice) {
          this.serviceData = {
        model_contains: val,
        price_gte: this.lowPrice,
        price_lte: this.highPrice,
        _start: this.start,
        _limit: this.limit,
        _where: {on_sale:true},
        _sort: `classified_date:DESC`
      }
        this.servicePaginationData = {
          model_contains: val,
          price_gte: this.lowPrice,
          price_lte: this.highPrice,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        }
      } else {
        this.serviceData = {
        model_contains: val,
        _start: this.start,
        _limit: this.limit,
        _where: {on_sale:true},
        _sort: `classified_date:DESC`
      }
        this.servicePaginationData = {
          model_contains: val,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
      }
        this.dataLength = await api.product.ourBlogData('bikes', this.servicePaginationData)
        this.bikeInfo = await api.product.ourBlogData('bikes', this.serviceData)
        this.bikeDataLength = Math.ceil(this.dataLength.length/this.limit)
    },
    async selectedCountry(val){
      this.countryId = val
      if(this.searchClassified && this.catId && this.lowPrice && this.highPrice){
        this.serviceData = {
        model_contains: this.nameValue,
        'category.id': this.catId,
        price_gte: this.lowPrice,
        price_lte: this.highPrice,
        'user.city': val,
        // '[user][city][$eq]': val,
        _start: this.start,
        _limit: this.limit,
        _where: {on_sale:true},
        _sort: `classified_date:DESC`
      }
        this.servicePaginationData = {
          model_contains: this.nameValue,
          'user.city': val,
          price_gte: this.lowPrice,
          price_lte: this.highPrice,
          'category.id': this.catId,
          // '[user][city][$eq]': val,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
      } else if(this.searchClassified || this.catId || this.lowPrice || this.highPrice) {
        if(this.searchClassified) {
          this.serviceData = {
        model_contains: this.nameValue,
        'user.city': val,
        // '[user][city][$eq]': val,
        _start: this.start,
        _limit: this.limit,
        _where: {on_sale:true},
        _sort: `classified_date:DESC`
      }
        this.servicePaginationData = {
          model_contains: this.nameValue,
          'user.city': val,
          // '[user][city][$eq]': val,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        } else if(this.catId) {
          this.serviceData = {
        'user.city': val,
        'category.id': this.catId,
        // '[user][city][$eq]': val,
        _start: this.start,
        _limit: this.limit,
        _where: {on_sale:true},
        _sort: `classified_date:DESC`
      }
        this.servicePaginationData = {
          'user.city': val,
          'category.id': this.catId,
          // '[user][city][$eq]': val,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        } else if(this.lowPrice) {
          this.serviceData = {
        'user.city': val,
        // '[user][city][$eq]': val,
        price_gte: this.lowPrice,
        price_lte: this.highPrice,
        _start: this.start,
        _limit: this.limit,
        _where: {on_sale:true},
        _sort: `classified_date:DESC`
      }
        this.servicePaginationData = {
          'user.city': val,
          // '[user][city][$eq]': val,
          price_gte: this.lowPrice,
          price_lte: this.highPrice,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        } else if(this.highPrice) {
          this.serviceData = {
        'user.city': val,
        // '[user][city][$eq]': val,
        price_gte: this.lowPrice,
        price_lte: this.highPrice,
        _start: this.start,
        _limit: this.limit,
        _where: {on_sale:true},
        _sort: `classified_date:DESC`
      }
        this.servicePaginationData = {
          'user.city': val,
          // '[user][city][$eq]': val,
          price_gte: this.lowPrice,
          price_lte: this.highPrice,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        }
      } else {
         this.serviceData = {
        'user.city': val,
        // '[user][city][$eq]': val,
        _start: this.start,
        _limit: this.limit,
        _where: {on_sale:true},
        _sort: `classified_date:DESC`
      }
        this.servicePaginationData = {
          'user.city': val,
          // '[user][city][$eq]': val,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
      }
        this.bikeInfo = await api.product.ourBlogData('bikes', this.serviceData)
        this.dataLength = await api.product.ourBlogData('bikes', this.servicePaginationData)
        this.bikeDataLength = Math.ceil(this.dataLength.length/this.limit)
    },
    async selectedCategory(val){
      this.catId = val
      if(this.nameValue && this.countryId && this.lowPrice && this.highPrice){
         this.serviceData = {
          model_contains: this.nameValue,
          'user.city': this.countryId,
          // '[user][city][$eq]': this.countryId,
          'category.id': val,
          price_gte: this.lowPrice,
          price_lte: this.highPrice,
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        this.servicePaginationData = {
          model_contains: this.nameValue,
          'user.city': this.countryId,
          // '[user][city][$eq]': this.countryId,
          'category.id': val,
          price_gte: this.lowPrice,
          price_lte: this.highPrice,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
      } else if(this.nameValue || this.countryId || this.lowPrice || this.highPrice){
        if(this.nameValue){
          this.serviceData = {
          model_contains: this.nameValue,
          'category.id': val,
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
          this.servicePaginationData = {
          model_contains: this.nameValue,
          'category.id': val,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        } else if(this.countryId) {
          this.serviceData = {
          'user.city': this.countryId,
          // '[user][city][$eq]': this.countryId,
          'category.id': val,
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
          this.servicePaginationData = {
          'user.city': this.countryId,
          // '[user][city][$eq]': this.countryId,
          'category.id': val,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        } else if(this.lowPrice) {
          this.serviceData = {
          price_gte: this.lowPrice,
          price_lte: this.highPrice,
          'category.id': val,
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
          this.servicePaginationData = {
          price_gte: this.lowPrice,
          price_lte: this.highPrice,
          'category.id': val,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        } else if(this.highPrice) {
          this.serviceData = {
          price_gte: this.lowPrice,
          price_lte: this.highPrice,
          'category.id': val,
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
          this.servicePaginationData = {
          price_gte: this.lowPrice,
          price_lte: this.highPrice,
          'category.id': val,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        }
      } else {
        this.serviceData = {
          'category.id': val,
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        this.servicePaginationData = {
          'category.id': val,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
      }
      this.bikeInfo = await api.product.ourBlogData('bikes', this.serviceData)
      this.dataLength = await api.product.ourBlogData('bikes', this.servicePaginationData)
        this.bikeDataLength = Math.ceil(this.dataLength.length/this.limit)
    },
    async lowPrice(val){
      if(this.nameValue && this.countryId && this.catId){
        this.serviceData = {
          model_contains: this.nameValue,
          'user.city': this.countryId,
          // '[user][city][$eq]': this.countryId,
          'category.id': this.catId,
          price_gte: val,
          price_lte: this.highPrice,
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        this.servicePaginationData = {
          model_contains: this.nameValue,
          'user.city': this.countryId,
          // '[user][city][$eq]': this.countryId,
          'category.id': this.catId,
          price_gte: val,
          price_lte: this.highPrice,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
      } else if(this.nameValue || this.countryId || this.catId){
        if(this.nameValue){
          this.serviceData = {
          model_contains: this.nameValue,
          price_gte: val,
          price_lte: this.highPrice,
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        this.servicePaginationData = {
          model_contains: this.nameValue,
          price_gte: val,
          price_lte: this.highPrice,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        } else if(this.countryId) {
          this.serviceData = {
          'user.city': this.countryId,
          // '[user][city][$eq]': this.countryId,
          price_gte: val,
          price_lte: this.highPrice,
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        this.servicePaginationData = {
          'user.city': this.countryId,
          // '[user][city][$eq]': this.countryId,
          price_gte: val,
          price_lte: this.highPrice,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        } else {
          this.serviceData = {
          'category.id': this.catId,
          price_gte: val,
          price_lte: this.highPrice,
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        this.servicePaginationData = {
          'category.id': this.catId,
          price_gte: val,
          price_lte: this.highPrice,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        }
      } else {
        this.serviceData = {
          price_gte: val,
          price_lte: this.highPrice,
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        this.servicePaginationData = {
          price_gte: val,
          price_lte: this.highPrice,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
      }
      this.bikeInfo = await api.product.ourBlogData('bikes', this.serviceData)
      this.dataLength = await api.product.ourBlogData('bikes', this.servicePaginationData)
      this.bikeDataLength = Math.ceil(this.dataLength.length/this.limit)
    },
    async highPrice(val){
      if(this.nameValue && this.countryId && this.catId){
         this.serviceData = {
          model_contains: this.nameValue,
          'user.city': this.countryId,
          // '[user][city][$eq]': this.countryId,
          'category.id': this.catId,
          price_gte: this.lowPrice,
          price_lte: val,
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        this.servicePaginationData = {
          model_contains: this.nameValue,
          'user.city': this.countryId,
          // '[user][city][$eq]': this.countryId,
          'category.id': this.catId,
          price_gte: this.lowPrice,
          price_lte: val,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
      } else if(this.nameValue && this.countryId){
         this.serviceData = {
          model_contains: this.nameValue,
          'user.city': this.countryId,
          // '[user][city][$eq]': this.countryId,
          price_gte: this.lowPrice,
          price_lte: val,
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        this.servicePaginationData = {
          model_contains: this.nameValue,
          'user.city': this.countryId,
          // '[user][city][$eq]': this.countryId,
          price_gte: this.lowPrice,
          price_lte: val,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
      } else if(this.nameValue || this.countryId || this.catId){
          if(this.nameValue){
             this.serviceData = {
          model_contains: this.nameValue,
          price_gte: this.lowPrice,
          price_lte: val,
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        this.servicePaginationData = {
          model_contains: this.nameValue,
          price_gte: this.lowPrice,
          price_lte: val,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
          } else if(this.countryId) {
             this.serviceData = {
          'user.city': this.countryId,
          // '[user][city][$eq]': this.countryId,
          price_gte: this.lowPrice,
          price_lte: val,
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        this.servicePaginationData = {
          'user.city': this.countryId,
          // '[user][city][$eq]': this.countryId,
          price_gte: this.lowPrice,
          price_lte: val,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
          } else {
             this.serviceData = {
          'category.id': this.catId,
          price_gte: this.lowPrice,
          price_lte: val,
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        this.servicePaginationData = {
          'category.id': this.catId,
          price_gte: this.lowPrice,
          price_lte: val,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        }
        } else {
           this.serviceData = {
          price_gte: this.lowPrice,
          price_lte: val,
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        this.servicePaginationData = {
          price_gte: this.lowPrice,
          price_lte: val,
          _start: this.start,
          _limit: -1,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
      }
      this.bikeInfo = await api.product.ourBlogData('bikes', this.serviceData)
      this.dataLength = await api.product.ourBlogData('bikes', this.servicePaginationData)
      this.bikeDataLength = Math.ceil(this.dataLength.length/this.limit)
    }
  },
  methods: {
    calCity(val) {
      for(let n of this.cities) {
        return val.user && val.user.city == n.id ? n.name : 'N/A';
      }
    },
    dateFormat(value, format) {
      return dayjs(value).format(format)
    },
    async changePage(val){
      console.log('value is: ', val)
      val = val - 1
      if(val===0){
          this.start = 0
        }
        else{
          this.start = 0
          this.start = this.limit*val
        }
        if(this.catId){
           this.serviceData = {
            'category.id': this.catId,
            _start: this.start,
            _limit: this.limit,
            _where: {on_sale:true},
            _sort: `classified_date:DESC`
          }
        } else if(this.countryId){
           this.serviceData = {
          'user.city': this.countryId,
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        } else if(this.nameValue){
          this.serviceData = {
          model_contains: this.nameValue,
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
        } else {
          this.serviceData = {
          _start: this.start,
          _limit: this.limit,
          _where: {on_sale:true},
          _sort: `classified_date:DESC`
        }
      }
      this.bikeInfo = await api.product.ourBlogData('bikes', this.serviceData)
    },
  },
  async fetch (){
    this.serviceData = {
      _start: this.start,
      _limit: this.limit,
      _where: {on_sale:true},
      _sort: `classified_date:DESC`
    }
    this.servicePaginationData = {
      _start: this.start,
      _limit: -1,
      _where: {on_sale:true},
      _sort: `classified_date:DESC`
    }
    this.bikeInfo = await api.product.ourBlogData('bikes', this.serviceData)
    this.dataLength = await api.product.ourBlogData('bikes', this.servicePaginationData)
    this.bikeDataLength = Math.ceil(this.dataLength.length/this.limit)
    this.cityData = await api.product.blogService('cities')
    this.categoryData = await api.product.blogService('categories')
    const allBikes = await api.product.getAllClassified('bikes')
    const valPrice = allBikes.map(val => Number(val.price))
    const maxPrice = Math.max(...valPrice)
    this.highPrice = maxPrice
    this.maxPrice = maxPrice
    const cityData = await api.product.getCityData()
    this.cities = cityData.data
  }
}
</script>

<style lang="scss" scoped>
$them-color: #fd5044;
$them-color-yellow: #f2ad49;
$them-color-dark: #1b1b1b;

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
      background: #ff3f06;
      border-radius: 5px;
      z-index: 99;
      position: relative;
    }
    &::-moz-range-thumb {
           z-index: 99;
      position: relative;
      appearance: none;
      margin: 0;
      border: 0;
      outline: 0;
      border-radius: 50%;
      height: 10px;
      width: 10px;
      margin-top: -5px;
      background-color: #ff3f06;
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
      background-color: #b4b4b4;
      cursor: pointer;
      pointer-events: all;
      z-index: 100;
    }
    &::-webkit-slider-runnable-track {
      width: 188px;
      height: 3px;
      cursor: pointer;
      background: #b4b4b4;
      border-radius: 5px;
      position: relative;
    }
    &::-moz-range-track {
      width: 100%;
      height: 2px;
      cursor: pointer;
      background: #ff0000;
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
    width: 40px;
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
    width: 50px;
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
    margin: 0;
  }
}
.price-wrap-1 {
  display: flex;
  width: 120px;
  background: #f0f3f6;
  padding: 14px 4px;
  text-align: center;
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
  .chip.top-set-line {
  .buy-bike-info {
    position: absolute;
    border: none;
    top: 21px;
    left: 22px;
    width: 72px;
    height: 34px;
    background: #13C339;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    text-transform: uppercase;
}
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
