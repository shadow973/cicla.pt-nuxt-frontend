<template>
    <section class="section-padding">
    <div class="theme-container">
      <div class="row register-bike-section">
        <div class="col-md-12">
          <div class="position-relative">
            <VueSlickCarousel v-bind="settings" ref="carousel">
                <div class="team px-2" v-for="img in imgLength" :key="img.id">
                    <div class="register-bike">
                        <img :src="img.img" alt="img"/>
                        <div class="hover-insta">
                            <a href="#!">
                                <i class="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </VueSlickCarousel>
            <div class="divht">
                <span class="icon-color"><i class="fal fa-chevron-left p-2 arrow-left" size="1.7em" @click="$refs.carousel.prev()" ></i></span>
                <span class="icon-color"><i class="fal fa-chevron-right mr-4 p-2 arrow-right" @click="$refs.carousel.next()" ></i></span>
            </div>
        </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import image from '../../assets/images/slide1.jpg'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
    export default {
        components: {
            VueSlickCarousel
        },
        data () {
            return {
                imgLength: [
                    {
                        img: image
                    },
                    {
                        img: image
                    },
                    {
                        img: image
                    },
                    {
                        img: image
                    },
                    {
                        img: image
                    },
                    {
                        img: image
                    },
                    {
                        img: image
                    },
                    {
                        img: image
                    },
                    {
                        img: image
                    },
                    {
                        img: image
                    }
                ],
                settings: {
                arrows: false,
                dots: false,
                fade: false,
                infinite: true,
                slidesToShow: 5,
                slidesToScroll: 1,
                autoplay: true,
                swipe: true,
                swipeToSlide: true,
          responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: false,
              dots: false
            }
          },
           {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: false,
              dots: false
            }
          },
          ]
                
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.arrow-left {
    border: 1px solid #ebe5e5;
    border-radius: 100%;
    float: right;
    background-color: white;
    color: grey;
    width: 40px;
    height: 40px;
    display: grid;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    top: 40%;
    left: 40px;
}
.arrow-right {
    border: 1px solid #ebe5e5;
    border-radius: 100%;
    float: right;
    background-color: white;
    color: grey;
    width: 40px;
    height: 40px;
    display: grid;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    top: 40%;
    right: 40px;
}
.register-bike-section{
    position: relative;
    .owl-nav {       
        font-size: 33px;   
        button{
            position: absolute;
            top: 40%;
            background: #fff !important;
            height: 35px !important;
            width: 35px;
            justify-content: center;
            display: flex;
            flex-flow: column;
            border-radius: 50%;
            box-shadow: 2px 4px 7px #8e8e8e;
            &:hover{
                opacity: 1;
            }
        }    
        .owl-prev {           
            left: -5px;
            opacity: 0.5;           
            span {
                margin-top: -4px;
            }
        }
        .owl-next {           
            right: -5px;
            opacity: 0.5;           
            span {
                margin-top: -4px;
            }
        }
    }
}
.register-bike {
	position: relative;
    .hover-insta {
        opacity: 0;
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        background: rgba(0,0,0,0.4);
        justify-content: center;
        display: flex;
        flex-flow: column;
        text-align: center;
        color: #fff;
        font-size: 32px;
        transition: all 0.5s ease-in;
        a:hover{
            color: #fd5044;
        }
    }
}
.register-bike:hover .hover-insta {
    opacity: 1;
    transition: all 0.5s ease-in;
}
</style>