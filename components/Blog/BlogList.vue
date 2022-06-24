<template>
  <div class="col-md-8">
    <div class="row">
      <div class="col-12 col-md-6 mt-4" v-for="(item, index) in blogItems" :key="index" data-aos="fade-up" data-aos-once="true">
        <nuxt-link :to="'/blogs/'+item.slug">
          <div class="card">
            <div class="card-img">
                <img :src="__getBaseUrl+item.image[0].url" alt />
            </div>
            <div class="card-date">
              <ul>
                <li v-for="(item, index) in formatDate(item.date)" :key="index">{{item}}</li>
              </ul>
            </div>
            <div class="card-footer text-white text-start">
                <h5 class="them-subtitle text-white">{{ item.title }}</h5>
                <p class="description-text">
                  {{ item.description }}
                </p>
                consulte Mais informação <i class="fal fa-chevron-double-right"></i
              >
            </div>
          </div>
        </nuxt-link>
      </div>
      <div class="col-md-12 text-center">
        <nav
          class="pagination-type text-center"
          aria-label="Page navigation example"
        >
          <ul class="pagination justify-content-center mt-4">
            <li class="page-item" v-show="start-limit>=0">
              <a class="page-link"  @click="$emit('pagePre', start-limit)"  aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item" v-for="(ln,index) in blogLength" :key="index" v-show="blogLength > 1" >
              <a class="page-link"  @click="$emit('pageChange', index)">{{index+1}}</a>
            </li>
            <li class="page-item" v-show="start+limit<totalLength">
              <a class="page-link"  @click="$emit('pagePre', start+limit)" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { mapGetters } from 'vuex'
export default {
  props: ['blogItems', 'blogLength', 'totalLength', 'start'],
  data () {
    return {
      limit: 6,
    }
  },
  computed:{
    ...mapGetters({
      __getBaseUrl: 'product/getBaseUrl'
    })
  },
  methods:{
      formatDate(date){
        const data = dayjs(date).format("MMMM/DD");
        return data.split('/')
      }
    }
}
</script>
<style lang="scss" scoped>
$them-color: #fd5044;
$them-color-yellow: #f2ad49;
$them-color-dark: #1b1b1b;

.description-text {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
// Search
section.over-blog .card .card-img img {
    height: 340px;
}
.pagination-type li.page-item a.page-link {
  border-radius: 30px;
  height: 40px;
  width: 40px;
  display: grid;
  align-items: center;
  color: #000;
}
ul.pagination.justify-content-center a.page-link {
    cursor: pointer;
}
.pagination-type li.page-item {
  margin: 0 2px;
  & a.page-link:hover {
    background: #000;
    color: #fff;
  }

  &:last-child a.page-link {
    background: #000;
    color: #fff;
  }
}



@media screen and (max-width: 767px) {
  section.over-blog .card .card-img img {
    height: auto
}
}
</style>
