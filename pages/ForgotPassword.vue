<template>
    <div>
        <TopBanner :data="data" />
        <ForgotPassword />
    </div>
</template>
<script>
import TopBanner from '../components/Comman/TopBanner.vue'
import ForgotPassword from '../components/ForgotPassword/ForgotPassword.vue'
    export default {
        layout: 'Header',
        loading: false,
        components: {
            TopBanner,
            ForgotPassword
        },
        data () {
        return {
            data: {
                name: "",
                description: ""
            }
        }
    },
      mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
    }
</script>