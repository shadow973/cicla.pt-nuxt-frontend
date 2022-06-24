<template>
  <div>
    <TopBanner :data="data"/>
    <BlogDetails />
  </div>
</template>
<script>
import TopBanner from '../../../components/Comman/TopBanner.vue'
import BlogDetails from '../../../components/Blog/BlogDetails.vue'
export default {
  layout: 'Header',
  components: {
    TopBanner,
    BlogDetails,
  },
  data(){
      return{
          data: {
              name: '',
              description: ''
          }
      }
  }
}
</script>
