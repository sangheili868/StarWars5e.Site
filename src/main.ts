import Vue from 'vue'
import App from './components/App.vue'
import router from './pages/router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import './registerServiceWorker'
import '@/assets/styles/global.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import vueHeadful from 'vue-headful'
import VueSessionStorage from 'vue-sessionstorage'
import VueAppInsights from 'vue-application-insights'
import axios from 'axios'
import AuthenticationService from './authenticationService'

Vue.use(VueSessionStorage)

Vue.component('vue-headful', vueHeadful)
Vue.prototype.$titleSuffix = ' | SW5E'

Vue.config.productionTip = false

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title
    ? to.meta.title + Vue.prototype.$titleSuffix
    : 'SW5E'
  await (store as any).restored
  next()
})

Vue.use(VueAppInsights, {
  id: 'b5b30062-61c2-4ad6-9c52-277f91a16734',
  router
})

Vue.prototype.$msal = new AuthenticationService()

Vue.prototype.$http = async (requiresAuth = false) => {
  const options = {
    headers: {
      Authorization: ''
    }
  }

  if (requiresAuth) {
    var accessToken = (store as any).state.authentication.accessToken
    options.headers.Authorization = `Bearer ${accessToken}`
  }

  const instance = axios.create(options)
  return instance
}

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
