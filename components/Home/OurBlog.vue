<template>
  <section class="over-blog section-padding theme-bg-light">
    <div class="theme-container">
      <div class="text-center" v-if="$fetchState.pending">
      <img src="~assets/images/spinner.gif"  style="width: 60px;padding-top: 300px !important;">
      </div>
      <div v-else-if="$fetchState.error">
      <p>Erro ao buscar dados</p>
      </div>
      <div v-else class="section-title pb-3">
        <h4 class="them-title" v-if="headerData">{{headerData.name}}</h4>
        <p v-if="headerData">{{headerData.description}}
        </p>
      </div>
    </div>
    <div class="row mt-5">
      <div class="text-center" v-if="$fetchState.pending">
      <img src="~assets/images/spinner.gif"  style="width: 60px;padding-top: 300px !important;">
      </div>
      <div v-else-if="$fetchState.error">
      <p>Erro ao buscar dados</p>
      </div>
      <div v-else class="col-12 col-md-4" v-for="(data, index) in blogData" :key="index">
        <div class="card" data-aos="fade-up" data-aos-once="true">
          <div class="card-img">
            <nuxt-link :to="`/blogs/${data.slug}`"><img v-for="(img, index) in data.image" :key="index" :src="__getBaseUrl+img.url" alt /></nuxt-link>
          </div>
          <div class="card-date">
            <ul>
              <li v-for="(data, index) in formatDate(data.date)" :key="index">{{data}}</li>
            </ul>
          </div>
          <div class="card-footer text-white text-start">
            <nuxt-link :to="`/blogs/${data.slug}`">
              <h5 class="them-subtitle text-white">{{data.title}}</h5>
              <p>
                {{data.description}}
              </p>
            </nuxt-link>
            <nuxt-link :to="`/blogs/${data.slug}`"
              >Read More <i class="fal fa-chevron-double-right"></i
            ></nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import api from '../../services'
import dayjs from "dayjs"
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            blogData: [],
            headerData: {},
            start: 0,
            limit: 3
        }
    },
    computed: {
      ...mapGetters({
            __getBaseUrl: 'product/getBaseUrl'
        })
    },
    methods:{
      formatDate(date){
        const data = dayjs(date).format("MMMM/DD");
        return data.split('/')
      }
    },
    async fetch(){
      const blockData = await api.product.CMSBlockService('our-blogs')
      this.headerData = blockData.data[0]
      const serviceData = {
        _start: this.start,
        _limit: this.limit
      }
      this.blogData = await api.product.ourBlogData('our-blogs', serviceData)
    }
}
</script>

<style lang="scss">
$them-color: #fd5044;
$them-color-yellow: #f2ad49;
$them-color-dark: #1b1b1b;
//over-blog
section.over-blog .card:hover .card-footer {
  background: $them-color;
}
section.over-blog .card:hover .card-footer a {
  color: #fff;
}
section.over-blog {
  width: 100%;
  text-align: center;
  transition: all 0.8s ease-in-out;
  overflow: hidden;
  .card {
    overflow: hidden;
    border: none;
    background-color: transparent;
    &:hover img {
      transform: scale(1.1);
      z-index: -1;
    }
    .card-img {
      width: 100%;
      overflow: hidden;
      border-bottom-right-radius: calc(0rem - 0px);
      border-bottom-left-radius: calc(0rem - 0px);
       object-fit: cover;
    height: 100%;
      img {
        transition: all 0.3s ease-in-out;
        width: 100%;
        object-fit: cover;
        height: 420px
      }
    }
    .card-footer {
      background-color: #000;
      padding: 20px;
      h5 {
        color: #fff;
        font-size: 27px !important;
        margin-bottom: 0;
        font-weight: 400 !important;
      }
      p {
        font-size: 16px;
        font-weight: 300;
        line-height: 26px;
        color: #fff;
      }
      a {
        color: $them-color;
        transition: all 0.3s ease-in-out;
      }
    }
  }
  .card-date {
    background: #fff;
    position: absolute;
    text-align: center;
    min-width: 80px;
    margin: 20px 0px 0px 20px;
    padding: 4px 3px;
    font-size: 14px;
    height: 60px;
    align-items: center;
    display: grid;
    ul {
      margin-bottom: 0;
      padding-left: 0;
      text-align: center;
      li:first-child {
        border-bottom: 1px solid gray;
        margin-bottom: 3px;
      }
    }
  }
}

//responsive scss
@media screen and (max-width: 991px) {
    section.over-blog {
        margin-top: 0px;
        .card .card-footer h5 {
            font-size: 18px !important;
        }
        .card .card-footer p {
            font-size: 14px;
            line-height: 22px;
        }
    }

}


@media screen and (max-width: 767px) {
  section.over-blog .card .card-img img {
    height: auto;
}
    section.over-blog .row.mt-5 {
        margin-top: 0 !important;
        .card {
            padding: 10px;
        }
    }
    
}

</style>
