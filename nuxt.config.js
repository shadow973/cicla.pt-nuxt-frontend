export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'CICLA',
    htmlAttrs: {
      lang: 'pt'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
      script: [
        { src: '/js/bootstrap.bundle.min.js', type: 'text/javascript'},
        { src: '/js/jquery.min.js', type: 'text/javascript'},
        { src: '/js/animate.js', type: 'text/javascript'},
        { src: '/js/custom.js', type: 'text/javascript'},
        { src: 'https://code.jquery.com/jquery-3.5.1.slim.min.js', type: 'text/javascript'},
        { src: 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js', type: 'text/javascript'},
        { src: 'https://cdn.ckeditor.com/ckeditor5/28.0.0/classic/ckeditor.js', type: 'text/javascript'},
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.20/vue.cjs.js', type: 'text/javascript'},
        { src: 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyD9Ef5NoHFWI-VkgYtxni7j1p60HogBWB0', type: 'text/javascript'},
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-DXCWBCC5QN', type: 'text/javascript'},
        { src: '/js/ga.js', type: 'text/javascript'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/css/bootstrap.min.css',
    '~assets/css/animate.css',
    '~assets/css/style.css',
    '~assets/css/all.css',
    '~assets/css/owl.carousel.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/vs-pagination', mode: 'client' },
    { src: '~plugins/google-autocomplete', mode: 'client' },
    { src: '~plugins/google-map', mode: 'client' },
    { src: '~plugins/vue-notification', mode: 'client' }
  ],
  loading: {
    color: '#fd5044',
    height: '6px'
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/router',
    '@nuxtjs/markdownit',
    'vue-social-sharing/nuxt',
    '@nuxtjs/toast'
  ],
  markdownit: {
    runtime: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true
  }
}
