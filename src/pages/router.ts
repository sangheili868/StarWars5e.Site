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
import toolsRoutes from './Tools/router'
import LoginPage from './Login.vue'
import ProfilePage from './Profile.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HomePage,
      meta: {
        title: 'Home'
      }
    },
    rulesRoutes,
    charactersRoutes,
    lootRoutes,
    starshipsRoutes,
    toolsRoutes,
    {
      path: '/credits',
      component: CreditsPage,
      meta: {
          title: 'Credits'
      }
    },
    {
      path: '/assets',
      component: AssetsPage,
      meta: {
        title: 'Assets'
      }
    },
    {
      path: '/searchResults',
      component: SearchResultsPage,
      props: ({ query }) => query,
      meta: {
        title: 'Search'
      }
    },
    {
      path: '/login',
      component: LoginPage,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/profile',
      component: ProfilePage,
      meta: {
        title: 'Profile'
      }
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
