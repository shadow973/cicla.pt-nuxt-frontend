<template>
    <section class="about bg-light about-page-main">
    <div class="theme-container">
      <div class="row justify-content-between d-flex align-items-top">
        <div class="col-12 col-md-6 pt-5 pe-5">
          <h6>{{ data.content[0].sub_title }}</h6>
          <h4 class="them-title">{{ data.content[0].title }}</h4>
          <p>{{ data.content[0].description }}</p>
        </div>
        <div class="col-12 col-md-6 img-right">
          <img :src="__getBaseUrl+data.content[0].image[0].url" alt>
        </div>
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
// about 
.about{
    width: 100%;
    z-index: 0;
    position: relative;
    h6 {
        margin-bottom: -3px;
        padding-top: 80px;
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
  section.about.about-page-main .pt-5.pe-5 {
    padding: 15px !important;
    padding-top: 50px !important;
}

section.about.about-page-main {
    padding-bottom: 40px;
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