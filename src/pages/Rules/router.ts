
import PageNester from '@/components/PageNester.vue'
import handbookRoutes from './Handbook/router'
import starshipRoutes from './Starships/router'
import monsterRoutes from './Monsters/router'
import hivesRoutes from './Hives/router'
import RulesPage from './RulesPage.vue'

export default {
  path: '/rules',
  components: {
    default: PageNester,
    navigation: PageNester
  },
  props: {
    default: false,
    navigation: {
      name: 'navigation'
    }
  },
  children: [
    {
      path: '',
      component: RulesPage
    },
    handbookRoutes,
    starshipRoutes,
    monsterRoutes,
    hivesRoutes
  ]
}
