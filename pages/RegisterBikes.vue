<template>
    <div>
        <TopBanner :data="data" />
        <RegisterBikes />
    </div>
</template>

<script>
import TopBanner from '../components/Comman/TopBanner.vue'
import RegisterBikes from '../components/RegisterBikes/RegisterBikes.vue'
    export default {
        layout: 'Header',
        loading: false,
        components: {
            TopBanner,
            RegisterBikes
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