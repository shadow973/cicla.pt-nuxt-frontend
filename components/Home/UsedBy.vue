<template>
  <!--client-->
  <section class="bike-index section-padding">
    <div class="text-center" v-if="$fetchState.pending">
    <img src="~assets/images/spinner.gif"  style="width: 60px;padding-top: 300px !important;">
    </div>
    <div v-else-if="$fetchState.error">
    <p>Erro ao buscar dados</p>
    </div>
    <div v-else class="theme-container">
      <div class="row">
        <div class="col-12 col-md-6">
          <ul class="d-flex" data-aos="fade-up" data-aos-once="true">
            <li v-for="(sub, index) in bikeData" :key="index" v-show="sub.image && sub.image.length > 0">
              <div v-if="sub.image && sub.image.length > 0">
              <nuxt-link :to="sub.slug"
                ><img :src="__getBaseUrl+sub.image[0].url" alt="img"
              /></nuxt-link>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-12 col-md-6" data-aos="fade-up" data-aos-once="true">
          <div class="section-title">
            <h4 class="them-title">BIKE REGISTERED USED BY</h4>
          </div>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import api from '../../services'
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
            bikeData: [],
            limit: 10
        }
    },
    computed: {
      ...mapGetters({
            __getBaseUrl: 'product/getBaseUrl'
        })
    },
    async fetch(){
      this.bikeData = await api.product.blogDataService('brands',this.limit)
    }
}
</script>
<style lang="scss" scoped>
//bike-index
section.bike-index {
  width: 100%;
  ul.d-flex {
    flex-wrap: wrap;
    width: 100%;
    padding-left: 0;
    margin-bottom: 0;
    li {
      width: 25%;
      margin-bottom: 10px;
      text-align: center;
      display: grid;
      align-items: center;
      padding: 10px;
      img {
        opacity: 0.7;
        transition: all 0.3s ease-in-out;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  p {
    font-size: 17px;
    line-height: 33px;
    font-weight: 400;
  }
}

//responsive css
@media screen and (max-width: 991px){
section.bike-index ul.d-flex li {
    width: 33%;
}
}

@media screen and (max-width: 767px){
section.bike-index ul.d-flex li {
    width: 50%;

    img {
    max-width: 120px;
}
}


}



</style>
