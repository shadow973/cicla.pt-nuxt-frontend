<template>
<div>
    <TopBanner  :data="data"/>
    <Terms :data="data"/>
    <UsedBy />
</div>
</template>
<script>
import TopBanner from '../components/Comman/TopBanner.vue'
import Terms from '../components/Terms/TermsUse.vue'
import UsedBy from '../components/Comman/UsedBy.vue'
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
         Terms,
         UsedBy
    },
      mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
</script>