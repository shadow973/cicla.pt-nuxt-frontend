<template>
<div>
    <div class="text-center" v-if="$fetchState.pending">
      <img src="~assets/images/spinner.gif" style="width: 60px;padding-top: 300px !important;">
      </div>
      <div v-else-if="$fetchState.error">
      <p>Erro ao buscar dados</p>
      </div>
    <div v-else>
    <TopBanner  :data="data"/>
    <Help :data="data"/>
    </div>
</div>
</template>
<script>
import api from '../services'
import TopBanner from '../components/Comman/TopBanner.vue'
import Help from '../components/Help/Faq.vue'
export default {
    layout: 'Header',
    loading: false,
    data(){
        return{
            data : []
        }
    },
    components: {
         TopBanner,
         Help
    },
    async fetch(){
        const cmsData = await api.product.cmsPageService("frequently-asked-questions")
        this.data = cmsData.data[0]
        
    },
      mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
</script>