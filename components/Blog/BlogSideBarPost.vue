<template>
  <div>
    <div class="text-center" v-if="$fetchState.pending">
      <img src="~assets/images/spinner.gif" alt="" />
    </div>
    <div v-else-if="$fetchState.error">
      <p>Erro ao buscar dados</p>
    </div>
    <div v-else>
      <div
        class="sidebar__single sidebar__search"
        data-aos="fade-up"
        data-aos-once="true"
      >
        <form action="#" class="sidebar__search-form">
          <input
            type="search"
            placeholder="Procure aqui"
            required
            v-model="searchData"
          />
          <button type="submit"><i class="fal fa-search"></i></button>
          <ul
            v-if="searchData"
            class="sidebar__post-list list-unstyled search-post"
          >
            <li v-for="(info, index) in postInfoData" :key="index">
              <div class="sidebar__post-content">
                <nuxt-link :to="'/blogs/' + info.slug">
                  <div class="row">
                    <div class="col-3 ps-0">
                      <div class="sidebar-images-left">
                        <img
                          :src="
                            info.image && info.image.length > 0
                              ? __getBaseUrl + info.image[0].url
                              : ''
                          "
                          alt="img"
                        />
                      </div>
                    </div>
                    <div class="col-9 ps-0">
                      {{ info.title }}
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </li>
          </ul>
        </form>
      </div>

      <div
        class="sidebar__single sidebar__category"
        data-aos="fade-up"
        data-aos-once="true"
      >
        <h3 class="sidebar__title">Publicar</h3>
        <ul class="sidebar__post-list list-unstyled">
          <li v-for="(info, index) in commentInfo" :key="index">
            <div class="sidebar__post-content">
              <nuxt-link :to="'/blogs/' + info.slug">
                <h3 class="row">
                  <div class="col-3 ps-0">
                    <img
                      :src="
                        info.image && info.image.length > 0
                          ? __getBaseUrl + info.image[0].url
                          : ''
                      "
                      alt="img"
                    />
                  </div>
                  <div class="col-9 ps-0 blog-sidebar-list-post">
                    {{ info.title }}
                  </div>
                </h3>
              </nuxt-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../services'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      searchData: '',
      commentInfo: [],
      postInfoData: [],
    }
  },
  watch: {
    async searchData(val) {
      this.postInfoData = await api.product.ourBlogSearchData(
        'our-blogs',
        'title_contains',
        val,
        0,
        -1
      )
    },
  },
  computed: {
    ...mapGetters({
      __getBaseUrl: 'product/getBaseUrl',
    }),
  },
  async fetch() {
    const commentData = await api.product.postBlogDetails(3)
    this.commentInfo = commentData.data
  },
}
</script>
<style lang="scss">
.sidebar-images-left {
  height: 60px;
  overflow: hidden;
}
ul.sidebar__post-list.list-unstyled.search-post {
  max-height: 300px;
  overflow-y: auto;
  background: #fff;
  box-shadow: 2px 3px 14px #ddd;
  padding: 17px;
  scrollbar-color: #6a6a6a #d4d4d4;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #ddd;
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #4d4d4d;
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #242424;
  }
}

ul.sidebar__post-list.list-unstyled.search-post .col-9.ps-0 {
  text-align: left;
  font-size: 15px;
  color: #4d4d4d;
  line-height: 21px;
}

@media screen and (max-width: 767px) {
  .sidebar-images-left img {
    height: 100%;
    object-fit: cover;
    width: 260px;
  }
  .blog-sidebar-list-post {
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
