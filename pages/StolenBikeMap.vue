<template>
    <div class="theme-bg-light">
        <TopBanner />
        <div class="theme-container section-padding ">
        <iframe width="100%" height="800" style="border:0" :src ="`https://maps.google.com/maps?q=${lat},${long}&hl=es;z=14&amp;output=embed`"></iframe>
        </div>
    </div>
</template>
<script>
import TopBanner from '../components/Comman/TopBanner.vue'
export default{
    layout: 'Header',
    loading: false,
    components:{
        TopBanner
    },
    data(){
        return {
            lat: '39.7837304',
            long: '-100.445882'
        }
    },
    methods: {
        
    },
      mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
</script>
<style scoped>

</style>