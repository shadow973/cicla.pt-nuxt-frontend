<template>
  <div>
    <div class="text-center" v-if="$fetchState.pending">
      <img src="~assets/images/spinner.gif" alt="" />
    </div>
    <div v-else-if="$fetchState.error">
      <p>Erro ao buscar dados</p>
    </div>
    <div v-else>
      <TopBanner :data="data" />
      <section class="contact-us contact-label section-padding theme-bg-light">
        <div class="theme-container">
          <div class="row">
            <ContactInfomation :data="data" />
            <ContactForm :data="data" />
            <GMap />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import TopBanner from '../components/Comman/TopBanner.vue'
import ContactInfomation from '../components/Contact/ContactInfomation.vue'
import ContactForm from '../components/Contact/ContactForm.vue'
import GMap from '../components/Contact/GMap.vue'
import api from '../services'
export default {
  layout: 'Header',
  loading: false,
  components: {
    TopBanner,
    ContactInfomation,
    ContactForm,
    GMap
  },
  data() {
    return {
      data: [],
    }
  },
  async fetch() {
    const slug = window.location.pathname.slice(1)
    const cmsData = await api.product.CMSBlockService(slug)
    this.data = cmsData.data[0]
  },
  
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
</script>
