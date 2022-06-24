<template>
<div>
    <div class="text-center" v-if="$fetchState.pending">
    <img src="~assets/images/spinner.gif" style="width: 60px;padding-top: 300px !important;">
    </div>
    <div v-else-if="$fetchState.error">
    <p>Erro ao buscar dados</p>
    </div>
    <div v-else>
        <TopBanner :data= "data" />
        <StolenBike :stolenData= "stolenData"/>
    </div>
</div>
</template>
<script>
import Cookies from 'js-cookie'
import api from '../services'
import TopBanner from '../components/Comman/TopBanner.vue'
import StolenBike from '../components/StolenBike/StolenBike.vue'
export default {
    layout: 'Header',
    loading: false,
    data(){
        return {
            token: '',
            data :[],
            stolenData :[]
        }
    },
    components: {
         TopBanner,
         StolenBike
    },
    async fetch(){
    this.token = Cookies.get('token')
    if(!this.token) {
        this.$router.push('/login')
    }
    const slug = window.location.pathname.slice(1)
    const cmsPage = await api.product.cmsPageService(slug)
    this.data = cmsPage.data[0]
    this.stolenData = cmsPage.data[0].content[0]
    },
      mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }

}

</script>