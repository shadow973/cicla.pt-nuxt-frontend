<template>
   <section class="recover-recently theme-bg-light section-padding pb-5" v-if="headerData && recoverData && recoverData.length > 0">
    <div class="theme-container text-center">
        <div class="text-center" v-if="$fetchState.pending">
        <img src="~assets/images/spinner.gif" style="width: 60px;padding-top: 300px !important;">
        </div>
        <div v-else-if="$fetchState.error">
        <p>Erro ao buscar dados</p>
        </div>
        <div v-else class="section-title pb-3">
            <h4 class="them-title">{{headerData.name}}</h4>
            <p>{{headerData.description}}</p>
        </div>

      <div class="owl-carousel owl-theme-2" v-if="recoverData && recoverData.length > 0">
            <div class="text-center" v-if="$fetchState.pending">
            <img src="~assets/images/spinner.gif" style="width: 60px;padding-top: 300px !important;">
            </div>
            <div v-else-if="$fetchState.error">
            <p>Erro ao buscar dados</p>
            </div>
            <VueSlickCarousel v-else v-bind="settings">
                <div class="item" v-for="(data, index) in recoverData" :key="index">
                    <div class="d-flex stolen-box">
                        <div class="col-6 custom-width-col" v-if="data.image && data.image.length > 0">
                            <img :src="__getBaseUrl+data.image[0].url" alt="img">
                        </div>
                        <div class="col-6 custom-col-right text-start ps-0 py-3">
                            <h4>{{data.title}}</h4>
                            <h6>Recovered {{data.date}}</h6>
                            <p>{{data.description}}</p>
                        </div>
                    </div>
                </div>
            </VueSlickCarousel>
        </div>
    </div>
</section>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import api from '../../services'
import { mapGetters } from 'vuex'

export default {
    name: 'MyComponent',
    components: { VueSlickCarousel },
    data () {
        return{
            settings: {
                "infinite": true,
                "speed": 500,
                "slidesToShow": 2,
                "slidesToScroll": 1,
                "autoplay": true
            },
            recoverData: [],
            headerData: {}
        }
    },
    computed: {
        ...mapGetters({
            __getBaseUrl: 'product/getBaseUrl'
        })
    },
    async fetch(){
        const blockData = await api.product.CMSBlockService('stolen-bicycles-we-helped-recover-recently')
        this.headerData = blockData.data[0]
        this.recoverData = await api.product.blogService('testimonials')
    }
}
</script>
<style lang="scss">
$them-color: #fd5044;
$them-color-dark: #1b1b1b;
//section.recover-recently
section.recover-recently.pb-5 {
    width: 100%;
    .item {
        padding: 25px 15px;
    }
    .stolen-box {
        overflow: hidden;
        box-shadow: 2px 7px 24px -8px #eaeaea;
    border-radius: 6px;
}
        .col-6.custom-width-col {
            max-width: 44%;
        }
        .custom-col-right.text-start {
            max-width: 55%;
            width: 55%;
             p {
                margin-bottom: 5px;
            }
            h6{
                color: $them-color;
                font-size: 14px;
                font-style: italic;
            }
        }
    }
    .owl-carousel.owl-theme-2 {
        margin-top: 60px;
        img {
            display: block;
            width: 100%;
            object-fit: cover;
            height: 100%;
        }
        .item{
            .col-6.text-start {
                box-shadow: -20px 0px 90px 110px #fff;
                background: #fff;
            }
        }
    }
@media screen and (max-width: 767px) {

    section.recover-recently.pb-5 .col-6.custom-width-col {
        display: none;
    }
    section.recover-recently.pb-5 .custom-col-right.text-start {
        max-width: 100%;
        width: 100%;
        padding: 15px !important;
    }
    section.recover-recently.pb-5 .item {
        padding: 0;
    }
    section.recover-recently.pb-5 .stolen-box {
        border: 1px solid #ddd;
    }
    .owl-carousel.owl-theme-2 {
        margin-top: 0px;
    }
}
</style>