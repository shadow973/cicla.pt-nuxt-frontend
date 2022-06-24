<template>
<div>
    <TopBanner :data="data" />
    <DonateInfomation />
    <RecoverRecently /> 
</div>
</template>
<script>
import TopBanner from '../components/Comman/TopBanner.vue'
import DonateInfomation from '../components/Donate/DonateInfomation.vue'
import RecoverRecently from '../components/Comman/RecoverRecently.vue'
export default {
    layout: 'Header',
    loading: false,
    components: {
         TopBanner,
         DonateInfomation,
         RecoverRecently,
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