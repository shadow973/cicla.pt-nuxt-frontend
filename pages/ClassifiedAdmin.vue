<template>
  <div>
    <TopBanner :data="data"/>
    <ClassifiedAdmin />
    <UsedBy />
  </div>
</template>
<script>
import TopBanner from '../components/Comman/TopBanner.vue'
import ClassifiedAdmin from '../components/ClassifiedAdmin/ClassifiedAdmin.vue'
import UsedBy from '../components/Comman/UsedBy.vue'
export default {
  layout: 'Header',
  loading: false,
  components: {
    TopBanner,
    ClassifiedAdmin,
    UsedBy
  },
  data(){
      return{
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
