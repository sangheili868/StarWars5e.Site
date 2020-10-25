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
import * as msal from '@azure/msal-browser'

Vue.use(VueSessionStorage)

Vue.component('vue-headful', vueHeadful)
Vue.prototype.$titleSuffix = ' | SW5E'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    ? to.meta.title + Vue.prototype.$titleSuffix
    : 'SW5E'
  next()
})

Vue.use(VueAppInsights, {
  id: 'b5b30062-61c2-4ad6-9c52-277f91a16734',
  router
})

const msalConfig = {
    auth: {
    clientId: '1f7c8796-8518-4a07-8545-ec007a6ac043',
    redirectUri: 'http://localhost:8080/login',
    authority: 'https://login.microsoftonline.com/14a71a66-1f96-4e98-aca0-42f18f0dc783/',
    postLogoutRedirectUri: 'http://localhost:8080/login',
    requireAuthOnInitialize: false
  }
}

Vue.prototype.$msal = new msal.PublicClientApplication(msalConfig)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
