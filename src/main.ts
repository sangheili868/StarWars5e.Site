import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
import App from './components/App.vue'
import router from './pages/router'
import store from './store'
import Vuetify from 'vuetify'
import './registerServiceWorker'
import '@/assets/styles/global.scss'
import theme from '@/assets/styles/theme'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  theme,
  iconfont: 'fa'
})

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  storageType: 'cookieStorage',
  tokenPath: 'accessToken',
  tokenPrefix: 'sw5e',
  baseUrl: process.env.VUE_APP_sw5eapiurl,
  providers: {
    google: {
      clientId: '644887359543-sl9f31k8jtcr9srs7k4k1oi4dnd4qpu9.apps.googleusercontent.com',
      redirectUri: 'http://localhost:8080/login',
      url: '/api/ExternalAuth/google'
    },
    facebook: {
      clientId: '2142102082765192',
      redirectUri: 'http://localhost:8080/login',
      url: '/api/ExternalAuth/facebook'
    },
    // reddit: {
    //   name: 'reddit',
    //   clientId: 'b6vD9Du6JJHEkA',
    //   redirectUri: 'http://localhost:8080/login',
    //   url: "/api/ExternalAuth/reddit",
    //   authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize",
    //   scope: ["identity"],
    //   scopeDelimiter: ' ',
    //   responseParams: {
    //     code: 'code'
    //   },
    //   state: 'test',
    //   duration: 'temporary',
    //   oauthType: '2.0',
    //   responseType: 'code',
    //   defaultUrlParams: ['response_type', 'client_id', 'redirect_uri', 'duration', 'scope', 'state'],
    // },
    discord: {
      name: 'discord',
      clientId: '604454073957089301',
      redirectUri: 'http://localhost:8080/login',
      url: '/api/ExternalAuth/discord',
      authorizationEndpoint: 'https://discordapp.com/api/oauth2/authorize',
      scope: [ 'identify', 'email' ],
      scopeDelimiter: ' ',
      responseParams: {
        code: 'code'
      },
      oauthType: '2.0',
      responseType: 'code',
      defaultUrlParams: [ 'response_type', 'client_id', 'redirect_uri', 'scope' ]
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
