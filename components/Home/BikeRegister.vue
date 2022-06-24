<template>
    <section class="bike-register text-center section-padding theme-bg-light" data-aos="fade-up" data-aos-once="true">
        <div class="text-center" v-if="$fetchState.pending">
        <img src="~assets/images/spinner.gif"  style="width: 60px;padding-top: 300px !important;">
        </div>
        <div v-else-if="$fetchState.error">
        <p>Erro ao buscar dados</p>
        </div>
        <div v-else class="theme-container">
        <div class="section-title pb-5">
            <h4 class="them-title">{{bikeData.title}}</h4>
        </div>

        <div class="row mb-4 work-section">
            <div class="col-12 col-md-4" v-for="(data, index) in bikeData.sub_content" :key="index" data-aos="fade-up" data-aos-once="true">
                <div class="bick-register-card">
                    <img v-for="(img, index) in data.image" :key="index" :src="__getBaseUrl+img.url" alt>
                    <h5 class="them-subtitle">{{data.title}}</h5>
                    <p>{{data.description}}</p>
                    <img class="bike-register-arrow" src="~assets/images/bike-register-arrow.png" alt>
                    <div class="number 1">{{index+1}}</div>
                </div>
            </div>
        </div>
        <div class="theme-btn-hover mt-4 register-btn" id="button-hover">
            <div id="circle-hover"></div>
            <nuxt-link to="/sign-up">Registe-se agora! <span><i class="fal fa-long-arrow-right ps-2"></i></span></nuxt-link>
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
            bikeData: {}
        }
    },
    computed:{
        ...mapGetters({
            __getBaseUrl: 'product/getBaseUrl'
        })
    },
    async fetch(){
        const cmsData = await api.product.CMSBlockService('bike-register')
        this.bikeData = cmsData.data[0]
    }
}
</script>
<style lang="scss">
$them-color: #fd5044;
$them-color-yellow:#f2ad49;
$them-color-dark: #1b1b1b;
//section.bike-register
section.bike-register.text-center {
    h4.them-title {
        margin-bottom: 30px;
    }
}
.work-section .col-12.col-md-4:last-child img.bike-register-arrow{
    display: none;
}
.bick-register-card {
    position: relative;
    width: 100%;
    transition: all 0.3s ease-in-out;
    p {
        margin: 0;
        font-size: 18px;
        color: #626060;
        line-height: 30px;
    }

    img.bike-register-arrow {
        position: absolute;
        top: 26%;
        left: 90%;
    }
    &:hover .them-subtitle {
        color: $them-color;
    }
    &:hover .number {
        background:  $them-color;
    }
    .number {
        text-align: center;
        padding: 3px;
        color: #fff;
        background: #3c3c3c;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        position: absolute;
        top: 0;
        right: 24%;
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        font-weight: bold;
        font-size: 1.4rem;

    }
    .them-subtitle{
        transition: all 0.3s ease-in-out;
    }
    .position {
        position: relative;
    }
}

//responsive css

@media screen and (max-width: 991px) {
.section-padding {
  padding: 50px 0;
}
}
@media screen and (max-width: 767px) {
.section-padding {
  padding: 30px 0;
}


}
</style>