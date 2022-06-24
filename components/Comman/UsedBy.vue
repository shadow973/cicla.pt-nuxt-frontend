<template>
  <section class="contact-images">
    <div class="text-center" v-if="$fetchState.pending">
    <img src="~assets/images/spinner.gif" style="width: 60px;padding-top: 300px !important;">
    </div>
    <div v-else-if="$fetchState.error">
    <p>Erro ao buscar dados</p>
    </div>
    <div v-else>
      <div class="theme-container" v-if="bikeData && bikeData.length > 0">
      <ul
        class="d-flex justify-content-between align-items-center usedby-logo"
      >
        <li v-for="(logo, index) in bikeData" :key="index" v-show="logo.image && logo.image.length > 0" class="custom-li">
          <div v-if="logo.image && logo.image.length > 0">
          <nuxt-link :to="logo.slug">
            <img :src="__getBaseUrl+logo.image[0].url" alt="img" />
          </nuxt-link>
          </div>
        </li>
      </ul>
    </div>
    </div>
  </section>
</template>
<script>
import api from '../../services'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      bikeData: [],
      limit:10
    }
  },
  computed: {
    ...mapGetters({
      __getBaseUrl: 'product/getBaseUrl',
    }),
  },
  async fetch() {
    this.bikeData = await api.product.blogDataService('brands',this.limit)
  },
}
</script>
<style scoped>
.custom-li{
  width:10%
}


@media screen and (max-width: 767px) {
ul.d-flex.justify-content-between.align-items-center.usedby-logo {
    flex-wrap: wrap;
}
.custom-li{
    width: 33%;
}
}
</style>