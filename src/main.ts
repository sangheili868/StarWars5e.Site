import Vue from 'vue'
import Vuex from 'vuex'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
import VueAxios from 'vue-axios'
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

axios.defaults.withCredentials = true

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'https://localhost:44341/'
})

axiosInstance.interceptors.response.use((response: any) => {
  return response
}, (error: any) => {
  if (error.response && 'token-expired' in error.response.headers && !error.response.isRetryRequest) {
    error.config.isRetryRequest = true
    return axiosInstance.get(`${process.env.VUE_APP_sw5eapiurl}/api/Auth/refresh`).then((response) => {
      store.dispatch('auth/storeAuth', response.data)
      return axiosInstance(error.config)
    }, error => {
      return Promise.reject(error);
    })
  }

  return Promise.reject(error);
})

Vue.prototype.$http = axiosInstance

Vue.use(VueAxios, axiosInstance)
Vue.use(VueAuthenticate, {
  // storageType: 'cookieStorage',
  withCredentials: true,
  tokenPath: 'userName',
  tokenName: 'userName',
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
