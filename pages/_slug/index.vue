<template>
  <div>
    <div class="text-center" v-if="$fetchState.pending">
      <img src="~assets/images/spinner.gif" alt="" />
    </div>
    <div v-else-if="$fetchState.error">
      <p>Erro ao buscar dados</p>
    </div>
    <div v-else>
      <TopBanner :data="blockData" />
      <PrivacyPolicy :blockData="blockData" />
    </div>
  </div>
</template>
<script>
import api from '../../services'
import TopBanner from '../../components/Comman/TopBanner.vue'
import PrivacyPolicy from '../../components/PrivacyPolicy/PrivacyPolicy.vue'
export default {
  layout: 'Header',
  data() {
    return {
      blockData: [],
    }
  },
  components: {
    TopBanner,
    PrivacyPolicy
  },
  async fetch() {
    const cmsData = await api.product.cmsPageService(this.$route.params.slug)
    if (cmsData.data.length > 0) {
      this.blockData = cmsData.data[0]
    } else {
      this.$router.go(-1)
    }
  },
}
</script>
