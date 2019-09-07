import Vue from 'vue'
import App from './components/App.vue'
import router from './pages/router'
import store from './store'
import Vuetify from 'vuetify'
import './registerServiceWorker'
import '@/assets/styles/global.scss'
import theme from '@/assets/styles/theme'
import '@fortawesome/fontawesome-free/css/all.css'
import vueHeadful from 'vue-headful'

Vue.component('vue-headful', vueHeadful)
Vue.prototype.$titleSuffix = ' | SW5E'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  theme,
  iconfont: 'fa'
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + Vue.prototype.$titleSuffix
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
