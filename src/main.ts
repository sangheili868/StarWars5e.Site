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

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
