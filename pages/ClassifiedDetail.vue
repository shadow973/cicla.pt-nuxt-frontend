<template>
<div>
    <TopBanner :data="data" />
    <ClassifiedDetail />
</div>
</template>
<script>
import TopBanner from '../components/Comman/TopBanner.vue'
import ClassifiedDetail from '../components/Classified/ClassifiedDetail.vue'
export default {
    layout: 'Header',
    loading: false,
    components: {
         TopBanner,
         ClassifiedDetail
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