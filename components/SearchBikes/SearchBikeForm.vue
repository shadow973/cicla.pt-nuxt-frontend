<template>
  <section class="bike-search-form text-left section-padding theme-bg-light">
    <div class="theme-container">

      <div class="min-container-bike">
          <!--p>Aqui podes fazer as pesquisas de 2 formas:</p>
          <p>Pelo número CICLA e através do número de série da bicicleta (Que estará presente no quadro ou na prova de compra)</p>
      <!--form-->
      <div class="search-bike sidebar__single sidebar__search text-center">
        <div class="row align-items-center">
         <div class="col-md-12 col-xl-12">
         <div class="section-title search-bike-text">
        <h4 class="them-title mb-0">Pesquisar todas as Bicicletas</h4>
        </div>
          <form @submit.prevent class="sidebar__search-form-bike">
          <input @keypress.enter="getSearchedData(searchData)" class="clear-btn" type="search" placeholder="Pesquisar aqui..." required v-model="searchData" />
          <button @click="getSearchedData(searchData)" type="submit"><i class="fal fa-search"></i></button>
          <div v-if="searchData && bikeData.length == 0" class="searchbox-css">
            <div>&#128580; A bicicleta pesquisada não está disponível</div>
          </div>
        </form>
        </div>

        </div>
      </div>

      <div class="full-width w-100 search-bikes-box">
          <div class="row">
          <div class="col-12 text-center" v-if="$fetchState.pending">
            <img src="~assets/images/spinner.gif" style="width: 60px;padding-top: 300px !important;">
          </div>
          <div class="col-12" v-else-if="$fetchState.error">
            <p>Erro ao buscar dados</p>
          </div>

          <div v-else class="col-md-12 col-lg-12" v-for="(info,index) in bikeData" :key="index">
            <div class="stolen-bike-box" data-animation="fadeIn" data-animation-delay="240ms">


                <div class="chip top-set-line">
                    <button v-if="info.stolen" class="stolen-bike-info-btn"><span>Roubada</span></button>
                    <button v-if="info.on_sale && !info.stolen" class="buy-bike-info"><span>Compre</span></button>
                  </div>

              <nuxt-link :to="info.stolen ? '/stolen-bikes/'+info.slug : '/search-bikes/'+info.slug">
                <div class="stolen-content-box">
                  <div class="stolen-bike-image">
                    <img :src="__getBaseUrl+info.bike_photo.url" alt="img" />
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
                      <li class="stolen" v-if="info.stolen">
                        <span>Roubada:</span>
                        {{ info.stolen_details && info.stolen_details.stolen_date ? getDate(info.stolen_details.stolen_date, 'MM/DD/YYYY, H:mm') : 'N/A' }}
                      </li>
                    </ul>
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '../../services'
import dayjs from "dayjs";
import { mapGetters } from 'vuex'
export default {
  data(){
    return{
      searchData: '',
      board_number :'',
      tag_number :'',
      location :'',
      description :'',
      isBoardValid : false,
      isTagValid : false,
      isLocationValid : false,
      isDescriptionValid : false,
      isvalid : true,
      cycleData: [],
      bikeData: {},
      color: [],
      colorName: '',
      start: 0,
      limit:8,
      loadData: {},
      dataLength: '',
      serviceData: {}
    }
  },
  watch:{
      async searchData(val){
      this.serviceData = {
        _start: this.start,
        _limit: this.limit,
        _where: { _or: [{serial_number_eq: val}, {cicla_number_eq: val}] }
      }
      const data = await api.product.searchBike(this.serviceData)
      this.bikeData = data.data
      }
  },
  computed: {
    ...mapGetters({
      __getBaseUrl: 'product/getBaseUrl'
    })
  },
  methods:{
    getDate(val, format){
      const dateValue = dayjs(val).format(format)
      return dateValue
    },
    getColor(val) {
      let colorValue = ''
      this.color.filter((data) => {
        if (data.id === val) {
          colorValue = data.name
        }
      })
      return colorValue
    },
    async getSearchedData(val) {
      this.serviceData = {
        _start: this.start,
        _limit: this.limit,
        _where: { _or: [{ serial_number_eq: val }, { cicla_number_eq: val }] }
      }
      const data = await api.product.searchBike(this.serviceData)
      console.log(data.data[0].user.city);
      this.bikeData = data.data
    }
  },
  async fetch() {
    this.serviceData = {
      _start: this.start,
      _limit: this.limit
    }
    this.color = await api.product.blogService('colors')
    const total = await api.product.blogService('bikes')
    this.dataLength = total.length
  }
}
</script>
<style lang="scss" scoped>
$them-color: #fd5044;
.clear-btn {
  padding-right: 75px;
}
h4.them-title {
    font-size: 26px !important;
}
.min-container-bike {
    max-width: 800px;
    margin: auto;
}


