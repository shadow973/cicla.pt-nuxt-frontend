<template>
<div>
    <TopBanner :data="data" />
    <UserBikes />
</div>
</template>
<script>
import TopBanner from '../components/Comman/TopBanner.vue'
import UserBikes from '../components/UserAdmin/UserBikes.vue'
export default {
    layout: 'Header',
    loading: false,
    components: {
         TopBanner,
         UserBikes,
    },
      mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
</script>