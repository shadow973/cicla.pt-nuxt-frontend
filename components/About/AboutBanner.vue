<template>
    <section class="position-relative inner-slider" style="z-index:1">
    <div class="owl-carousel owl-theme-1 home-slider">
      <!--1-->
      <div class="item">
        <div class="theme-container">
          <div class="slider-content inner-page-text">
            <h1>{{ data.name }}</h1>
            <p>{{ data.description }}</p>
          </div>
        </div>
        <img :src="`${__getBaseUrl}/uploads/inner_banner_db9e9976e5.jpg`" alt>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
    export default {
        props: ["data"],
        computed:{
        ...mapGetters({
            __getBaseUrl: 'product/getBaseUrl'
        })
    }
    }
</script>

<style lang="scss" scoped>
.slider-content {
    position: absolute;
    height: 100%;
    display: block;
    padding-top: 13%;
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