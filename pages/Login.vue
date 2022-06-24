<template>
    <div>
        <TopBanner :data="data" />
        <Login />
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import TopBanner from '../components/Comman/TopBanner.vue'
import Login from '../components/Login/Login.vue'
    export default {
        layout: 'Header',
        loading: false,
        components: {
            TopBanner,
            Login
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
        if(this.token) {
            this.$router.push('/')
        }
        this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 500)
        })
  }
    }
</script>

<style lang="scss" scoped>

</style>