<template>
  <div>
    <section class="additional-description">
      <div class="text-center" v-if="$fetchState.pending">
        <img src="~assets/images/spinner.gif" alt="" />
      </div>
      <div v-else-if="$fetchState.error">
        <p>Erro ao buscar dados</p>
      </div>
      <div v-else class="theme-container">
        <div class="row">
          <div class="col-12" v-for="info in searchDetail" :key="info.id">
            <h5 v-if="info.model" class="them-subtitle">
              {{info.model}}
            </h5>
            <p v-if="info.other_information">
              {{ info.other_information }}
            </p>
            <h5 class="them-subtitle">Proprietário do contato</h5>
            <p>Sabe algo sobre essa bicicleta?</p>
            <div class="number">
              <span><i class="fal fa-user-alt"></i></span>
              <p>
                Nome do dono: <strong> {{ info.user && info.user.name ? info.user.name : 'N/A' }}</strong>
              </p>
            </div>
            <a href="#write-message" class="theme-btn universal-btn" id="button-3">
              <div id="circle"></div>
              <button>
                <span><i class="fal fa-money-check-edit pe-2"></i></span> Envie-lhe uma mensagem
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from '../../services'
export default {
  props: ['bikeId'],
  data() {
    return {
      searchDetail: [],
      description: [
        {
          para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        },
        {
          para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        },
      ],
    }
  },
  async fetch() {
    const slug = this.$route.params.slug
    this.searchDetail = await api.product.searchBikeDetail(slug)
  },
}
</script>

<style lang="scss" scoped>
$them-color: #fd5044;
$them-color-yellow: #f2ad49;
$them-color-dark: #1b1b1b;
section.additional-description {
  background: #fbfbfb;
  padding: 60px 0;
  p {
    font-size: 16px;
    font-weight: 400;
    color: #3e3e3e;
  }

  .number {
    display: flex;
    span {
      font-size: 20px;
      color: $them-color;
      margin-right: 15px;
    }
  }
}

//thumbanil slider

#sync1 {
  width: 100% !important;
  overflow: hidden;
}
#sync2 {
  width: 100% !important;
  display: block;

  .owl-item .item {
    background: #000;
    margin-bottom: 0;
  }

  .owl-item img {
    opacity: 0.6 !important;
    background: #000;
    border-radius: 4px;
  }

  .owl-item.active.current img {
    opacity: 1 !important;
  }
}
#sync1 .item {
  margin: 5px;
  color: #fff;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  text-align: center;
  border-radius: 4px;
  overflow: hidden;
}

#sync2 .item {
  background: #c9c9c9;
  /* padding: 10px 0px; */
  margin: 5px;
  color: #fff;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}

#sync2 .item h1 {
  font-size: 18px;
}

#sync2 .current .item {
  background: #0c83e7;
}

.owl-theme .owl-nav [class*='owl-'] {
  transition: all 0.3s ease;
}

.owl-theme .owl-nav [class*='owl-'].disabled:hover {
  background-color: #d6d6d6;
}

#sync1.owl-theme {
  position: relative;
}

#sync1.owl-theme .owl-next,
#sync1.owl-theme .owl-prev {
  width: 22px;
  height: 40px;
  margin-top: -20px;
  position: absolute;
  top: 50%;
}

#sync1.owl-theme .owl-prev {
  left: 10px;
}

#sync1.owl-theme .owl-next {
  right: 10px;
}
/* animate fadin duration 1.5s */
.owl-carousel .animated {
  animation-duration: 1.5s !important;
}
/****************/
#sync1.owl-theme .owl-next,
#sync1.owl-theme .owl-prev {
  width: 45px !important;
  height: 45px !important;
  background: #fff;
  border-radius: 74px;
}
#sync1 svg {
  width: 10px !important;
}
</style>
