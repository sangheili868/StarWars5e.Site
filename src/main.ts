import Vue from 'vue'
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
