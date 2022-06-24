<template>
    <div>
        <Slider />
        <About />
        <BikeRegister />
        <SafetySeal />
        <BikeRegistered v-if="BikeRegisteredData.length > 0" />
        <Classified />
        <OurBlog v-if="blogData.length > 0" />
        <RecoverRecently />
        <div @click="$router.push('/my-account#inbox')" class="notification cursor-pointer" v-if="showNotification && timer">
            Você tem {{messageCounts}} novas mensagens
        </div>
    </div>
</template>

<script>
import Slider from '../components/Home/Slider.vue'
import About from '../components/Home/About.vue'
import BikeRegister from '../components/Home/BikeRegister.vue'
import SafetySeal from '../components/Home/SafetySeal.vue'
import BikeRegistered from '../components/Comman/BikeRegistered.vue'
import OurBlog from '../components/Home/OurBlog.vue'
import Classified from '../components/Home/Classified.vue'
import RecoverRecently from '../components/Comman/RecoverRecently.vue'
import api from '../services'
import Cookies from 'js-cookie'
export default {
    layout: 'Header',
    loading: false,
    components: {
        Slider,
        About,
        BikeRegister,
        SafetySeal,
        BikeRegistered,
        OurBlog,
        Classified,
        RecoverRecently,
    },
    data() {
        return {
            blogData: [],
            BikeRegisteredData: [],
            tokenData: '',
            userDetail: '',
            messages: [],
            messageCounts: 0,
            showNotification: false,
            timer: true
        }
    },
    async mounted() {
        this.blogData = await api.product.ourBlogData('our-blogs')
        this.BikeRegisteredData = await api.product.CMSBlockService('bike-registered-statistics'),
        this.$nextTick(() => {
          this.$nuxt.$loading.start()
          setTimeout(() => this.$nuxt.$loading.finish(), 500)
        })
        this.tokenData = Cookies.get('token')
        if (this.tokenData) {
            const detail = await api.product.userDetail()
            this.userDetail = detail.data.name
            const getMessages = await api.product.getAllMessage(detail.data.id)
            const count = getMessages.data.filter((val) => {
                if(val.read === false) {
                this.messages.push(val)
                }
            })
            this.messageCounts = this.messages.length
            if(this.messageCounts > 0) {
                this.showNotification = true
                setTimeout(() => {
                    this.timer = false
                }, 7000)
            }
        }
    }
}
</script>

<style scoped>
.notification {
    background-color: rgb(104, 178, 104);
    width: 50%;
    text-align: center;
    padding: 20px;
    color: white;
    position: fixed !important;
    z-index: 99999 !important;
    right: 15px !important;
    top: inherit !important;
    bottom: 30px !important;
    text-align: left !important;
    max-width: 300px !important;
    float: right !important;
    width: 100% !important;
    border-radius: 5px;
}
</style>