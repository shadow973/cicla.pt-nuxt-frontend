<template>
  <div>
    <div class="text-center" v-if="$fetchState.pending">
      <img src="~assets/images/spinner.gif" alt="" />
    </div>
    <div v-else-if="$fetchState.error">
      <p>Erro ao buscar dados</p>
    </div>
    <div v-else class="spinner-icon">
      <img src="~assets/images/spinner.gif" alt="img" />
    </div>
  </div>
</template>
<script>
import api from '../../services'
export default {
  data() {
    return {}
  },
  async fetch() {
    const dataValue = await api.product.socialLoginService(
      this.$route.params.slug,
      this.$route.query.access_token
    )
    if (dataValue.data.jwt) {
      window.location.href = window.location.origin
    } else {
      window.location.href = window.location.origin + '/login'
    }
  },
}
</script>
<style scoped>
.spinner-icon {
  text-align: center;
  width: 100%;
}
</style>
