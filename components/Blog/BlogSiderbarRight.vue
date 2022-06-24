<template>
  <div class="col-md-4 mt-4">
    <div class="text-center" v-if="$fetchState.pending">
      <img src="~assets/images/spinner.gif" alt="" />
    </div>
    <div v-else-if="$fetchState.error">
      <p>Erro ao buscar dados</p>
    </div>
    <div v-else class="ps-mob">
      <BlogSiderbarPost />
      <div
        class="sidebar__single sidebar__category"
        data-aos="fade-up"
        data-aos-once="true"
      >
        <h3 class="sidebar__title">Categorias</h3>
        <ul class="sidebar__category-list list-unstyled">
          <li v-for="(info, index) in category" :key="index">
            <a
              @click="$emit('categoryId', info.id)"
              class="d-flex justify-content-between cursor-pointer"
              >{{ info.name }} <span><i class="fal fa-arrow-right"></i></span
            ></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../services'
import BlogSiderbarPost from './BlogSideBarPost.vue'
export default {
  components: {
    BlogSiderbarPost,
  },
  data() {
    return {
      category: [],
    }
  },
  async fetch() {
    this.category = await api.product.blogDataService('blog-categories', 8)
  },
}
</script>
<style lang="scss">
$them-color: #fd5044;
$them-color-yellow: #f2ad49;
$them-color-dark: #1b1b1b;
.sidebar__single.sidebar__search {
  width: 100%;
  float: left;

  form.sidebar__search-form {
    position: relative;
    button {
      position: absolute;
      background: #2d2d2d;
      color: #fff;
      border: none;
      width: 60px;
      right: 0;
      height: 48px;
      &:hover {
        background: $them-color;
      }
    }
    input {
      border: none;
      border-bottom: 1px solid #ddd;
      width: 100%;
      height: 48px;
      background: #fff;
      padding-left: 14px;
      border-top: 1px solid #ddd;
      border-left: 1px solid #ddd;
      :focus {
      }
    }
  }
}

.sidebar__category {
  position: relative;
  display: block;
  float: left;
  width: 100%;
  background: #f0f0f0;
  text-align: left;
  padding: 20px;
  margin-top: 30px;
  .cursor-pointer {
    cursor: pointer;
  }

  .sidebar__title {
    margin-bottom: 15px;
  }
  .sidebar__category-list li + li {
    margin-top: 3px;
  }
  .sidebar__category-list li a {
    font-size: 16px;
    position: relative;
    transition: all 500ms ease;
    display: block;
    background: none;
    border-radius: 0px;
    background: #fff;
    padding: 10px;
    &:hover {
      color: #fff;
      background: $them-color;
    }
  }
}

.sidebar__post-list {
  margin: 0;
  li {
    display: flex;
    align-items: center;
    background-color: transparent;
    transition: all 500ms ease;
    padding-bottom: 20px;

    a:hover {
      color: $them-color;
    }
  }

  h3 {
    font-size: 18px;
    margin: 0;
    line-height: 28px;
    font-weight: 400;
  }
  .sidebar__post-content .sidebar__post-content_meta {
    font-size: 12px;
    display: block;
    font-weight: 600;
    text-transform: uppercase;

    i {
      margin-right: 5px;
      color: $them-color;
    }
    .sidebar__post-content h3 a {
      font-size: 16px;
      transition: all 500ms ease;
      text-transform: uppercase;
      font-weight: 700;
    }
  }
}

.ps-mob {
  padding-left: 1.5rem;
}
@media screen and (max-width: 767px) {
  .ps-mob {
    padding-left: 0rem;
  }
}
</style>
