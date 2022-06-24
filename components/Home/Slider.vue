<template>
    <section class="position-relative slider-height">
        <div class="text-center" v-if="$fetchState.pending">
        <img src="~assets/images/spinner.gif"  style="width: 60px;padding-top: 300px !important;">
        </div>
        <div class="" v-else-if="$fetchState.error">
        <p>Erro ao buscar dados</p>
        </div>
        <div v-else class="owl-carousel owl-theme-1 home-slider" style="display: block;">
            <div class="item">
                <div class="theme-container">
                    <div class="slider-content" v-if="bannerData">
                        <h1>{{bannerData.title}}</h1>
                        <h6 class="my-3">{{bannerData.sub_title}}</h6>
                        <ul class="ps-0">
                            <li v-for="(data, index) in bannerData.sub_content" :key="index">
                                <p><i :class="data.icon"></i> {{data.title}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-if="bannerData.image && bannerData.image.length > 0">
                <VueSlickCarousel v-bind="settings">
                    <img v-for="(data, index) in bannerData.image" :key="index" :src="__getBaseUrl+data.url" alt="img">
                </VueSlickCarousel>
                </div>
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
                "fade": true,
                "infinite": true,
                "speed": 500,
                "slidesToShow": 1,
                "slidesToScroll": 1,
                "nav": false,
                "autoplay": true
            },
            bannerData: {}
        }
    },
    computed:{
        ...mapGetters({
            __getBaseUrl: 'product/getBaseUrl'
        })
    },
    async fetch(){
        const cmsData = await api.product.CMSBlockService('home-banner')
        this.bannerData = cmsData.data[0]
    }
}
</script> 
<style lang="scss">
//HOME SLIDER
.home-slider .slick-slide img {
    height: 100%;
    object-fit: cover;
}
.slider-content {
    position: absolute;
    height: 100%;
    z-index: 1;
    padding-top: 13%;
    max-width: 660px;
     ul {
        padding-top: 10px;
    }
     h1 {
        text-transform: uppercase;
        font-size: 44px;
        line-height: 64px;
        color: #fff;
    }  
    h6 {
        font-size: 26px;
        color: #fff;
        font-weight: 500;
    }
    ul li p {
        font-size: 21px;
        font-weight: 200;
        color: #fff;
    }
    i {
        margin-right: 10px;
    }
}
.border-bottom-line {
    position: absolute;
    bottom: -8px;
    left: 0;
    right: 0;
    width: 100%;
    img {
        width: 100%;
    }
}
</style>
