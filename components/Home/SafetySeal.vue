<template>
     <section class="safety-seal">
    <div class="z-index-3">
    <div class="row text-center">
        <div class="theme-container">
            <div class="section-title pb-5">
                <h4 class="them-title">{{sealData.name}}</h4>
                <p>{{sealData.description}}</p>
            </div>
        </div>
    </div>
    <div class="them-container">
        <div class="row mt-5 pb-5">
            <div class="col-12 col-md-5 position">
                <img v-for="(img, index) in sealData.image" :key="index"
                    :src="__getBaseUrl+img.url" alt="img" data-aos="slide-right" data-aos-once="true">
            </div>
            <div class="col-12 col-md-7 float-end">
                <ul>
                    <li class="d-flex" v-for="(data, index) in sealData.sub_content" :key="index" data-aos="fade-up" data-aos-once="true" >
                        <div class="icon me-3"><i :class="data.icon"></i></div>
                        <span>{{data.title}}</span>
                    </li>
                </ul>
            </div>
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
            sealData: {}
        }
    },
    computed: {
        ...mapGetters({
            __getBaseUrl: 'product/getBaseUrl'
        })
    },
    async fetch(){
        const cmsData = await api.product.CMSBlockService('registered-bike-safety-seal')
        this.sealData = cmsData.data[0]
    }
}
</script>
<style lang="scss">
$them-color: #fd5044;
$them-color-yellow:#f2ad49;
$them-color-dark: #1b1b1b;
// safety-seal
.safety-seal img {
    width: 100%;
}
.safety-seal ul li span {
    padding-left: 60px;
}
.safety-seal::before {
    content: '';
    width: 100%;
    background: rgba(255,255,255,0.95);
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    height: 100%;
}
.safety-seal{
    width: 100%;
    background-image: url(~assets/images/safety-seal-bg.jpg);
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 60px 0px;
    background-position: top;
    position: relative;
    overflow: hidden;
    padding-bottom: 30px;
    background-position: center;
    ul {
        padding-top: 7%;
        i {
            font-size: 20px;
        }
    }
     img {
            position: absolute;
            left: -7%;
            bottom: 0;
        }
    .them-container p {
        font-size: 14px;
        font-weight: 300;
    }
    .overlay-2 {
        width: 100%;
    background: rgba(255, 255, 255, 90%);
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    height: 100%;
        
    }
    .z-index-3{
        z-index: 3;
        position: relative;
    }
     .icon.me-3 {
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        border: 1px solid #8c8989;
        border-radius: 50%;
        font-size: 23px;
        color: #fd5044;
        position: absolute;
        transition: all 0.3s ease-in-out;
    }
    .safety-seal span {
        padding-left: 60px;
    }

    ul li{
        display: flex;
        align-items: center;
        margin-bottom: 36px;
        float: left;
        width: 100%;
    }
    ul li:hover .icon {
        border: 1px solid $them-color;
        background: $them-color;
        color: #fff;
    }
}

//responsive css

@media screen and (max-width: 767px) {
  .safety-seal {
    padding: 30px 15px;
    ul li:last-child {
    margin-bottom: 0;
  }
  }
  
  .safety-seal ul {
    margin: 0;
    padding: 0;
  }
  .safety-seal img {
    display: none;
  }
}

</style>