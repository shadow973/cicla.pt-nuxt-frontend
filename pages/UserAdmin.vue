<template>
<div>
    <TopBanner :data="data" />
    <UserAdmin />
    <div @click="$route.fullPath === '/my-account#inbox' ? '' : $router.push('/my-account#inbox')" class="notification cursor-pointer" v-if="showNotification && timer">
        Você tem {{messageCounts}} novas mensagens
    </div>
</div>
</template>
<script>
import api from '../services'
import Cookies from 'js-cookie'
import TopBanner from '../components/Comman/TopBanner.vue'
import UserAdmin from '../components/UserAdmin/UserAdmin.vue'
export default {
    layout: 'Header',
    loading: false,
    components: {
         TopBanner,
         UserAdmin,
    },
    data () {
        return {
            userDetail: '',
            messages: [],
            messageCounts: 0,
            showNotification: false,
            timer: true,
            token: '',
            data: {
                name: "",
                description: ""
            }
        }
    },
    async mounted () {
        this.token = Cookies.get('token')
        // if(!this.token) {
        //     this.$router.push('/login')
        // }
        // this.$nextTick(() => {
        //     this.$nuxt.$loading.start()
        //     setTimeout(() => this.$nuxt.$loading.finish(), 500)
        // })
        // if (this.token) {
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
        // }
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