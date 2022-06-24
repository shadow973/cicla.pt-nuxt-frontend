<template>
<div>
    <TopBanner :data="data" />
    <ReportStolen />
    <UsedBy /> 
</div>
</template>
<script>
import TopBanner from '../components/Comman/TopBanner.vue'
import ReportStolen from '../components/Report/ReportStolen.vue'
import UsedBy from '../components/Comman/UsedBy.vue'
export default {
    layout: 'Header',
    loading: false,
    components: {
         TopBanner,
         ReportStolen,
         UsedBy
    },
    data () {
        return {
            data: {}
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