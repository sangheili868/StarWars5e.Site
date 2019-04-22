import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './HomePage.vue'
import CreditsPage from './CreditsPage.vue'
import handbookRoute from './Handbook/router'
import starshipRoutes from './Starships/router'
import referenceRoutes from './Reference/router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HomePage
    },
    handbookRoute,
    starshipRoutes,
    ...referenceRoutes,
    {
      path: '/credits',
      component: CreditsPage
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
