<template>
    <section class="position-relative inner-slider" style="z-index:1">
        <div class="owl-carousel owl-theme-1 home-slider" style="display: block;">
            <!--1-->
            <div class="item">
                <div class="theme-container">
                    <div class="slider-content inner-page-text" v-if="data">
                        <h1><span class="theme-color">{{ data.name }}</span></h1>
                        <p>{{ data.description }}</p>
                    </div>
                </div>
                <img :src="`${__getBaseUrl}/uploads/inner_banner_db9e9976e5.jpg`" alt="img" />
            </div>
            <!--2-->
        </div>
    </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    props:["data"],
    computed:{
        ...mapGetters({
            __getBaseUrl: 'product/getBaseUrl'
        })
    }
 }
</script>
<style scoped lang="scss">
.border-bottom-line {
    position: absolute;
    bottom: -7px;
    left: 0;
    right: 0;
    width: 100%;
}
section.position-relative.inner-slider {
    background: #050505;
}
.item img{
    width: 100%;
}
@media screen and (max-width: 479px) {
.border-bottom-line {
    bottom: -2px;
}
}
</style>