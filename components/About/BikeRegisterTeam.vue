<template>
    <section class="team-section section-padding pb-0">
    <div class="theme-container">
      <div class="section-title pb-3">
        <h4 class="them-title">{{ data.name }}</h4>
        <p>{{ data.description }}</p>
      </div>
      <div class="row mt-5">

        <div class="col-md-12 col-lg-6" v-for="info in data.sub_content" :key="info.id">
          <div class="row" data-animation="fadeIn" data-animation-delay="100ms">
            <div class="team-section-box">
              <div class="team-img">
                <img :src="__getBaseUrl+info.image[0].url" alt="img" />
              </div>
              <div class="team-content">
                <h4>{{ info.title }}</h4>
                <p>{{ info.description }}</p>
                  <ul class="d-flex social-icon">
                    <li v-for="link in info.urls" :key="link.id"><a :href="link.url" class="twitter"><i :class="link.icon"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
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
$them-color: #fd5044;
$them-color-yellow:#f2ad49;
$them-color-dark: #1b1b1b;
.feature-content{
    background-color: #fff;
    p {
        font-size: 16px;
        line-height: 1.8;
    }
}
.team-section {
	text-align: center;
	margin-top: 20px;
}

.team-section-box {
	display: inline-block;
    .team-img {
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 30px;
        width: 32%;
        float: left;
        margin-right: 20px;
        img {
            width: 100%;
            min-height: 200px;
            max-height: 200px;
        }
    }
    .team-content {
        padding: 15px 0;
        text-align: left;
         p {
            font-size: 16.5px;
            color: #282828;
            font-weight: 200;
            text-align: justify;
            margin-right: 30px;
        }
        .social-icon {
            list-style: none;
            padding: 0;
            li {
                margin-right: 15px;
                a{
                    color: #6c6c6c;
                }
            }
        }
    }
}

@media screen and (max-width: 767px) {
.team-section{
    text-align: center;
    margin-top: 0;
    .team-img {
    width: 100%;
}
}


}
</style>