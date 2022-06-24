<template>
    <div>
        <div class="text-center" v-if="$fetchState.pending">
            <img src="~assets/images/spinner.gif" alt="" />
        </div>
        <div v-else-if="$fetchState.error">
            <p>Erro ao buscar dados</p>
        </div>
        <div v-else>
            <AboutBanner :data="blockData" />
            <AboutImage :data="blockData" />
            <AboutVision :data="blockData" />
            <BikeRegisterTeam :data="teamData" />
        </div>
    </div>
</template>
<script>
import AboutBanner from '../components/About/AboutBanner.vue'
import AboutImage from '../components/About/AboutImage.vue'
import AboutVision from '../components/About/AboutVision.vue'
import BikeRegisterTeam from '../components/About/BikeRegisterTeam.vue'
import api from '../services'
export default {
    layout: 'Header',
    loading: false,
    components: {
         AboutBanner,
         AboutImage,
         AboutVision,
         BikeRegisterTeam
    },
    data () {
        return {
            blockData: [],
            teamData: []
        }
    },
    async fetch() {
        const cmsData = await api.product.cmsPageService('about-us')
        this.blockData = cmsData.data[0]
        const cmsBlog = await api.product.CMSBlockService('cicla-team')
        this.teamData = cmsBlog.data[0]
    }
}
</script>