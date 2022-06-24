<template>
    <section class="about home-about" style="margin: 0;">
        <div class="text-center" v-if="$fetchState.pending">
        <!-- <img src="~assets/images/spinner.gif" style="width: 60px;padding-top: 300px !important;"> -->
        </div>
        <div v-else-if="$fetchState.error">
        <p>Erro ao buscar dados</p>
        </div>
        <div v-else class="theme-container">
        <div class="row justify-content-between d-flex align-items-center">
            <div class="col-12 col-md-6 pt-5 pe-5" data-aos="fade-up" data-aos-once="true">
                <h6>{{aboutData.name}}</h6>
                <h4 class="them-title">{{aboutData.title}}</h4>
                <p>{{aboutData.description}}</p>
                <div class="theme-btn-hover mt-2" id="button-hover">
                    <div id="circle-hover"></div>
                    <nuxt-link to="/about-us">consulte Mais informação <span><i class="fal fa-long-arrow-right ps-2"></i></span></nuxt-link>
                </div>
            </div>
            <div class="col-12 col-md-6 img-right" v-if="aboutData.image && aboutData.image.length > 0">
                <img class="rounded" v-for="(data, index) in aboutData.image" :key="index" :src="__getBaseUrl+data.url" alt>
            </div>
        </div>
        </div>
    </section>
</template>
<script>
import api from '../../services'
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
            aboutData: []
        }
    },
    computed: {
        ...mapGetters({
            __getBaseUrl: 'product/getBaseUrl',
            __getPendingApprovals: 'product/getPendingApprovals'
        })
    },
    async fetch(){
        const cmsData = await api.product.CMSBlockService('about-us')
        this.aboutData = cmsData.data[0]
    }
}
</script>
<style lang="scss">
// about 
.about{
    width: 100%;
    padding-bottom: 80px;
    z-index: 0;
    position: relative;
    h6 {
        margin-bottom: -3px;
    }
    p {
        font-size: 16px;
        font-weight: 400;
        text-align: justify;
    }
    .img-right{
        position: relative;
}
}

//responsive css

@media screen and (max-width: 1299px) {
    .about {
        width: 100%;
        margin-top: 4%;
        z-index: 0;
        position: relative;
        padding-bottom: 80px;
        h6 {
            margin-bottom: -3px;
            padding-top: 0;
        }
    }
}
@media screen and (max-width: 767px) {
    section.about.home-about .pe-5 {
    padding-right: 15px !important;
}
    .about {
        margin-top: 0%;
        p {
            font-size: 14px;
        }
        .img-right {
            position: relative;
            margin-top: 30px;
        }
    }
}
</style>