// Search
.sidebar__single.sidebar__search {
    width: 100%;
    float: none;
    display: block;
}
.searchbox-css {
    max-height: 300px;
    overflow-y: auto;
    background: #fff;
    box-shadow: 2px 3px 14px #ddd;
    padding: 17px;
    text-align: left;
    font-size: 15px;
    color: #4d4d4d;
    line-height: 21px;
    position: absolute;
    z-index: 9;
    top: 49px;
    scrollbar-color: #6A6A6A #D4D4D4;
    scrollbar-width: thin;
   .stolen-bike-box {
    margin: auto;
    margin-block-end: 10px;
}
.stolen-content-box img {
    width: 100%;
    height: auto !important;
}
.stolen-content-box {
    align-items: start !important;
}
&::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
      background: #ddd;
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #4d4d4d;
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #242424;
  }


}

.searchbox-css{
    text-align: left;
    font-size: 15px;
    color: #4d4d4d;
    line-height: 21px;
}
.stolen-bike-box a {
  width: 100%;
  color: #212529 !important;
}
.search-bike {
  border: 1px solid #ddd;
  padding: 25px;
  background: #fff;
  border-radius: 6px;
  margin-bottom: 50px;

  label.custom-label {
    padding-left: 47px;
    color: #686868;
    font-size: 14px;
    padding-top: 13px;
  }

  .form-floating span {
    position: absolute;
    top: 14px;
    left: 22px;
  }

  input,
  textarea {
    outline: none !important;
  }

  textarea {
    min-height: 110px !important;
    resize: none;
  }
  textarea.form-control.custom-input {
    padding-top: 14px !important;
    line-height: 21px !important;
  }
}

.bike-search-form {
  p {
    max-width: 70%;
    margin-left: 0 !important;
  }
}


/*****Search Form********/
.sidebar__search-form-bike {
    position: relative;
    input {
    border: none;
    border-bottom: 1px solid #ddd;
    width: 100%;
    height: 48px;
    background: #fff;
    padding-left: 14px;
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
}

button {
    position: absolute;
    background: #2d2d2d;
    color: #fff;
    border: none;
    width: 60px;
    right: 0;
    height: 48px;

    &:hover {
    background: #fd5044;
}


}

}


// List Box
.stolen-bike-box {
  background: #fff;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 2px -1px 20px 5px #f0f0f0;
  width: 100%;
  margin-bottom: 25px;
  float: left;
  position: relative;

.chip.top-set-line {
  .buy-bike-info {
    position: absolute;
    border: none;
    top: 20px;
    right: 20px;
    width: 72px;
    height: 34px;
    background: #13c339;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    text-transform: uppercase;
}
.stolen-bike-info-btn{
    position: absolute;
    border: none;
    top: 20px;
    right: 20px;
    width: 80px;
    height: 34px;
    background: #c00202;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    text-transform: uppercase;
}
}



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

  .stolen-bike-image {
    width: 32%;
    float: left;
    border-radius: 4px;
    overflow: hidden;

    img {
      object-fit: cover;
      min-height: 188px;
      max-height: 188px;
      width: 100%;
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

section.contact-images {
  width: 100%;
  padding: 40px 0px;
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
#button-3 a{
  padding: 0 !important;
}
.bike-search-form label.custom-label {
    font-size: 13px !important;
    line-height: 24px;
}

@media screen and (max-width: 1200px) {
.section-title.search-bike-text h4.them-title.mb-0 {
    font-size: 18px !important;
    line-height: 26px !important;
}
}
@media screen and (max-width: 767px) {
  .bike-search-form p{
    max-width: 100% !important;
}
.searchbox-css .stolen-bike-box .stolen-bike-info{
    width: 100%;
    padding-left: 0;
}

.searchbox-css .stolen-bike-box .stolen-bike-image{
    display: none;
}
.mt-5.mobile-margin {
    margin-top: 0 !important;
}
}
</style>
