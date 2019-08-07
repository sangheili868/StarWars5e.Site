import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './HomePage.vue'
import CreditsPage from './CreditsPage.vue'
import AssetsPage from './AssetsPage.vue'
import referenceRoutes from './Reference/router'
import SearchResultsPage from './SearchResultsPage.vue'
import rulesRoutes from './Rules/router'

Vue.use(Router)
console.log(rulesRoutes)
export default new Router({
  routes: [
    {
      path: '/',
      component: HomePage
    },
    rulesRoutes,
    ...referenceRoutes,
    {
      path: '/credits',
      component: CreditsPage
    },
    {
      path: '/assets',
      component: AssetsPage
    },
    {
      path: '/searchResults',
      component: SearchResultsPage,
      props: ({ query }) => query
    }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition || to.hash || from.hash) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
