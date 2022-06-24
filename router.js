import Vue from 'vue'
import Router from 'vue-router'
import MyPage from './pages/index.vue'
import SearchBike from './pages/SearchBikes.vue'
import StolenBike from './pages/StolenBike.vue'
import Donate from './pages/Donate.vue'
import Help from './pages/Faq.vue'
import Contact from './pages/Contact.vue'
import Login from './pages/Login.vue'
import RegisterBikes from './pages/RegisterBikes.vue'
import SignUp from './pages/SignUp.vue'
import Verify from './pages/VerifyEmail.vue'
import SearchBikeDetail from './pages/SearchBikeDetail.vue'
import UserAdmin from './pages/UserAdmin.vue'
import UserBikes from './pages/UserBikes.vue'
import ForgotPassword from './pages/ForgotPassword.vue'
import Classified from './pages/Classified.vue'
import ClassifiedDetail from './pages/ClassifiedDetail.vue'
import AboutUs from './pages/AboutUs.vue'
import ReportStolen from './pages/ReportStolen.vue'
import CommanPage from './pages/_slug/index.vue'
import AuthGoogle from './pages/AuthGoogle/_slug.vue'
import EditBike from './pages/EditBike.vue'
import ClassifiedAdmin from './pages/ClassifiedAdmin.vue'
import ResetPassword from './pages/ResetPassword.vue'
Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: MyPage
      },
      {
        path: '/stolen-bike',
        component: StolenBike
      },
      {
        path: '/search-bikes',
        component: SearchBike
      },
      {
        path: '/donate',
        component: Donate
      },
      {
        path: '/help',
        component: Help
      },
      {
        path: '/contact',
        component: Contact
      },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/register-bikes',
        component: RegisterBikes
      },
      {
        path: '/edit-bike/:slug',
        component: EditBike
      },
      {
        path: '/sign-up',
        component: SignUp
      },
      {
        path: '/verify',
        component: Verify,
        props: true
      },
      {
        path: '/search-bikes/:slug',
        component: SearchBikeDetail
      },
      {
        path: '/stolen-bikes/:slug',
        component: SearchBikeDetail
      },
      {
        path: '/my-account',
        component: UserAdmin
      },
      {
        path: '/my-bikes',
        component: UserAdmin
      },
      {
        path: '/inbox',
        component: UserAdmin
      },
      {
        path: '/reset-password',
        component: ResetPassword
      },
      {
        path: '/user-bikes',
        component: UserBikes
      },
      {
        path: '/forgot-password',
        component: ForgotPassword
      },
      {
        path: '/classified-account',
        component: ClassifiedAdmin
      },
      {
        path: '/classified',
        component: Classified
      },
      {
        path: '/classified/:slug',
        component: ClassifiedDetail
      },
      {
        path: '/about-us',
        component: AboutUs
      },
      {
        path: '/report-stolen',
        component: ReportStolen
      },
      {
        path: '/connect/:slug/redirect',
        component: AuthGoogle,
        name: 'AuthGoogle'
      },
      {
        path: '/:slug',
        component: CommanPage
      }

    ],
    scrollBehavior() {
      return {x: 0, y: 0}
    }
  })
}