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
        </div>
        <SearchBikeForm /> 
        <BikeRegistered v-if="BikeRegisteredData.length > 0" /> 
    </div>
</template>
<script>
import Cookies from 'js-cookie'
import api from '../services'
import TopBanner from '../components/Comman/TopBanner.vue'
import SearchBikeForm from '../components/SearchBikes/SearchBikeForm.vue'
import BikeRegistered from '../components/Comman/BikeRegistered.vue'
export default {
    layout: 'Header',
     loading: false,
    data(){
        return {
            token: '',
            data :[],
            BikeRegisteredData: []
        }
    },
    components: {
         TopBanner,
         SearchBikeForm,
         BikeRegistered
    },
    
    async fetch(){
    this.token = Cookies.get('token')
    if(!this.token) {
        this.$router.push('/login')
    }
    const slug = window.location.pathname.slice(1)
    const cmsPage = await api.product.cmsPageService(slug)
    this.data = cmsPage.data[0]
    },
    async mounted() {
        this.BikeRegisteredData = await api.product.CMSBlockService('bike-registered-statistics'),
       this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
    }
}
</script>