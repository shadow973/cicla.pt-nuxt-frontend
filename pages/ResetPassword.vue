<template>
    <div>
        <TopBanner :data="data" />
        <ResetPassword />
    </div>
</template>

<script>
import TopBanner from '../components/Comman/TopBanner.vue'
import ResetPassword from '../components/ResetPassword/ResetPassword.vue'
    export default {
        layout: 'Header',
        loading: false,
        components: {
            TopBanner,
            ResetPassword
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

<style lang="scss" scoped>

</style>