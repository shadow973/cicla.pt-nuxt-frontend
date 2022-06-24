<template>
    <section class="section-padding donate-info theme-bg-light" data-aos="fade" data-aos-once="true">
  <div class="theme-container" v-for="data in donationData" :key="data.id">
    <div class="section-title">
        <h4 class="them-title">{{ data.title }}</h4>
    </div>
    <ul>
      <li><i :class="data.icon"></i> {{ data.sub_title }}</li>
    </ul>
    <ul v-if="data.sub_content">
      <li v-for="(info,index) in data.sub_content" :key="index">
          <i :class="info.icon" ></i>
          <p>{{ info.description }}</p>
      </li>
    </ul>
    <p>{{ data.description }}</p>
  </div>
</section>
</template>
<script>
import api from '../../services'
export default {
  data () {
    return {
      donationData: []
    }
  },
  async fetch() {
    const data = await api.product.CMSBlockService('donations')
    this.donationData = data.data
  }
}
</script>
<style lang="scss">
$them-color: #fd5044;
.donate-info{
      p {
        color: rgb(27, 27, 27);
        font-size: 16px;
        font-weight: 300;
        line-height: 26px;
    }

 ul {
        padding: 0;

        li {
            padding-bottom: 10px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            i {
                font-size: 22px;
                padding-right: 10px;
               color: $them-color;
            }
            &:last-child {
                padding-bottom: 0;

            }
        }
    }

  }

</style>
