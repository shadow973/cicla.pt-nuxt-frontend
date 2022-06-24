<template>
    <div>
        <TopBanner :data="data" />
        <SignUp />
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import TopBanner from '../components/Comman/TopBanner.vue'
import SignUp from '../components/SignUp/SignUp.vue'
    export default {
        layout: 'Header',
        loading: false,
        components: {
            TopBanner,
            SignUp
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