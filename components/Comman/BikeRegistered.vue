<template>
  <section class="hero" id="hero2">
    <div class="text-center" v-if="$fetchState.pending">
    <img src="~assets/images/spinner.gif" style="width: 60px;padding-top: 300px !important;">
    </div>
    <div v-else-if="$fetchState.error">
    <p>Erro ao buscar dados</p>
    </div>
    <div v-else class="theme-container">
      <div class="section-title pb-5">
        <h4 class="them-title text-white" v-if="bikeData">
          {{ bikeData.name }}
        </h4>
        <p class="text-white" v-if="bikeData">{{ bikeData.description }}</p>
      </div>
    </div>

    <div
      class="theme-container"
      v-if="bikeData && bikeData.sub_content && bikeData.sub_content.length > 0"
    >
    <div class="text-center" v-if="$fetchState.pending">
        <img src="~assets/images/spinner.gif" style="width: 60px;padding-top: 300px !important;">
        </div>
        <div v-else-if="$fetchState.error">
        <p>Erro ao buscar dados</p>
        </div>
      <div v-else class="row justify-content-center">
        <div class="hero-box" data-aos="fade-up" data-aos-once="true">
          <div
            class="box text-center"
            v-for="(data, index) in bikeData.sub_content"
            :key="index"
          >
            <div class="icon">
              <i :class="data.icon"></i>
            </div>
            <h6>{{ data.price }}</h6>
            <p>{{ data.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import api from '../../services'
export default {
  data() {
    return {
      bikeData: [],
    }
  },
  async fetch() {
    const cmsData = await api.product.CMSBlockService('bike-registered-statistics')
    this.bikeData = cmsData.data[0]
  },
}
</script>
<style lang="scss">
#hero2 {
  background: url('~assets/images/bg-3.jpg');
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  padding-top: 80px;
  padding-bottom: 150px;
}
.hero,
.content {
  text-align: center;
  position: relative;
  width: 100%;
}

.inner {
  min-height: 312px;
  position: relative;
}

.hero .inner {
  background: rgba(0, 0, 0, 0.4);
}

.copy {
  position: absolute;
  top: 41%;
  height: 10em;
  margin-top: -5em;
  width: 100%;
  color: #fff;
  h4 {
    font-size: 36px !important;
    line-height: 58px !important;
    font-weight: 600 !important;
  }
  p {
    color: #fff;
    font-size: 16px;
    font-weight: 400;
  }
}
.hero-box {
  position: absolute;
  display: flex;
  max-width: 1240px !important;
  justify-content: space-between;
  .box h6 {
    font-size: 1.3rem;
    font-weight: bold;
  }

  p {
    color: #fff;
    font-size: 16px;
    font-weight: 400;
  }

  .box.text-center {
    color: #fff;
    background: #fd5044;
    margin: 1rem;
    height: auto;
    box-shadow: none !important;
    width: 18%;
    display: block;
    border-radius: 7px;
    padding: 15px;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: #f2ad49;
    }
    .icon {
      padding: 20px 0px 20px 0px;
      i {
        font-size: 36px;
      }
    }
  }
}

//responsive css
@media screen and (max-width: 1299px) {
  .hero-box {
    max-width: 1040px;
    .box.text-center {
      padding: 10px;
    }
  }
}

@media screen and (max-width: 991px) {
  #hero2 {
    overflow: hidden;
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .hero-box {
    flex-wrap: wrap;
    position: inherit;
    .box.text-center {
      width: 45%;
    }
  }
  .section-title p br {
    display: none;
  }
}
@media screen and (max-width: 767px) {
  .hero-box .box.text-center {
    width: 100%;
  }
}
</style>
