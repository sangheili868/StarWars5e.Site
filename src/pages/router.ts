import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './HomePage.vue'
import CreditsPage from './CreditsPage.vue'
import AssetsPage from './AssetsPage.vue'
import SearchResultsPage from './SearchResultsPage.vue'
import rulesRoutes from './Rules/router'
import charactersRoutes from './Characters/router'
import lootRoutes from './Loot/router'
import starshipsRoutes from './Starships/router'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: HomePage
    },
    rulesRoutes,
    charactersRoutes,
    lootRoutes,
    starshipsRoutes,
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
