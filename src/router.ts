import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './components/pages/HomePage.vue'
import CreditsPage from './components/pages/CreditsPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/credits',
      name: 'Credits',
      component: CreditsPage
    }
  ]
})
