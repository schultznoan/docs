import env from './env.config'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - docs',
    title: 'docs',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  server: {
    host: env.host,
    port: env.port
  },

  toast: {
    cssFille: '@/assets/notification.css',
    position: 'bottom-center',
    hideProgressBar: true,
    closeButton: false,
    transition: 'fade',
    timeout: 2500,
    maxToasts: 3
  },

  serverMiddleware: [{ path: '/api', handler: '~/server-middleware/index.js' }],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'vue-toastification/nuxt',
    'cookie-universal-nuxt',
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    families: {
      // Укажите нужные шрифты
      Montserrat: true
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/api',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
