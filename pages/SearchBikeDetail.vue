<template>
<div>
    <TopBanner :data="data" />
    <BikeStolenInfo :bikeId="bikeId" />
    <AdditionalDetail :bikeId="bikeId" />
</div>
</template>
<script>
import api from '../services'
// import Cookies from 'js-cookie'
import TopBanner from '../components/Comman/TopBanner.vue'
import BikeStolenInfo from '../components/SearchBikeDetail/BikeStolenInfo.vue'
import AdditionalDetail from '../components/SearchBikeDetail/AdditionalDetail.vue'
export default {
    layout: 'Header',
    loading: false,
    components: {
         TopBanner,
         BikeStolenInfo,
         AdditionalDetail,
    },
    data () {
        return {
            bikeId: '',
            data: {
                name: "",
                description: "",
                token: ""
            }
        }
    },
    async mounted() {
      const bikeData = await api.product.getBikeDataService(this.$route.params.slug)
      this.bikeId = bikeData[0].id
      // this.token = Cookies.get('token')
      // if(!this.token) {
      //   this.$router.push('/login')
      // }
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 500)
      })
    }
}
</script>