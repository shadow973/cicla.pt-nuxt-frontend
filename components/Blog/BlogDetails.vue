<template>
<section class="over-blog single-blog section-padding mt-0 theme-bg-light">
  <div class="theme-container">
  <div class="row">
   <div class="col-md-8">
     <div class="text-center" v-if="$fetchState.pending">
      <img src="~assets/images/spinner.gif" style="width: 60px;padding-top: 300px !important;">
      </div>
      <div v-else-if="$fetchState.error">
      <p>Erro ao buscar dados</p>
      </div>
     <div v-else class="row">
      <div class="col-12 col-md-12 mt-4" v-for="detail in blogDetail" :key="detail.id">
        <div class="card">
        <div class="card-img">
        <img :src="_getBaseUrl+detail.image[0].url" alt>
        </div>
        <div class="card-date">
        <ul>
        <li v-for="(item, index) in formatDate(detail.date)" :key="index">{{item}}</li>
        </ul>
        </div>
        </div>
        <div class="blog-desc text-black text-start pt-2">
            <h5 class="them-subtitle text-black">{{ detail.title }}</h5>
            <p>{{ detail.description }}</p>
            </div>
      </div>
      <BlogComments :blogDetail="blogDetail"/>
   </div>
   </div>
   <div class="col-md-4 mt-4">
    <div class="ps-mob">
   <BlogSideBarPost />
   </div>
   </div>
  </div>
  </div>
  </section>
</template>
<script>
import BlogComments from './BlogComments.vue'
import BlogSideBarPost from './BlogSideBarPost.vue'
import dayjs from 'dayjs'
import api from '../../services'
import { mapGetters } from 'vuex'
export default {
  components: {
    BlogComments,
    BlogSideBarPost
  },
  data () {
    return {
      blogDetail: [],
      textPara: [
        {
          text: "Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum. There are many variations of passages of Lorem Ipsum available, but the majority have alteration in some injected or words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrang hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable."
        },
        {
          text: "Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum. There are many variations of passages of Lorem Ipsum available, but the majority have alteration in some injected or words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrang hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable."
        },
        {
          text: "Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum. There are many variations of passages of Lorem Ipsum available, but the majority have alteration in some injected or words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrang hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable."
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      _getBaseUrl: 'product/getBaseUrl'
    })
  },
  methods: {
    formatDate(date){
        const data = dayjs(date).format("MMMM/DD");
        return data.split('/')
      }
  },
  async fetch() {
    const slug = this.$route.params.slug
    const detail = await api.product.blogDetails(slug)
    this.blogDetail = detail.data
  }
}
</script>