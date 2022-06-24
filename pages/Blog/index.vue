<template>
  <div>
    <TopBanner :data="bannerData"/>
    <section class="over-blog section-padding mt-0 theme-bg-light">
      <div class="text-center" v-if="$fetchState.pending">
      <img src="~assets/images/spinner.gif" style="width: 60px;padding-top: 300px !important;">
      </div>
      <div v-else-if="$fetchState.error">
      <p>Erro ao buscar dados</p>
      </div>
      <div v-else class="theme-container">
        <div class="row">
          <BlogList :blogItems="blogItems" :totalLength="totalLength" :blogLength="blogLength" @pagePre="pagePre" @pageChange="pageChange" :start="start"/>
          <BlogSiderbarRight @categoryId="categoryId"/>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import api from '../../services'
import TopBanner from '../../components/Comman/TopBanner.vue'
import BlogList from '../../components/Blog/BlogList.vue'
import BlogSiderbarRight from '../../components/Blog/BlogSiderbarRight.vue'
export default {
  layout: 'Header',
  components: {
    TopBanner,
    BlogList,
    BlogSiderbarRight,
  },
  data(){
    return{
      bannerData: {
        name: 'Blog',
        description: 'Bike Checker is a FREE service for people purchasing a second-hand bike, which allows you to check that the bike is not listed as stolen on the BikeRegister Database.'
      },
      blogItems: [],
      start: 0,
      limit: 6,
      totalLength: '',
      blogLength: '',
      catId: '',
      serviceData: {}
    }
  },
  methods: {
    async categoryId(val){
      this.catId = val
      this.start = 0
      this.blogItems = await api.product.ourBlogCategoryData(this.start, this.limit, val)
      const list = await api.product.ourBlogCategoryData(this.start, -1, val)
      this.blogLength = Math.ceil(list.length/this.limit)
      this.totalLength = list.length
    },
    async pageChange(val){
        if(val===0){
          this.start = 0
        }
        else{
          this.start = 0
          this.start = this.start+(this.limit*val)
        }
        if(this.catId){
          this.blogItems = await api.product.ourBlogCategoryData(this.start, this.limit, this.catId)
        } else {
          this.blogItems = await api.product.ourBlogData('our-blogs', this.serviceData)
        }
      },
      async pagePre(val){
        if(val<0){
          this.start = 0
         }
        else if(val>=this.totalLength){
          this.start =this.start
          }
        else{
          this.start = val
        }
        if(this.catId){
          this.blogItems = await api.product.ourBlogCategoryData(this.start, this.limit, this.catId)
        } else {
          this.blogItems = await api.product.ourBlogData('our-blogs', this.serviceData)
        }
      }
  },
  async fetch(){
    this.serviceData = {
        _start: this.start,
        _limit: this.limit
      }
    this.blogItems = await api.product.ourBlogData('our-blogs', this.serviceData)
    const list = await api.product.blogService('our-blogs')
    this.blogLength = Math.ceil(list.length/this.limit)
    this.totalLength = list.length
  }
}
</script>