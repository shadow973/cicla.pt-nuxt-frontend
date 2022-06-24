<template>
<div>
    <TopBanner :data="data" />
    <Classified />
</div>
</template>
<script>
import Cookies from 'js-cookie'
import TopBanner from '../components/Comman/TopBanner.vue'
import Classified from '../components/Classified/Classified.vue'
export default {
    layout: 'Header',
    loading: false,
    components: {
         TopBanner,
         Classified
    },
    data () {
        return {
            data: {
                name: "",
                description: "",
                token: ""
            }
        }
    },
    mounted() {
    this.token = Cookies.get('token')
    if(!this.token) {
        this.$router.push('/login')
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
</script>